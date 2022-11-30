const {
  NOCONTENT,
  INTERNALSERVERERROR,
  NOTFOUND,
  UNAUTHORIZED,
  UNPROCESSENTITY,
  BADREQUEST,
} = require("./responseHelper");
const handleError = (error, res) => {
  if (error.name === "HttpNotFound") {
    return NOTFOUND(res, error.message);
  }
  if (error.name === "HttpBadRequest") {
    return BADREQUEST(res, error.message);
  }
  if (error.name === "HttpUnAuthorized") {
    return UNAUTHORIZED(res, error.message);
  }
  if (error.name === "HttpNoContent") {
    return NOCONTENT(res, error.message);
  }
  if (error.name === "ValidationError") {
    return UNPROCESSENTITY(res, error.message);
  }
  return INTERNALSERVERERROR(res, "Internal Server Error");
};

module.exports = { handleError };
