const { parseError } = require("../validators/validationHelper");
const { validationResult } = require("express-validator");
const { UNPROCESSENTITY } = require("../response/responseHelper");
const controllerhandler = ({ schema, controller }) => {
    //!schema and controller
  if ((schema, controller)) {
    return async (req, res) => {
      await Promise.all(schema.map((validate) => validate.run(req)));
      let error = validationResult(req);
      if (!error.isEmpty()) {
        const processedErrors = await parseError(
          error.array({
            onlyFirstError: true,
          })
        );
        UNPROCESSENTITY(res, processedErrors[0]);
      } else {
        controller(req, res);
      }
    };
  }
  //!jwt
  
};

module.exports = { controllerhandler };
