const UserErrorCode = {
  CONVERSATION_NOT_EXIST: 101,
  VALIDATION_ERROR: 108,
};
class BaseError extends Error {
  constructor(errorCode, message) {
    super();
    this.message = message;
    this.errorCode = errorCode;
  }
}

class ValidationError extends BaseError {
  constructor(errorMessage) {
    super(UserErrorCode.VALIDATION_ERROR, errorMessage);
  }
}
class ConversationNotExistError extends BaseError {
  constructor() {
    super(UserErrorCode.CONVERSATION_NOT_EXIST, "conversation not found");
  }
}
const HTTPErrorCodes = {
  VALIDATION_ERROR: 400,
  CONVERSATION_NOT_EXIST: 401,
};

const handleError = (error, tag, req, res) => {
  if (error instanceof BaseError && error.errorCode == 108) {
    res
      .status(HTTPErrorCodes.VALIDATION_ERROR)
      .json({ message: error.message, status: "error" });
    return;
  }
  if (error instanceof BaseError && error.errorCode == 101) {
    res
      .status(HTTPErrorCodes.CONVERSATION_NOT_EXIST)
      .json({ message: "chat conversation not found", status: "error" });
    return;
  }

  console.error(`[handlerError]:${tag} path-${req.path}, Errorclass:${error.name}:${error.message}. ${error.stack}. params - ${req.params},body -${req.body}, query -${req.query}`.red)
  res.status(500).json({ message: "internal server error", status: "error" });
  return;
};

module.exports = {
  ConversationNotExistError,
  handleError,
  ValidationError,
};
