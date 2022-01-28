/* eslint-disable no-prototype-builtins */
const express = require('express');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs');

const { urlDatabase, users } = require('./mod/data');
const { utilities } = require('./mod/utilities');

const {
  checkURL,
  generateRandomString,
  getOwnersLinks,
  getUserIDFromEmail,
  verifyUserCookie,
} = utilities(urlDatabase, users);

/* var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt); */
// const salt = bcrypt.genSaltSync(10);

const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
// app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ['eloquent creek gopher', 'misbehaving blue donkey'],
}));

const PORT = 3000;

//
// // POST routes // //
//
app.post('/urls/:shortURL/delete', (req, res) => {
  // check credentials for deleting key
  const shortKey = req.params.shortURL;
  if (req.session.userID === urlDatabase[shortKey].userID) {
    delete urlDatabase[shortKey];
    return res.redirect('/urls');
  }
  
  res.status(401);
  return res.end('Error Status 401: You do not have permission to delete this URL.');

});

app.post('/urls/:shortURL/edit', (req, res) => {
  //check credentials for editing key
  const shortKey = req.params.shortURL;
  // check if user from cookie is owner of route
  if (req.session.userID === urlDatabase[shortKey].userID) {
    const newURL = checkURL(req.body.newURL);
    urlDatabase[shortKey].longURL = newURL;
    return res.redirect('/urls');
  }

  res.status(401);
  return res.end('Error Status 401: You do not have permission to edit this URL.');

});

app.post("/urls", (req, res) => {
  if (verifyUserCookie(req.session.userID)) {
    const newKey = generateRandomString(6);
    let newURL = checkURL(req.body.longURL);
    urlDatabase[newKey] = {
      longURL: newURL,
      userID: req.session.userID,
    };
    return res.redirect(`/urls/${newKey}`);
  }

  res.status(401);
  return res.end('Error Status 401: You can not create URLs if not logged in');
});

app.post('/login', (req, res) => {
  const loginEmail = req.body.email;
  const loginPassword = req.body.password;
  const userID = getUserIDFromEmail(loginEmail);
  if (userID && bcrypt.compareSync(loginPassword, users[userID].password)) {
    req.session.userID = userID;
    return res.redirect('/urls');
  }

  res.status(403);
  return res.end('Error Status 403: Credentials Not Found');
  
});

app.post('/logout', (req, res) => {
  req.session = null;
  return res.redirect('/urls');
});

app.post('/register', (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400);
    return res.end('Error Status 400: Bad Request, ensure all fields are complete.');
  }
  if (getUserIDFromEmail(req.body.email)) {
    res.status(400);
    return res.end('Error Status 400:Email already in use.');
  }
  const newID = generateRandomString(6);
  users[newID] = {
    id: newID,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  };
  req.session.userID = newID;
  return res.redirect('/urls');
  
});

//
// // GET routes // //
//
app.get('/urls/new', (req, res) => {
  const userKey = req.session.userID;
  if (verifyUserCookie(userKey)) {
    const userObj = users[userKey];
    const templateVars = {
      user: userObj,
    };
    return res.render('urls_new', templateVars);
  }
  
  res.status(401);
  return res.redirect('/login');
  
});

app.get('/urls/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL;
  if (!urlDatabase.hasOwnProperty(shortURL)) {
    return res.render('urls_show', {error: 'That URL does not exist', user: undefined});
  }
  const userKey = req.session.userID;
  const userObj = users[userKey];
  const templateVars = {
    shortURL: shortURL,
    longURL: urlDatabase[req.params.shortURL].longURL,
    user: userObj,
  };
  if (urlDatabase[shortURL].userID === userKey) {
    return res.render('urls_show', templateVars);
  }
  
  return res.render('urls_show', {error: "Unauthorized access. Please log in." , user: undefined});
});

app.get('/urls', (req, res) => {
  const userKey = req.session.userID;
  const userObj = users[userKey];
  const templateVars = {
    urls: getOwnersLinks(userKey),
    user: userObj,
  };
  return res.render('urls_index', templateVars);
});

app.get('/u/:shortURL', (req, res) => {
  if (urlDatabase[req.params.shortURL]) {
    const longURL = urlDatabase[req.params.shortURL].longURL;
    return res.redirect(longURL);
  }

  res.status(404);
  return res.end('Error Status 404: Resource Not Found');
  
});

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

app.get('/login', (req, res) => {
  const userKey = req.session.userID;
  if (verifyUserCookie(userKey)) {
    return res.redirect('/urls');
  }
  const userObj = users[userKey];
  const templateVars = {
    user: userObj,
  };
  return res.render('urls_login', templateVars);
});

app.get('/register', (req, res) => {
  const userKey = req.session.userID;
  const userObj = users[userKey];
  const templateVars = {
    user: userObj,
  };
  res.render('urls_register', templateVars);
});

app.get('/', (req, res) => {
  if (verifyUserCookie(req.session.userID)) {
    return res.redirect('/urls');
  }
  return res.redirect('/login');
});


app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});
