FROM node:12.7-alpine AS build
WORKDIR /angular-keep-level-1-assignment
COPY package.json package-lock.json ./
RUN npm install -g json-server
RUN npm install
COPY . .
RUN json-server server/db.json
RUN npm run start