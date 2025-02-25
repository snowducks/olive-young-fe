# Node.js를 사용하여 빌드
FROM node:22-alpine as build-stage

# 컨테이너 내부 작업 디렉토리 설정
WORKDIR /app

# app dependencies
# 컨테이너 내부로 package.json 파일들을 복사
COPY package*.json ./

# package.json 및 package-lock.json 파일에 명시된 의존성 패키지들을 설치
RUN npm install
# 백엔드 REST API 주소


# WebSocket 서버 주소
ENV REACT_APP_API_URL=http://kafka-producer.back.svc.cluster.local:8080
ENV REACT_APP_WS_URL=ws://websocket-server.back.svc.cluster.local:8080

# 호스트 머신의 현재 디렉토리 파일들을 컨테이너 내부로 전부 복사
COPY . .

# npm build (메모리 제한을 늘려서 실행)
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# 테스트 실행 (필요한 경우)
#RUN npm test