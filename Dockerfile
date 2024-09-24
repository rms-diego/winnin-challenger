FROM node:20-alpine

COPY . .

RUN npm install --production

RUN npm run build

ENTRYPOINT [ "npm", "start" ]