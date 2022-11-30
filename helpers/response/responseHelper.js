const {
  NO_CONTENT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UN_AUTHORIZED,
  UNPROCESSED_ENTITY,
  BAD_REQUEST,
} = require("../constants/statuscodeHelper");

const NOCONTENT = (res, message) => {
  respond(res, NO_CONTENT, message);
};
const INTERNALSERVERERROR = (res, message) => {
  respond(res, INTERNAL_SERVER_ERROR, message);
};
const NOTFOUND = (res, message) => {
  respond(res, NOT_FOUND, message);
};
const UNAUTHORIZED = (res, message) => {
  respond(res, UN_AUTHORIZED, message);
};
const UNPROCESSENTITY = (res, message) => {
  respond(res, UNPROCESSED_ENTITY, message);
};
const BADREQUEST = (res, message) => {
  respond(res, BAD_REQUEST, message);
};
const respond = (res, code, message, payload) => {
  const responseInfo =
    payload == undefined ? { message } : { message, payload };
  return res.status(code).json(responseInfo);
};
module.exports = {
  respond,
  NOCONTENT,
  INTERNALSERVERERROR,
  NOTFOUND,
  UNAUTHORIZED,
  UNPROCESSENTITY,
  BADREQUEST,
};
