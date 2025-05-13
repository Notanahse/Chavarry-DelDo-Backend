FROM node:18-alpine AS builder

WORKDIR /var/app

COPY ./package*.json ./
RUN npm install

COPY . .
RUN npx tsc

FROM node:18-alpine AS runner

WORKDIR /var/app

COPY --from=builder /var/app/dist ./dist
COPY --from=builder /var/app/node_modules ./node_modules
COPY --from=builder /var/app/package*.json ./

EXPOSE 3000
CMD ["node", "dist/index.js"]
