const routes = require("express").Router();
const {
  useralldatacontroller,
  userdeletecontroller,
  getindividualuser,
  induserupdatecontroller,
  registerController,
  newUserPasswordController,
} = require("./controller");
const { registerSchema } = require("../../helpers/validators/validationHelper");
const { validationService } = require("./services");
const baseRoute = "user";
//@access public --method-get
//url=http://localhost:5000/user
routes.get(`/${baseRoute}`, useralldatacontroller);
//@access public --method-get
//url=http://localhost:5000/user/:id
routes.get(`/${baseRoute}/:id`, getindividualuser);
//@access private --method-POST
//url=http://localhost:5000/user/register
routes.post(
  `/${baseRoute}`,
  registerSchema,
  validationService,
  registerController
);
//@access private --method-POST
//url=http://localhost:5000/user/setpassword
routes.post(`/${baseRoute}/setpassword`, newUserPasswordController);
//@access private --method-put
//url=http://localhost:5000/user/:id
routes.put(`/${baseRoute}/:id`, induserupdatecontroller);

//@access privat --method-delete
//url=http://localhost:5000/user/:id
routes.delete(`/${baseRoute}/:id`, userdeletecontroller);

//TODO exporting all routes
module.exports = routes;
