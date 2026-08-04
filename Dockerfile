FROM node:22 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build-only

FROM nginx:1.28-alpine
COPY --from=build /app/dist /usr/share/nginx/html/rapid-triples/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
