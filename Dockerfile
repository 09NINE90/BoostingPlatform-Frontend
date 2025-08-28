FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
RUN apk add --no-cache \
    gettext \
    certbot \
    openssl \
    bash

RUN mkdir -p /etc/nginx/ssl \
    && mkdir -p /var/www/certbot \
    && mkdir -p /scripts


COPY nginx.conf /etc/nginx/conf.d/default.conf.template
COPY scripts/ /scripts/
RUN chmod +x /scripts/*.sh

COPY --from=builder /app/dist /usr/share/nginx/html

ENTRYPOINT ["/scripts/entrypoint.sh"]
EXPOSE ${NGINX_HTTP_PORT:-80}
EXPOSE ${NGINX_HTTPS_PORT:-443}

CMD ["nginx", "-g", "daemon off;"]