# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/docs ./docs

EXPOSE 3333

# Comando de inicialização
ENTRYPOINT [ "sh", "-c", "npx prisma generate && npx prisma migrate deploy && npm start" ]
