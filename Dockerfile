FROM node:latest
WORKDIR /app
ADD package*.json ./
RUN npm install
RUN npm install pm2 -g
RUN npx tsc
COPY . .
EXPOSE 3000
CMD [ "pm2-runtime", "dist/index.js", "-i", "max"]