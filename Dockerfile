FROM node:16.13.1
WORKDIR /app
COPY ./ /app/
RUN npm install


