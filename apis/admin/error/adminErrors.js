const AdminErrorCodes = {
  ENTITY_NOT_FOUND: 404,
  PASSWORD_MISSMATCH:403,
  ENTITY_ALREADY_EXISTS:403,
  ENTITY_UPDATE_FAILED:304,
  ENTITY_DELETE_FAILED:304,
  ENTITY_ID_INVALID:204
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
    this.errorCode = AdminErrorCodes.ENTITY_NOT_FOUND;
  }
}
class AdminPasswordError extends Error {
  constructor() {
    super();
    this.message = "password mismatch";
    this.errorCode = AdminErrorCodes.PASSWORD_MISSMATCH;
  }
}
class AdminExists extends Error {
  constructor() {
    super();
    this.message = "admin id already exist";
    this.errorCode = AdminErrorCodes.ENTITY_ALREADY_EXISTS;
  }
}
class AdminUpdateError extends Error {
  constructor() {
    super();
    this.message = "admin update failed";
    this.errorCode = AdminErrorCodes.ENTITY_UPDATE_FAILED;
  }
}
class UserDeleteError extends Error {
  constructor() {
    super();
    this.message = "user delete failed";
    this.errorCode = AdminErrorCodes.ENTITY_DELETE_FAILED;
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
