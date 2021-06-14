# HomeLike Project

User can register, login, post new apartments, search and find apartment by city, country, title and more

## Features

- User Signup
- user Login
- Mark as favourite
- Unfavourite Apartment
- Search Apartment


## Tech

Dillinger uses a number of open source projects to work properly:

- [NodeJS] - Backend server
- [MongoDB] - database
- [Swagger] - Open API Specification
- [Jest] - testing
- [Docker Compose] - Virtualisation
- [Express] - fast node.js network app framework

## Prerequisites

- Docker
- Docker compose
- Node.js 10 or above

Application tested in Mac OS

## Installation

For production environments...

* Copy / modify .env.example file and make a new file named .env
*  Run Docker compose

    ```
    docker-compose up -d
    ```
   or
    ```
    docker compose up -d
    ```
* Install dependencies
    ```sh
    npm ci
    ```
* start server
    ```
    npm start
    ```
  ***On successful application start application will be available on the PORT mentioned in the .env file. You can visit /api-docs to view/test swagger documentation.***
## Testing the App
-  You can run the seed to load apartment test data
-  Goto http://baseUrl/api-docs to view  Swagger documentation
-  For accessing any api starts with url '/api/v1' should have authorisation token












