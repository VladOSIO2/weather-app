This repo includes a [docker compose file](docker-compose.yml) with the configuration to create and install a Docker container with PostgreSQL DB. To make this work, you will need to do the following:

- Make sure you have Docker installed on your local machine;
- Configure the `DB_NAME`, `DB_PORT`, `DB_USER`, `DB_PASS` environment variables in your [.env](.env) file located in current directory;
- Run the following command in this directory:

```bash
$ docker compose up
```

You will need to run the [init.sql](init.sql) file in the database to create the necessary tables for the app to work with the database.