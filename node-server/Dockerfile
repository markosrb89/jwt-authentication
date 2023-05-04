FROM node:alpine

WORKDIR /user/app

COPY ["package.json", "yarn.lock", "./"]

COPY . .

RUN yarn cache clean && yarn install
RUN yarn add bcrypt --force

EXPOSE 3001

RUN yarn build

CMD [ "node", "dist/index.js" ]