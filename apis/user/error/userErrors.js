const UserErrorCode = {
  ENTITY_NOT_FOUND: 101,
  CREDENTIAL_MISSMATCH: 102,
  ENTITY_ALREADY_EXISTS: 103,
  ENTITY_ID_INVALID: 106,
  MANDATORY_FIELDS_ERROR: 107,
  VALIDATION_ERROR: 108,
};
class BaseError extends Error {
  constructor(errorCode, message) {
    super();
    this.message = message;
    this.errorCode = errorCode;
  }
}

class MandatoryFieldsError extends BaseError {
  constructor() {
    super(UserErrorCode.MANDATORY_FIELDS_ERROR, "mandatory fields missing.");
  }
}
class EntityNotFoundError extends BaseError {
  constructor() {
    super(UserErrorCode.ENTITY_NOT_FOUND, "user entity not found.");
  }
}
class CredentialsMissmatchError extends BaseError {
  constructor() {
    super(UserErrorCode.CREDENTIAL_MISSMATCH, "password mismatch");
  }
}
class EntityExistsError extends BaseError {
  constructor() {
    super(UserErrorCode.ENTITY_ALREADY_EXISTS, "user email id already exist");
  }
}

const UserErrorCodes = UserErrorCode;
const handleError = (error, res) => {
  if (error.errorCode === 101) {
    res.status(401).json({ message: "Entity not found", status: "error" });
  }
  else if (error.errorCode === 102) {
    res.status(403).json({ message: "invalid email & password", status: "error" });
  }
  else if (error.errorCode === 103) {
    res.status(401).json({ message: "Entity already exist", status: "error" });
  }
  else if (error.errorCode === 107) {
    res.status(400).json({ message: "Fill all mandatatory fields", status: "error" });
  }
  else{
     res.status(500).json({message:'internal server error',status:'error'})
  }
};

module.exports = {
  CredentialsMissmatchError,
  EntityNotFoundError,
  EntityExistsError,
  MandatoryFieldsError,
  handleError
};
