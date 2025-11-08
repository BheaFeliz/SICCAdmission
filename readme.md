# SICC

SICC Admission Test Reservation

## Installation

### NOTE:

You will follow only 1 Option, either `Option 1. Using Docker` or
`Option 2. Manual Setup` Then proceed to `#3. Frontend Setup`

## Option 1. Using Docker

### 1.A Install Docker

Intallation Link: [Click here](https://docs.docker.com/engine/install/)

After installation, run the stack (MySQL + Laravel API + Next.js FE):

```
docker compose up --build -d
```

The containers expose:

- API: [http://localhost:8000/](http://localhost:8000/)
- Frontend: [http://localhost:3000/](http://localhost:3000/)
- Database: localhost:3306 (root/admin)
- phpMyAdmin: [http://localhost:8080/](http://localhost:8080/) (root/admin)

The API container automatically installs Composer dependencies, copies `.env.example`,
generates `APP_KEY`, runs migrations, and links storage on boot. If you need to
re-run database seeders:

```
docker compose exec api php artisan db:seed
```

Tail logs with:

```
docker compose logs -f api
docker compose logs -f web
```

phpMyAdmin connects automatically to the `db` container. Sign in with the root
credentials above to inspect or import/export database tables via the browser.

Shut everything down (and keep database data) with:

```
docker compose down
```

Remove the database volume as well:

```
docker compose down -v
```

## Registration Form Update

- The online registration form now mirrors the 2025–2026 manual admission sheet, including
  semester/A.Y. details, socio-economic data, household table, and guardian information.
- Optional uploads for PSA/Birth Certificates and Marriage Certificates (if applicable) are now
  supported alongside the required 2x2 photo.
- Run the latest migrations to add the new fields before using the form:

  ```
  php artisan migrate
  ```

  or, when using Docker:

  ```
  docker compose exec api php artisan migrate
  ```

##

## Option 2. Manual Setup

### 2.A Install Composer

Link:
[Click here](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-composer-on-ubuntu-20-04)

Ubuntu/Mac Quick Installation:

```
sudo apt-get update
sudo apt-get install -y php-xml
sudo apt-get install -y php-curl
sudo apt-get install curl
sudo curl -s https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

### 2.B Install MySQL

LAMP Stack (Ubuntu/MAC) [Recommended]

- [Click here](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-22-04)

XAMPP (Windows/MAC/Ubuntu)

- [Click here](https://www.apachefriends.org/)

### 2.C Run the server

```
cd api
composer install
php artisan key:generate
php artisan serve
php artisan migrate
```

You should be able to access: [http://localhost:8000/](http://localhost:8000/)

Seed for Admin Login

```
php artisan db:seed
```

### 3. Frontend Setup:

Install NodeJS: Link: [Click here](https://nodejs.org/en/download/current)

Install Yarn in MAC/Ubuntu:

```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update
sudo apt-get install yarn -y
```

Install in Windows:

```
npm install --global yarn
```

Run your FE

```
cd web
yarn
yarn dev
```

You should be able to access: [http://localhost:3000/](http://localhost:3000/)

Default Admin Credential

```
Username: admin
Password: P@ssword123
```

## BE Possible errors

1. Laravel & Docker: The stream or file "/var/www/html/storage/logs/laravel.log"
   could not be opened: failed to open stream: Permission denied

Solution:

```
sudo chmod -R 777 api/storage
```
