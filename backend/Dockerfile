FROM node:13-alpine

ENV MONGO_DB_USERNAME=dbUser \
    MONGO_DB_PWD=dbUser

RUN mkdir -p /home/app

# set default dir so that next commands executes in /home/app dir
WORKDIR /home/app

COPY package*.json ./

# will execute npm install in /home/app because of WORKDIR
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
