# ctd-prework-swapi-app

This is a Nodejs app that demonstrates API calls to the Star Wars API using the
/people and /planets endpoints.

## Running the server with Docker
### Prerequisites
- Docker Desktop

### Instructions
```bash
docker build . -t ctdprework
docker run -p 3000:3000 ctdprework
```

## Running the server natively
### Prerequisites
- Nodejs (tested on version 24.7)

### Instructions
```bash
npm i
npm start
```
