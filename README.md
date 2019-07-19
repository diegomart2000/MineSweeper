# MineSweeper
A Node.js implementation of minesweeper game 💣

## Installation

Clone this repo and run:

```npm install```

For env configuration, create a `.env` file with following variales:

```
HOST=localhost
PORT=3000

BACKEND_URL=http://localhost:3000
CLIENT_BASE_URL=http://localhost:8080

DATABASE_URL=_YOUR_MONGO_DB_URL_
REDIS_URL=_YOUR_REDIS_URL_

SALT=Any secret you like for sync JWT
```

## API Reference

### User
`POST` _/api/user/register_
To create a new user, it will return a JWT token

*Body req Payload*
```
{
  email,
  password,
  name
}
```

`POST` _/api/user/login_
To login an existing user, it will return a JWT token

*Body req Payload*
```
{
  email,
  password
}
```

`GET` _/api/me_
To get existing user information,

*Headers*
```
Authorizarion: Bearer _TOKE_HERE_
```

*Body req Payload*
```
{
  email,
  password
}
```
