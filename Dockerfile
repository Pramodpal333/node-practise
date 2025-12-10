
# Base image
FROM ubuntu


# Update apt
RUN apt update
# Install Curl in the image
RUN apt install -y curl 

# download Node 
RUN curl -sL https://deb.nodesource.com/setup_24.x -o /tmp/nodesource_setup.sh
RUN bash /tmp/nodesource_setup.sh

# Install Node
RUN apt install -y nodejs
# Check node version
RUN node -v


# Coping source code to docker image
COPY index.js /home/myapp/index.js
COPY package.json /home/myapp/package.json
COPY package-lock.json /home/myapp/package-lock.json

WORKDIR /home/myapp/

RUN npm install