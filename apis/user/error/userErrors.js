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
class ValidationError extends BaseError{
  constructor(errorMessage) {
    super(UserErrorCode.VALIDATION_ERROR,errorMessage);
  }
}

const HTTPErrorCodes = {
  ENTITY_NOT_FOUND: 401,
  CREDENTIAL_MISSMATCH: 403,
  ENTITY_ALREADY_EXISTS: 401,
  ENTITY_ID_INVALID: 407,
  MANDATORY_FIELDS_ERROR: 400,
  VALIDATION_ERROR: 400,
};

const handleError = (error, tag, req, res) => {
  if (error instanceof BaseError && error.errorCode === 101) {
    res.status(HTTPErrorCodes.ENTITY_NOT_FOUND).json({ message: "Entity not found", status: "error" });
    return
  }

  if (error instanceof BaseError && error.errorCode === 102) {
    res.status(HTTPErrorCodes.CREDENTIAL_MISSMATCH).json({ message: "invalid email & password", status: "error" });
    return
  }

  if (error instanceof BaseError && error.errorCode === 103) {
    res.status(HTTPErrorCodes.ENTITY_ALREADY_EXISTS).json({ message: "Entity already exist", status: "error" });
    return
  }

  if (error instanceof BaseError && error.errorCode === 107) {
    res.status(HTTPErrorCodes.MANDATORY_FIELDS_ERROR).json({ message: "Fill all mandatatory fields", status: "error" });
    return
  }

  if(error instanceof BaseError && error.errorCode == 108){
    res.status(HTTPErrorCodes.VALIDATION_ERROR).json({ message: error.message, status: "error" });
    return
  }
  console.error(`[handlerError]:${tag} path-${req.path}, Errorclass:${error.name}:${error.message}. ${error.stack}. params - ${req.params},body -${req.body}, query -${req.query}`);
  res.status(500).json({message:'internal server error',status:'error'})
  return
  
};

module.exports = {
  CredentialsMissmatchError,
  EntityNotFoundError,
  EntityExistsError,
  MandatoryFieldsError,
  ValidationError,
  handleError,
  HTTPErrorCodes
};
