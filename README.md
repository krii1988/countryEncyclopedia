


Installation

------------

1. Run 'docker-compose up -d' to start the containers
2. Run 'run-backend.sh' to start the backend

Go to http://localhost:4200 to see the application running.

To stop the containers, run 'docker-compose down'.
To stop the backend, press Ctrl+C in the terminal where it is running.

Commands

--------

- `php artisan db:populate` - Populate the database with data from https://restcountries.com/v3.1/all API (is unavailable, a local JSON file is used instead)
- 'php artisan db:clear' - Clear the database