const bcrypt = require('bcryptjs');

const urlDatabase = {
  b6UTxQ: {
    shortURL: "b6UTxQ",
    longURL: "https://www.coca-cola.com",
    userID: "Yuol2b",
    visits: [
      { visitor: 'ejnj89ty', date: new Date('2022-01-12') },
      { visitor: 'ejnj89ty', date: new Date('2021-12-31') },
      { visitor: 'impmn76r', date: new Date('2021-12-29') },
      { visitor: '723k4hse', date: new Date('2021-12-26') },
      { visitor: 'lsdkrhsk', date: new Date('2021-12-24') },
    ],
    visitors: ['lsdkrhsk', '723k4hse', 'impmn76r', 'ejnj89ty']
  },
  g6U87y: {
    shortURL: "g6U87y",
    longURL: "https://www.pepsi.com",
    userID: "Yuol2b",
    visits: [
      { visitor: 'lsdkrhsk', date: new Date('2022-01-12') },
      { visitor: '723k4hse', date: new Date('2021-12-31') },
      { visitor: 'lsdkrhsk', date: new Date('2021-12-29') },
      { visitor: '723k4hse', date: new Date('2021-12-26') },
      { visitor: 'lsdkrhsk', date: new Date('2021-12-24') },
    ],
    visitors: ['lsdkrhsk', '723k4hse']
  },
  i3BoGr: {
    shortURL: "i3BoGr",
    longURL: "https://www.google.com",
    userID: "yqB7hV",
    visits: [
      { visitor: 'ejnj89ty', date: new Date('2022-01-12') },
      { visitor: 'ejnj89ty', date: new Date('2021-12-31') },
      { visitor: 'impmn76r', date: new Date('2021-12-29') },
      { visitor: '723k4hse', date: new Date('2021-12-26') },
      { visitor: 'lsdkrhsk', date: new Date('2021-12-24') },
      { visitor: 'lsdkrhsk', date: new Date('2021-12-22') },
    ],
    visitors: ['lsdkrhsk', '723k4hse', 'impmn76r', 'ejnj89ty']
  },
  j3bon7: {
    shortURL: "j3bon7",
    longURL: "https://www.yahoo.ca",
    userID: "yqB7hV",
    visits: [
      { visitor: 'ejnj89ty', date: new Date('2022-01-12') },
      { visitor: 'ejnj89ty', date: new Date('2021-12-31') },
      { visitor: 'impmn76r', date: new Date('2021-12-29') },
      { visitor: 'ejnj89ty', date: new Date('2021-12-26') },
      { visitor: 'impmn76r', date: new Date('2021-12-24') },
    ],
    visitors: ['ejnj89ty', 'impmn76r']
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