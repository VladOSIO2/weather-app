# Weather App

<!-- TODO: frontend description -->

## Database

The App uses a PostgreSQL database to store the data. Provide the database credentials in the [.env](../app/.env) file as `DATABASE_URL` as a connection URL for either a local or remote database.

You will need to run the [init.sql](../db/init.sql) file in the database to create the necessary tables for the app to work.

For local development, you can use the [docker-compose file](../db/docker-compose.yml) to start a Docker container with a PostgreSQL database, refer to the [README](../db/README.md) file in the [db](../db) directory for more details.
