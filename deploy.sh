#!/bin/bash

# 변경사항 가져오기
git reset --hard HEAD
git clean -f
git pull origin main

# 의존성 설치 및 빌드
yarn install
yarn add --dev eslint @eslint/eslintrc eslint-config-next
yarn build

# 도커 컨테이너 재시작
yarn docker:restart

echo "Deployment completed. Container restarted." 