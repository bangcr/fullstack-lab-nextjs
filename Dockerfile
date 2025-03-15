# 1. Node.js LTS 버전 사용
FROM node:18

# 2. 도커 CLI 설치
RUN apt-get update && apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    && curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg \
    && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian bullseye stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null \
    && apt-get update \
    && apt-get install -y docker-ce-cli

# 3. 작업 디렉토리 설정
WORKDIR /app

# 4. package.json과 yarn.lock 복사 후 의존성 설치
COPY package.json yarn.lock ./
RUN yarn install

# 5. 전체 소스 복사
COPY . .

# 6. Next.js 애플리케이션 빌드
RUN yarn build

# 7. 포트 설정
EXPOSE 4000

# 8. Next.js 프로덕션 서버 실행
CMD ["yarn", "start"]
