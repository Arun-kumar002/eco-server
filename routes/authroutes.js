const routes = require("express").Router();
const {
  registerController,
  loginController,
  newUserPasswordController,
  adminController,
  deleteController,
} = require("../controllers/authcontroller");
const baseRoute = "user";
//@access private --method-POST
//url=http://localhost:5000/auth/login
routes.post(`/${baseRoute}/login`, loginController);
//@access private --method-POST
//url=http://localhost:5000/auth/newuser
routes.post(`/${baseRoute}/setpassword`, newUserPasswordController);
//@access private --method-POST
//url=http://localhost:5000/auth/admin/register
routes.post("/admin/addadmin", adminController);
//@access private --method-POST
//url=http://localhost:5000/auth/user/delete
routes.post(`/${baseRoute}/delete`, deleteController);

//TODO exporting all routes
module.exports = routes;
