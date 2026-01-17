# 1️⃣ BUILD
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2️⃣ PRODUCTION
FROM nginx:alpine
COPY --from=build /app/dist/uma-user /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
