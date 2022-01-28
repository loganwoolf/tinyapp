const { assert } = require('chai');
const { utilities } = require('../mod/utilities');

const testUsers = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
};

const {
  checkURL,
  generateRandomString,
  getOwnersLinks,
  getUserIDFromEmail,
  verifyUserCookie,
} = utilities(undefined, testUsers);


describe('#getUserIDFromEmail', () => {
  it('returns correct user from valid email', function() {
    const user = getUserIDFromEmail("user@example.com");
    const expectedUserID = "userRandomID";
    // Write your assert statement here
    assert.equal(user, expectedUserID);
  });

  it('returns null of no user exists', () => {
    const user = getUserIDFromEmail("nobody@gmail.com");
    assert.isNull(user);
  });
});

describe('#checkURL', () => {
  it("returns full 'https://www' domain if only main domain given", () => {
    const fixedDomain = checkURL('np.com');
    const expectedDomain = 'https://www.np.com';
    assert.equal(fixedDomain, expectedDomain);
  });

  it("returns 'https://' domain if subdomain is given", () => {
    const fixedDomain = checkURL('mail.google.com');
    const expectedDomain = 'https://mail.google.com';
    assert.equal(fixedDomain, expectedDomain);
  });
  it("returns 'https://' domain if protocol appended subdomain is given", () => {
    const fixedDomain = checkURL('http://www.google.com');
    const expectedDomain = 'https://www.google.com';
    assert.equal(fixedDomain, expectedDomain);
  });
  it("returns 'https://' domain if protocol appended main domain is given", () => {
    const fixedDomain = checkURL('http://google.com');
    const expectedDomain = 'https://www.google.com';
    assert.equal(fixedDomain, expectedDomain);
  });
});