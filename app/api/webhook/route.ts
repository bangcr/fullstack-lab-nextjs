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
    // Windows에서 Git Bash를 통해 스크립트 실행
    await execAsync('"C:\\Program Files\\Git\\bin\\bash.exe" deploy.sh');
    
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