# 1. Node.js LTS 버전 사용
FROM node:18

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. package.json과 yarn.lock 복사 후 의존성 설치
COPY package.json yarn.lock ./
RUN yarn install

# 4. 전체 소스 복사
COPY . .

# 5. 환경 변수 설정
ENV NEXT_WEBHOOK_SECRET=${NEXT_WEBHOOK_SECRET}

# 6. 포트 설정
EXPOSE 4000

# 7. Next.js 서버 실행
CMD ["yarn", "dev"]
