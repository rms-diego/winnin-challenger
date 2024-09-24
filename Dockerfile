FROM node:alpine

COPY . .

RUN npm ci

RUN npm run build

ENTRYPOINT [ "npm", "start" ]