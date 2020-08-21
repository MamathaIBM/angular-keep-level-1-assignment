FROM node:12.7-alpine AS build
WORKDIR /angular-keep-level-1-assignment
COPY package.json package-lock.json ./
RUN npm install
RUN yarn global add json-server
CMD ["json-server", "server/db.json"]
COPY . .
RUN npm run start
