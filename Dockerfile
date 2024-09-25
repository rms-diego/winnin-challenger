FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3333

ENTRYPOINT [ "sh", "-c", "npx prisma migrate deploy && npm start" ]
