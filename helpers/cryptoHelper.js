const CryptoJS = require("crypto-js");
const { createHash } = require("crypto");
const { PASSWORD_SECRET } = require("../config/index");

const hashingPassword = (password) => {
  return CryptoJS.AES.encrypt(password, PASSWORD_SECRET).toString();
};

const unHashingPassword = (password) => {
  return CryptoJS.AES.decrypt(password, PASSWORD_SECRET).toString(
    CryptoJS.enc.Utf8
  );
};
const generateSHA256Hash = (key) => {
  let hash = createHash("sha256").update(key).digest("hex");
  return hash;
};
const generateSHA256password = (key, salt) => {
  let secret = salt;
  let hash = createHash("sha256").update(key, secret).digest("hex");
  return hash;
};
module.exports = {
  hashingPassword,
  unHashingPassword,
  generateSHA256Hash,
  generateSHA256password,
};
