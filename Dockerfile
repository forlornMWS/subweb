FROM node:14-alpine AS build
LABEL maintainer="Stille <stille@ioiox.com>"

WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM nginx:1.16-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
