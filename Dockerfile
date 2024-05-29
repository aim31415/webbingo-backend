FROM node:22-alpine AS build

WORKDIR /usr/src/app

COPY package*.json tsconfig*.json ./

RUN npm ci

COPY src ./src/

RUN npm run build

###

FROM node:22-alpine AS base

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 8080

###

FROM base AS development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY . .
COPY --from=build /usr/src/app/dist ./dist

CMD ["npx", "nest", "start", "--watch"]

###

FROM base AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
