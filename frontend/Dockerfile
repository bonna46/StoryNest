FROM node:13-alpine

RUN mkdir -p /home/fapp

# set default dir so that next commands executes in /home/app dir
WORKDIR /home/fapp

COPY package*.json ./


COPY . .


CMD ["npm", "start"]
