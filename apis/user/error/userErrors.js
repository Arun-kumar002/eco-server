const UserErrorCode = {
  ENTITY_NOT_FOUND: 401,
  CREDENTIAL_MISSMATCH: 401,
  ENTITY_ALREADY_EXISTS: 403,
  ENTITY_UPDATE_FAILED: 304,
  ENTITY_DELETE_FAILED: 304,
  ENTITY_ID_INVALID: 204,
  MANDATORY_FIELDS_ERROR: 401,
  VALIDATION_ERROR: 400,
  NOT_FOUNT: 404,
};

class UserError extends Error {
  constructor(statuscode, message) {
    super(message);
    this.statuscode = statuscode;
    this.message = message;
  }
}
class MandatoryFieldsError extends Error {
  constructor() {
    super();
    this.message = "mandatory fields missing.";
    this.errorCode = UserErrorCode.MANDATORY_FIELDS_ERROR;
  }
}
class UserEntityNotFoundError extends Error {
  constructor() {
    super();
    this.message = "user entity not found.";
    this.errorCode = UserErrorCode.ENTITY_NOT_FOUND;
  }
}
class CredentialsMissmatchError extends Error {
  constructor() {
    super();
    this.message = "password mismatch";
    this.errorCode = UserErrorCode.CREDENTIAL_MISSMATCH;
  }
}
class UserExistsError extends Error {
  constructor() {
    super();
    this.message = "user email id already exist";
    this.errorCode = UserErrorCode.ENTITY_ALREADY_EXISTS;
  }
}
class UserNotFoundError extends Error {
  constructor() {
    super();
    this.message = "user not found";
    this.errorCode = UserErrorCode.ENTITY_NOT_FOUND;
  }
}
class UserUpdateError extends Error {
  constructor() {
    super();
    this.message = "user update failed";
    this.errorCode = UserErrorCode.ENTITY_UPDATE_FAILED;
  }
}
class UserDeleteError extends Error {
  constructor() {
    super();
    this.message = "user delete failed";
    this.errorCode = UserErrorCode.ENTITY_DELETE_FAILED;
  }
}
class UserIdInvalid extends Error {
  constructor() {
    super();
    this.message = "userid invalid";
    this.errorCode = UserErrorCode.ENTITY_ID_INVALID;
  }
}

class ValidationError extends Error {
  constructor() {
    super();
    this.message = "invalid values";
    this.errorCode = UserErrorCode.VALIDATION_ERROR;
  }
}
const UserErrorCodes = UserErrorCode;

module.exports = {
  UserError,
  UserEntityNotFoundError,
  UserExistsError,
  CredentialsMissmatchError,
  UserNotFoundError,
  UserDeleteError,
  UserUpdateError,
  UserIdInvalid,
  UserErrorCodes,
  MandatoryFieldsError,
  ValidationError,
};
