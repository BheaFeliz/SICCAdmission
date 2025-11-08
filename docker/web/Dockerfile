FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache bash

COPY docker/web/entrypoint.sh /usr/local/bin/start-web.sh

RUN chmod +x /usr/local/bin/start-web.sh

EXPOSE 3000

CMD ["/usr/local/bin/start-web.sh"]
