const AdminErrorCodes = {
  ENTITY_NOT_FOUND: 101,
};

class AdminError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.errorCode = errorCode;
    this.message = message;
  }
}

class AdminEntityNotFoundError extends Error {
  constructor() {
    super();
    this.message = "Admin entity not found.";
    this.errorCode = 404;
  }
}
class AdminPasswordError extends Error {
  constructor() {
    super();
    this.message = "password mismatch";
    this.errorCode = 400;
  }
}
class AdminExists extends Error {
  constructor() {
    super();
    this.message = "admin id already exist";
    this.errorCode = 400;
  }
}
class AdminUpdateError extends Error {
  constructor() {
    super();
    this.message = "admin update failed";
    this.errorCode = 400;
  }
}
class UserDeleteError extends Error {
  constructor() {
    super();
    this.message = "user delete failed";
    this.errorCode = 400;
  }
}
module.exports = {
  AdminError,
  AdminEntityNotFoundError,
  AdminPasswordError,
  AdminExists,
  AdminUpdateError,
  UserDeleteError,
};
