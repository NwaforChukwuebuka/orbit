FROM node:18-alpine AS builder

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./

COPY . .
RUN rm -rf node_modules
RUN rm -rf dist
RUN npm install



RUN npm run build
RUN npm prune --production
RUN npm cache clean --force

FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

