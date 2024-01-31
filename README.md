# Country Information App

**Description:** This is a simple application that displays a list of countries and their details. You can filter the countries by common name, official name, and translations. Each country has a details page that displays more information about it, including a list of neighboring countries and a list of languages spoken in the country. Each language has a seperate page that includes a list of countries that speak the language.

Built with Laravel and Angular.

## Requirements

- Docker
- PHP >= 8.1
- Composer

## Installation

You can setup the project automatically via a script or manually.

### Semi-automatic Installation:

1. Go to `backend` folder and make a copy of the `.env.example` file and rename it to `.env`.

2. Run `chmod +x run-backend.sh` and then `run-backend.sh` to start installation.

### Manual Installation:

1. Run Docker-compose:

    `docker-compose up -d`
    
2. Change directory to the backend folder:
    `cd backend\`
    
3. Install dependencies:
    `composer install`

4. Generate the application key:
    `php artisan key:generate`

5. Run database migrations:
    `php artisan migrate`

6. Populate the database:
    `php artisan db:populate`

7. Start the Laravel server:
    `php artisan serve`


## Usage

1. Go to http://localhost:4200 to see the application running.
2. To stop the containers, run:
    `docker-compose down`


## Additional Backend Commands

1. Populate the database with data from https://restcountries.com/v3.1/all API (is unavailable, a local JSON file is used instead).
    `php artisan db:populate`

2. Clear the database:
    `php artisan db:clear`