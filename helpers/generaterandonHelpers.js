const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("./../config/index");

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

const generateToken = (email) => {
  let token = JWT.sign({ email }, JWT_SECRET, {
    expiresIn: "5d",
  });
  return token;
};

// exports. generateRandomUser=()=>{
//   const inputs = {
//     userName: "testing-jest",
//     password: "test123",
//     mobile: this.generateRandomNumber(55555, 1000000),
//     role: "user",
//     email: `${this.generateRandomString(10)}@gmail.com`,
//   };
//   return inputs
// }
module.exports = {
  generateRandomString,
  generateRandomNumber,
  generateToken,
};

