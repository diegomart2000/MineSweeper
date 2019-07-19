# MineSweeper
A Node.js implementation of minesweeper game 💣

## Installation

Clone this repo and run:

```npm install```

For env configuration, create a `.env` file with following variables:

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
`POST` `/api/user/register`

To create a new user, it will return a JWT token

*Body req Payload*
```
{
  email: String,
  password: String,
  name: String,
}
```

*Response*

```
JWT TOKEN
```



`POST` `/api/user/login`

To login an existing user, it will return a JWT token

*Body req Payload*
```
{
  email: String,
  password: String,
}
```

*Response*

```
JWT TOKEN
```



`GET` `/api/me`

To get existing user information,

*Headers*
```
Authorizarion: Bearer _TOKEN_HERE_
```

*Body req Payload*
```
{
  email: String,
  name: String,
}
```

*Response*
```
{
  _id: ObjectId,
  email: String,
  name: String,
}
```

{
  userId: ObjectId,
  name: String,
  size: Number,
  quantity: Number,
  board: Array,
  mines: Array,
  movesLeft: Number,
  gameOver: Boolean,
}

### Game
`POST` `/api/game`

To create a new Game for the given user

*Headers*
```
Authorizarion: Bearer _TOKEN_HERE_
```

*Body req Payload*
```
{
  name: String,
  size: Number, // Size of the board (9 -> 9 by 9)
  quantity: Number, // Amount of mines to place
}
```

*Response*
```
{
  _id: ObjectId,
  userId: ObjectId,
  name: String,
  size: Number,
  quantity: Number,
  board: Array,
  movesLeft: Number,
  gameOver: Boolean,
}
```

`GET` `/api/game/:gameId`
To get the Game status for a given `gameId`

*Headers*
```
Authorizarion: Bearer _TOKEN_HERE_
```

*Response*
```
{
  _id: ObjectId,
  userId: ObjectId,
  name: String,
  size: Number,
  quantity: Number,
  board: Array,
  movesLeft: Number,
  gameOver: Boolean,
}
```

`PATCH` `/api/game/:gameId`
To get make a move on a given `gameId`

*Headers*
```
Authorizarion: Bearer _TOKEN_HERE_
```

*Body req Payload*
```
{
  row: Number,
  col: Number,
}
```

*Response*
```
{
  _id: ObjectId,
  userId: ObjectId,
  name: String,
  size: Number,
  quantity: Number,
  board: Array,
  movesLeft: Number,
  gameOver: Boolean,
}
```

`PATCH` `/api/game/flag/:gameId`
To plant a Flag on a given `gameId` and `row` `col`

*Headers*
```
Authorizarion: Bearer _TOKEN_HERE_
```

*Body req Payload*
```
{
  row: Number,
  col: Number,
}
```

*Response*
```
{
  _id: ObjectId,
  userId: ObjectId,
  name: String,
  size: Number,
  quantity: Number,
  board: Array,
  movesLeft: Number,
  gameOver: Boolean,
}
```

