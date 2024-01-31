#!/bin/bash

# Change directory to the backend folder
cd backend/

# Run database migrations
php artisan migrate

# Populate the database
php artisan db:populate

# Start the Laravel server
php artisan serve
