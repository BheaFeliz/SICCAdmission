FROM php:8.2-cli

ENV COMPOSER_ALLOW_SUPERUSER=1 \
    PATH=/root/.composer/vendor/bin:$PATH

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        git \
        unzip \
        zip \
        libzip-dev \
        libpng-dev \
        libonig-dev \
        libxml2-dev \
        libicu-dev \
        libpq-dev \
        default-mysql-client \
    && docker-php-ext-install \
        pdo_mysql \
        intl \
        bcmath \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY docker/api/entrypoint.sh /usr/local/bin/start-api.sh

RUN chmod +x /usr/local/bin/start-api.sh

EXPOSE 8000

CMD ["/usr/local/bin/start-api.sh"]
