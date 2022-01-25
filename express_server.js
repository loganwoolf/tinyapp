const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
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

app.get('/', (req, res) => {
  res.send("Hello!");
});

app.post("/urls", (req, res) => {
  console.log(req.body);
  res.send('Ok');
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

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

app.get('/hello', (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

