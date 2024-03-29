# PCBee

PCBee Ordering Management System

## Clone the PCBee repo from GitHub

```
git clone git@github.com:chevyB/pcbee.git
```

## Installation

### NOTE:

You will follow only 1 Option, either `Option 1. Using Docker` or
`Option 2. Manual Setup` Then proceed to `#3. Frontend Setup`

## Option 1. Using Docker

### 1.A Install Docker

Intallation Link: [Click here](https://docs.docker.com/engine/install/)

After installation, Run:

```
docker-compose up --build -d
```

### 1.B. Backend Setup:

Update `api/.env` file:

```
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=pcbee-db
DB_USERNAME=root
DB_PASSWORD=admin
```

```
docker-compose exec app composer install
docker-compose exec app php artisan key:generate
docker-compose exec app php artisan migrate
```

You should be able to access: [http://localhost:8000/](http://localhost:8000/)

Seed for Admin Login

```
docker-compose exec app php artisan db:seed
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
docker-compose exec app php artisan db:seed
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
Password: !p@ssword123
```

## BE Possible errors

1. Laravel & Docker: The stream or file "/var/www/html/storage/logs/laravel.log"
   could not be opened: failed to open stream: Permission denied

Solution:

```
sudo chmod -R 777 api/storage
```
