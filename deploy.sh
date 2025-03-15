#!/bin/bash

# 변경사항 가져오기
git reset --hard HEAD
git clean -f
git pull origin main

# 의존성 설치 및 빌드
yarn install
yarn build

# 도커 재배포
docker build -t nextjs-app .
docker stop nextjs-app || true
docker rm nextjs-app || true
docker run -d \
  --name nextjs-app \
  -p 4000:4000 \
  --env-file .env \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v "$(pwd)":/app \
  nextjs-app 