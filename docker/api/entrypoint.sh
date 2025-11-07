#!/bin/bash
set -euo pipefail

cd /var/www/html

if [ ! -f ".env" ]; then
  cp .env.example .env
  sed -i "s|APP_URL=.*|APP_URL=http://localhost:8000|" .env
  sed -i "s|DB_HOST=.*|DB_HOST=db|" .env
  sed -i "s|DB_DATABASE=.*|DB_DATABASE=pcbee-db|" .env
  sed -i "s|DB_USERNAME=.*|DB_USERNAME=root|" .env
  sed -i "s|DB_PASSWORD=.*|DB_PASSWORD=admin|" .env
fi

if [ ! -d "vendor" ]; then
  composer install --no-interaction --prefer-dist
fi

php artisan config:clear || true
php artisan cache:clear || true

if ! grep -q "^APP_KEY=base64" .env; then
  php artisan key:generate --ansi
fi

php artisan storage:link || true

until php artisan migrate --force; do
  echo "Waiting for the database to be ready..."
  sleep 5
done

php artisan serve --host=0.0.0.0 --port=8000
