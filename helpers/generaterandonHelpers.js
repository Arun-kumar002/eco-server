const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require('./../config/index');

const generateRandomString = (length) => {
  let result = "";
  const characters =
    "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm1234567890";
  let chlength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * chlength));
  }
  return result;
};
const generateRandomNumber = (minlevel, maxlevel) => {
  let result = 0;
  result += Math.floor(Math.random() * (maxlevel - minlevel) + minlevel);
  return result;
};
const generateToken = (id) => {
  let token = JWT.sign({ id }, JWT_SECRET, {
    expiresIn: "5d",
  });
  return token
};
module.exports = { generateRandomString, generateRandomNumber, generateToken };
