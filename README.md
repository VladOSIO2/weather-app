# Weather App

## Overview

This is a full-stack weather app built with Next.js, Tailwind CSS, and PostgreSQL. It serves the following pages:

- `/` - Home page, with a search bar to search for weather by city name. It will show the current weather and a brief 3-day forecast for the selected location.
- `/details` - Weather details page, with more details about the weather for the selected location in a selected date.
- `/sign-in` - Sign in page, with a form to sign in to the app.
- `/sign-up` - Sign up page, with a form to sign up to the app.
- `/profile` - Profile page, with the user's profile information and the list of favorite cities (requires authentication).

Authentication is implemented using JWT tokens stored in a HTTP-only cookie.

## Startup

Refer to the [App README](./app/README.md) file for more details on how to start the app. 

Note: You will also need to provide the correct environment variables for the app to work. Refer to the [.env.template](./app/.env.template) file for more details.

## Caching strategies

The app uses the out-of-the-box Next.js data caching to cache API responses from the WeatherAPI, utilizing the time-based revalidation feature with a TTL of 10 minutes,
to reduce the number of requests to the WeatherAPI and improve the app performance.

This cache strategy utilizes `stale-while-revalidate` strategy, so the cached data is served upon request while the new data is being fetched from the WeatherAPI. Although it may create scenarios where the user sees stale data after a request, as the new data is refetched for cache update on the background.

## Store management

This app uses Redux Toolkit (RTK) for store management and redux-saga for orchestrating side effects.

RTK is a powerful library that simplifies the process of managing the store, including reducers, actions, and selectors. It reduces boilerplate code (e.g., comparing to creating multiple context providers for different data parts) and ensures clean state management, making it easier to handle complex state across multiple pages.

Redux-saga is a library that allows handling side effects in a declarative way. It complements RTK by providing a way to manage complex asynchronous operations, such as API calls and user interactions, keeping UI components code clean and maintainable.

## Database

The App uses a PostgreSQL database to store the data. Provide the database credentials in the [.env](./app/.env) file as `DATABASE_URL` as a connection URL for either a local or remote database.

You will need to run the [init.sql](./db/init.sql) file in the database to create the necessary tables for the app to work.

For local development, you can use the [docker-compose file](./db/docker-compose.yml) to start a Docker container with a PostgreSQL database, refer to the [README](./db/README.md) file in the [db](./db) directory for more details.
