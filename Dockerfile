# Stage 1
FROM node:8.14.0-alpine as node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN ng build --prod
# Stage 2
FROM nginx:1.15.7-alpine
COPY --from=node /usr/src/app/dist/way2-football /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf