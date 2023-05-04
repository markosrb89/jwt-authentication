FROM node:alpine

WORKDIR /user/app/client

COPY ["package.json", "yarn.lock", "./"]

COPY . .

RUN yarn cache clean && yarn install

EXPOSE 3000

CMD [ "yarn", "dev", "--", "--host", "0.0.0.0" ]