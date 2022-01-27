const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
// use res.render to load up and ejs view file from ./views

const PORT = 3000;

const urlDatabase = {
  b6UTxQ: {
    longURL: "https://www.cocacola.com",
    userID: "Yuol2b"
  },
  g6U87y: {
    longURL: "https://www.pepsi.com",
    userID: "Yuol2b"
  },
  i3BoGr: {
    longURL: "https://www.google.com",
    userID: "yqB7hV"
  },
  j3bon7: {
    longURL: "https://www.yahoo.ca",
    userID: "yqB7hV"
  }
};

const users = {
  "Yuol2b": {
    id: "Yuol2b",
    email: "misterman@gmail.com",
    password: "apeman"
  },
  "yqB7hV": {
    id: "yqB7hV",
    email: "bigguy@gmail.com",
    password: "grapeman"
  }
};

const verifyUserCookie = (id) => {
  if (users[id]) {
    return true;
  }
  return false;
};

const getUserIDFromEmail = (email) => {
  for (let userID in users) {
    if (users[userID].email === email) {
      return users[userID].id;
    }
  }
  return null;
};

const generateRandomString = (len) => {
  let outputStr = "";
  for (let i = 0; i < len; i++) {
    let rndm = Math.floor(Math.random() * 62);
    if (rndm <= 9) {
      outputStr += String.fromCharCode(rndm + 48);
    } else if (rndm >= 36) {
      outputStr += String.fromCharCode(rndm + 61);
    } else {
      outputStr += String.fromCharCode(rndm + 55);
    }
  }

  return outputStr;
};

const checkURL = (url) => {
  // if single dot, add 'https://www.'
  if (url.match(/\./g).length === 1) {
    url = `https://www.${url}`;
  }

  // convert existing http to https
  url.replace('http://', 'https://');
  
  // if double dot, add 'https://' if missing
  if (url.search('https://') !== 0) {
    url = `https://${url}`;
  }

  return url;
};

//
// // POST routes // //
//
app.post('/urls/:shortURL/delete', (req, res) => {
  // check credentials for deleting key
  const key = req.params.shortURL;
  delete urlDatabase[key];
  res.redirect('/urls');
});

app.post('/urls/:shortURL/edit', (req, res) => {
  //check credentials for editing key
  let shortKey = req.params.shortURL;
  let newURL = checkURL(req.body.newURL);
  urlDatabase[shortKey].longURL = newURL;
  res.redirect('/urls');
});

app.post("/urls", (req, res) => {
  if (verifyUserCookie(req.cookies.user_id)) {
    const newKey = generateRandomString(6);
    let newURL = checkURL(req.body.longURL);
    urlDatabase[newKey] = {
      longURL: newURL,
      userID: req.cookies.user_id,
    };
    res.redirect(`/urls/${newKey}`);
  } else {
    res.status(401);
    res.statusMessage = 'Unauthorized';
    res.end('Error Status 401: You can not create URLs if not logged in');
  }
});

app.post('/login', (req, res) => {
  const loginEmail = req.body.email;
  const loginPassword = req.body.password;
  const userID = getUserIDFromEmail(loginEmail);
  if (userID && users[userID].password === loginPassword) {
    res.cookie('user_id', userID);
    res.redirect('/urls');
  } else {
    res.status(403);
    res.statusMessage = 'Forbidden';
    res.end('Error Status 403: Credentials Not Found');
  }
});

app.post('/logout', (req, res) => {
  res.clearCookie('user_id');
  res.redirect('/urls');
});

app.post('/register', (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400);
    res.statusMessage = 'Bad Request';
    res.end('Error Status 400: Bad Request, ensure all fields are complete.');
  } else if (getUserIDFromEmail(req.body.email)) {
    res.status(400);
    res.statusMessage = 'Bad Request';
    res.end('Error Status 400:Email already in use.');
  } else {
    const newID = generateRandomString(6);
    users[newID] = {
      id: newID,
      email: req.body.email,
      password: req.body.password
    };
    res.cookie('user_id', newID);
    res.redirect('/urls');
  }
});

//
// // GET routes // //
//
app.get('/urls/new', (req, res) => {
  const userKey = req.cookies.user_id;
  if (verifyUserCookie(userKey)) {
    const userObj = users[userKey];
    const templateVars = {
      user: userObj,
    };
    res.render('urls_new', templateVars);
  } else {
    res.status(401);
    res.statusMessage = 'Unauthorized';
    res.redirect('/login');
  }
});

app.get('/urls/:shortURL', (req, res) => {
  const userKey = req.cookies.user_id;
  const userObj = users[userKey];
  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL].longURL,
    user: userObj,
  };
  res.render('urls_show', templateVars);
});

app.get('/urls', (req, res) => {
  const userKey = req.cookies.user_id;
  const userObj = users[userKey];
  const templateVars = {
    urls: urlDatabase,
    user: userObj,
  };
  res.render('urls_index', templateVars);
});

app.get('/u/:shortURL', (req, res) => {
  const longURL = urlDatabase[req.params.shortURL].longURL;
  res.redirect(longURL);
});

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

app.get('/login', (req, res) => {
  const userKey = req.cookies.user_id;
  const userObj = users[userKey];
  const templateVars = {
    user: userObj,
  };
  res.render('urls_login', templateVars);
});

app.get('/register', (req, res) => {
  const userKey = req.cookies.user_id;
  const userObj = users[userKey];
  const templateVars = {
    user: userObj,
  };
  res.render('urls_register', templateVars);
});

app.get('/', (req, res) => {
  res.redirect('/urls');
});

app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});

