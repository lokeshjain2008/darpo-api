# Base image
FROM node:20-alpine AS base

WORKDIR /app

# Development image
FROM base AS development

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run prisma:generate

CMD ["npm", "run", "start:dev"]

# Builder image
FROM base AS builder

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run prisma:generate
RUN npm run build

# Production image
FROM base AS production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

RUN npm install --production
RUN npm run prisma:generate

CMD ["npm", "run", "start:prod"]