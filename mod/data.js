const bcrypt = require('bcryptjs');

const urlDatabase = {
  b6UTxQ: {
    shortURL: "b6UTxQ",
    longURL: "https://www.coca-cola.com",
    userID: "Yuol2b"
  },
  g6U87y: {
    shortURL: "g6U87y",
    longURL: "https://www.pepsi.com",
    userID: "Yuol2b"
  },
  i3BoGr: {
    shortURL: "i3BoGr",
    longURL: "https://www.google.com",
    userID: "yqB7hV"
  },
  j3bon7: {
    shortURL: "j3bon7",
    longURL: "https://www.yahoo.ca",
    userID: "yqB7hV"
  }
};

const users = {
  "Yuol2b": {
    id: "Yuol2b",
    email: "misterman@gmail.com",
    password: bcrypt.hashSync('apeman'),
  },
  "yqB7hV": {
    id: "yqB7hV",
    email: "bigguy@gmail.com",
    password: bcrypt.hashSync('grapeman'),
  }
};

module.exports = { urlDatabase, users };