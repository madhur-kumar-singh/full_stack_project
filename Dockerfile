# This is the file to configure the base image.

FROM node
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
EXPOSE 3000



