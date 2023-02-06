# QuikLink-Backend

Backend for the QuikLink's iOS App

## Dependancies

This project utilizes Redis to cache user auth tokens. You will need to download the following for the project to run.

[Platform specific dowload instructions for Redis](https://redis.io/docs/getting-started/)

[Redis dowloads](https://redis.io/download/#redis-downloads)

All other project dependencies are in listed in the package.json and can be downloaded with

```bash
$ npm install
```

## Local environment checklist

Before you can run the project there are a couple of setup steps you will need to perform

1. Create your database file

For the local environment, the backend utilizes Sqlite as it is lightweight and easily stored on your machine's filesystem. To create the database run:

```bash
npm run database
```

2. Add .env file to project

This project utilizes .env files to configure our projects environment; allowing our backend to run in a local or production setting. To get started copy the `env.local-example` file into an `.env` file like so:

```bash
cp env.local-example .env
```

Then open the environment file and fill in the `<...>` with the types specified.

## Running the app

```bash
# development
$ npm run start

# production mode
$ npm run start:prod
```

## Stopping the app

To stop the application simply send a SIGINT signal to the program. This can be done by using the following keyboard shortcuts:

MacOS: Cmd + C
Linux & Windows: Ctrl + C

In some cases the Redis database this project utilizes may stay active even after sending the SIGINT signal. This can causes errors in the future and or simply takes up resources that are no longer in use. To shutdown the local redis server run

```bash
npm run stop-redis
```

## License

QuikLink is [MIT licensed](LICENSE).
