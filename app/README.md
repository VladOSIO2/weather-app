# Weather App

<!-- TODO: frontend description -->

## Store management

This app uses Redux Toolkit (RTK) for store management and redux-saga for orchestrating side effects.

RTK is a powerful library that simplifies the process of managing the store, including reducers, actions, and selectors. It reduces boilerplate code (e.g., comparing to creating multiple context providers for different data parts) and ensures clean state management, making it easier to handle complex state across multiple pages.

Redux-saga is a library that allows handling side effects in a declarative way. It complements RTK by providing a way to manage complex asynchronous operations, such as API calls and user interactions, keeping UI components code clean and maintainable.

## Database

The App uses a PostgreSQL database to store the data. Provide the database credentials in the [.env](../app/.env) file as `DATABASE_URL` as a connection URL for either a local or remote database.

You will need to run the [init.sql](../db/init.sql) file in the database to create the necessary tables for the app to work.

For local development, you can use the [docker-compose file](../db/docker-compose.yml) to start a Docker container with a PostgreSQL database, refer to the [README](../db/README.md) file in the [db](../db) directory for more details.
