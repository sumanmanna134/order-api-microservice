FROM node:alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm uninstall bcrypt
RUN npm install --save bcrypt @types/bcrypt

COPY . .

RUN npm run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production
RUN npm uninstall bcrypt
RUN npm install --save bcrypt @types/bcrypt

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/auth/main"]