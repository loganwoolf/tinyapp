
const utilities = (urlDatabase, users) => {

  const checkURL = (url) => {
    url = url.replace(/http:\/\//, '');
    url = url.replace(/https:\/\//, '');
    if (url.match(/\./g).length === 1) {
      url = `https://www.${url}`;
    }
    if (url.search('https://') !== 0) {
      url = `https://${url}`;
    }
    return url;
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

  const getOwnersLinks = (ownerID) => {
    const ownersLinks = {};
    for (let key in urlDatabase) {
      if (urlDatabase[key].userID === ownerID) {
        ownersLinks[key] = urlDatabase[key];
      }
    }
    return ownersLinks;
  };

  const getUserIDFromEmail = (email) => {
    for (let userID in users) {
      if (users[userID].email === email) {
        return users[userID].id;
      }
    }
    return null;
  };

  const verifyUserCookie = (id) => {
    return users[id];
  };

  return {
    checkURL,
    generateRandomString,
    getOwnersLinks,
    getUserIDFromEmail,
    verifyUserCookie,
  };

};

module.exports = { utilities };