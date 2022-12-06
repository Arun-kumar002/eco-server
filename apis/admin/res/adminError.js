let unauthorized = () => {
  return {
    message: "your not a authorized person",
    status: "error",
    code: 400,
  };
};
let internalError = () => {
  return { message: "internal server error", status: "error", code: 500 };
};
module.exports = { unauthorized ,internalError};
