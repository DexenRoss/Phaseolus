# Phaseolus web

Web page to get differential expression graphs from Phaseoulus gen.

## Requirements

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/) (if you're using Windows/OS X, compose comes with Docker Desktop)
-

## Installation

- Copy `.env.example` content to `.env` file
- Run the following commands:

```sh
docker compose build
docker compose up -d
```

## Shut down

```sh
docker compose down
```
