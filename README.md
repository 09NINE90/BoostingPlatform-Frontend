# Фронтенд часть проекта V-Boosting

## Описание директорий
- src - здесь находиться код проекта
    - в каталоге components содержаться все компоненты в системе
    - в каталоге layouts лежат элементы из которых будем собирать страницу
    - в каталоге pages лежат страницы, которые отображаются пользователю
    - в каталоге services находится вся логика взаимодействия с бэкендом
    - в каталоге store находится логика описания Redux хранилищ
    - в каталоге styles находится все стили для компонентов приложения
    - в каталоге utils находится полезные утилиты для работы
- public - тут содержатся все статичные файлы

## Инструкция по работе с репозиторием

### Для нужд локальной разработки
После того как репозиторий был склонирован нужно установить все зависимости для этого нужно выполнить следующую комманду:
``` bash
npm install
```
Для запуска проекта обязательно в переменных окружения должен быть указан параметр(создать .env.local)
``` 
VITE_SECRET_KEY=ajscqSVPNj4GNzF+Ln2H6yaE2etWGExa618+TDP96ZE\=
```

При запуске проекта через
``` bash
npm run dev
```
проект запускается в режиме разработки. В таком режиме все запросы на /api/... проксируется на localhost:6969/
### При развертывании
При сборке проекта для продуктового окружения, нужно выполнить комманду:
``` bash
npm run build
```
Чтобы собрать проект в докер контейнере нужно выполнить следующую команду:
``` bash
docker build -t имя_образа .
```
Для запуска нужно обязательно указать следующие переменные окружения:
- NGINX_PORT - порт, который будет прослушивать nginx(3000)
- BACKEND_URL - url на который надо будет проксировать запросы с /api/... (http://localhost:6969)
- VITE_SECRET_KEY - ключи шифрования для зашифрованного хранилища данных (ajscqSVPNj4GNzF+Ln2H6yaE2etWGExa618+TDP96ZE\=)

Пока не реализован функционал для добавления ssl сертификата. Чтобы это сделать надо добавить в nginx.conf:
```
# перенаправление на https
server {
    listen ${NGINX_PORT};
    server_name _;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;  # SSL порт
    server_name _;

    # Пути к SSL-сертификату и ключу (замените на свои или используйте переменные)
    ssl_certificate      /etc/nginx/ssl/certificate.pem;      # или ${SSL_CERTIFICATE}
    ssl_certificate_key  /etc/nginx/ssl/private-key.key;      # или ${SSL_CERTIFICATE_KEY}

    ssl_session_cache    shared:SSL:10m;
    ssl_session_timeout  10m;
    ssl_protocols        TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers          "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256";
    ssl_ecdh_curve       secp384r1;
    add_header           Strict-Transport-Security "max-age=63072000" always;

    ...
}

```

