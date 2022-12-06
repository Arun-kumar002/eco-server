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
let notFound = () => {
  return { message: "notfound", status: "error", code: 404 };
};
let unable=()=>{
  return {
    message: "unable to update",
    status: "error",
    code: 400,
  };
}
module.exports = { unauthorized, internalError, notFound,unable };
