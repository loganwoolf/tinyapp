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
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
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

app.post('/urls/:shortURL/delete', (req, res) => {
  const key = req.params.shortURL;
  // console.log(req.body);
  delete urlDatabase[key];
  res.redirect('/urls');
});

app.post('/urls/:shortURL/edit', (req, res) => {
  // console.log(req.params);
  let shortKey = req.params.shortURL;
  // console.log(req.body);
  let newURL = checkURL(req.body.newURL);

  urlDatabase[shortKey] = newURL;

  res.redirect('/urls');
});

app.post("/urls", (req, res) => {
  // console.log(req.body);
  const newKey = generateRandomString(6);
  let longURL = checkURL(req.body.longURL);

  urlDatabase[newKey] = longURL;
  res.redirect(`/urls/${newKey}`);
});

app.post('/login', (req, res) => {
  // console.log(req.body);
  res.cookie('username', req.body.username);

  res.redirect('/urls');
});

app.get('/urls/new', (req, res) => {
  res.render('urls_new');
});

app.get('/urls/:shortURL', (req, res) => {
  // console.log(req.params) // { shortURL: 'whatever' }

  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL]
  };
  
  res.render('urls_show', templateVars);
  
});

app.get('/urls', (req, res) => {
  const templateVars = { urls: urlDatabase };

  // passing templateVars _OBJECT_ into urls_index template
  res.render('urls_index', templateVars);
});

app.get('/u/:shortURL', (req, res) => {

  const longURL = urlDatabase[req.params.shortURL];

  res.redirect(longURL);
});

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

app.get('/hello', (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get('/', (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

