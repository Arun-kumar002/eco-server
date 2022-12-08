class UserError extends Error {
  constructor(statuscode, message) {
    super(message);
    this.statuscode = statuscode;
    this.message = message;
  }
}
class UserEntityNotFoundError extends Error {
  constructor() {
    super();
    this.message = "user entity not found.";
    this.errorCode = 400;
  }
}
class UserPasswordError extends Error {
  constructor() {
    super();
    this.message = "password mismatch";
    this.errorCode = 400;
  }
}
class UserExistsError extends Error {
  constructor() {
    super();
    this.message = "user email id already exist";
    this.errorCode = 400;
  }
}
class UserNotFoundError extends Error {
  constructor() {
    super();
    this.message = "user not found";
    this.errorCode = 400;
  }
}
class UserUpdateError extends Error {
  constructor() {
    super();
    this.message = "user update failed";
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
class UserIdInvalid extends Error {
  constructor() {
    super();
    this.message = "userid invalid";
    this.errorCode = 400;
  }
}
module.exports = {
  UserError,
  UserEntityNotFoundError,
  UserExistsError,
  UserPasswordError,
  UserNotFoundError,
  UserDeleteError,
  UserUpdateError,
  UserIdInvalid
};
