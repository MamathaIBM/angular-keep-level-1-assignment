FROM node:12.7-alpine AS build
WORKDIR /angular-keep-level-1-assignment
COPY package.json package-lock.json ./
COPY server/db.json ./
RUN npm install
COPY . .
RUN npm install -g json-server
COPY . .
RUN json-server server/db.json
RUN npm run start