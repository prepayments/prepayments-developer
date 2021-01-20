# Stage 1
FROM node:10-alpine AS compile-image

WORKDIR /opt/ng
# Enable the line below for local dev behind proxy
COPY .npmrc /opt/ng
COPY package.json /opt/ng
COPY package-lock.json /opt/ng

COPY . /opt/ng
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

RUN npm run webpack:prod

# Stage 2
FROM nginx
COPY src/main/docker/nginx/nginx-default.conf /etc/nginx/conf.d/default.conf
COPY --from=compile-image /opt/ng/build/resources/main/static /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]