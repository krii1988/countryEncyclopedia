#!/bin/bash

# Run Docker-compose
docker-compose up -d

# Change directory to the backend folder
cd backend/

# Install dependencies
composer install

# Generate the application key
php artisan key:generate

# Run database migrations
php artisan migrate --no-interaction

# Populate the database
php artisan db:populate --no-interaction

# Start the Laravel server
php artisan serve --no-interaction

# Open the browser
open http://localhost:4200
```