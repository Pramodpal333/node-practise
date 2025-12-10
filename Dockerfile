
# Base image
FROM node:24.11-alpine3.21

WORKDIR /home/myapp/

COPY  package*.json .

RUN npm install

# Coping source code to docker image
COPY index.js /home/myapp/index.js

CMD [ "npm","start" ]



