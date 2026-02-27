FROM node:20-alpine AS deps
RUN corepack enable && corepack prepare yarn@4.10.2 --activate
WORKDIR /app

COPY package.json ./
RUN printf 'nodeLinker: node-modules\n' > .yarnrc.yml
RUN yarn install --no-immutable

FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare yarn@4.10.2 --activate
WORKDIR /app

COPY --from=deps /app/ ./
COPY . .
RUN mkdir -p public

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV CI=1

RUN yarn next build --no-lint

FROM node:20-alpine AS runner
RUN corepack enable && corepack prepare yarn@4.10.2 --activate
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["yarn", "next", "start", "--port", "3000", "--hostname", "0.0.0.0"]
