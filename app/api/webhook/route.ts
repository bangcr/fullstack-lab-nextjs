import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// GitHub webhook 시크릿 (환경 변수에서 가져와야 함)
const WEBHOOK_SECRET = process.env.NEXT_WEBHOOK_SECRET;

// 환경변수 로깅 (디버깅용)
console.log('Webhook Secret:', WEBHOOK_SECRET);

// GitHub webhook 서명 검증
function verifySignature(payload: string, signature: string): boolean {
  if (!WEBHOOK_SECRET) {
    console.error('Webhook secret is not configured');
    return false;
  }

  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

// 배포 스크립트 실행
async function deploy() {
  try {
    // 작업 디렉토리 변경사항 처리
    await execAsync('git stash');  // 현재 변경사항 임시 저장
    
    // Git pull
    await execAsync('git pull origin main');
    
    // stash 복원 (필요한 경우)
    await execAsync('git stash pop || true');  // stash가 없어도 에러 발생하지 않음
    
    // 의존성 설치
    await execAsync('yarn install');
    // 빌드
    await execAsync('yarn build');
    // Docker 이미지 빌드 및 재시작
    await execAsync('docker build -t nextjs-app .');
    await execAsync('docker stop nextjs-app || true');
    await execAsync('docker run -d --name nextjs-app -p 4000:4000 --env-file .env nextjs-app');
    
    console.log('Deployment completed successfully');
    return true;
  } catch (error) {
    console.error('Deployment failed:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.text();
    const signature = request.headers.get('x-hub-signature-256');

    // 서명 검증
    if (!signature || !verifySignature(payload, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = request.headers.get('x-github-event');
    const data = JSON.parse(payload);

    // push 이벤트 처리
    if (event === 'push' && data.ref === 'refs/heads/main') {
      const success = await deploy();
      if (success) {
        return NextResponse.json({ message: 'Deployment successful' });
      } else {
        return NextResponse.json({ error: 'Deployment failed' }, { status: 500 });
      }
    }

    return NextResponse.json({ message: 'Event received but no action taken' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 