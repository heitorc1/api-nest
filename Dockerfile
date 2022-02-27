FROM node:16.14-alpine3.14
WORKDIR /usr/app
EXPOSE 3000
COPY . .
RUN npm install
CMD ["npm",  "run", "start:dev"]