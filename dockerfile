FROM node:18 AS builder

WORKDIR /var/app

COPY ./package*.json ./
RUN npm ci

COPY . .
RUN npx tsc
RUN ls -la /var/app/dist

FROM node:18 AS runner

WORKDIR /var/app

COPY --from=builder /var/app/dist ./dist
COPY --from=builder /var/app/node_modules ./node_modules
COPY --from=builder /var/app/package*.json ./

EXPOSE 3000
CMD ["node", "dist/index.js"]
