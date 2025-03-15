#!/bin/bash

# 변경사항 가져오기
git reset --hard HEAD
git clean -f
git pull origin main

# 의존성 설치 및 빌드
yarn install
yarn add --dev eslint @eslint/eslintrc eslint-config-next
yarn build

# 기존 Next.js 프로세스 종료
pkill -f "next start" || true

# Next.js 앱 재시작
yarn start 