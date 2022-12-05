const { parseError } = require("../../helpers/validators/validationHelper");
const { validationResult } = require("express-validator");
const validationService = async (req, res, next) => {
  //server side validation
  let error = validationResult(req);
  if (!error.isEmpty()) {
    const processedErrors = await parseError(
      error.array({
        onlyFirstError: true,
      })
    );
    res.json({ message: processedErrors[0] });
  }
  next();
};
module.exports = { validationService };
