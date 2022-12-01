const routes = require("express").Router();
const {
  registerController,
  loginController,
  newUserPasswordController,
  adminController,
} = require("../controllers/authcontroller");
//@access private --method-POST
//url=http://localhost:5000/auth/register
routes.post("/register", registerController);
//@access private --method-POST
//url=http://localhost:5000/auth/login
routes.post("/login", loginController);
//@access private --method-POST
//url=http://localhost:5000/auth/newuser
routes.post("/newuser", newUserPasswordController);
//@access private --method-POST
//url=http://localhost:5000/auth/admin/register
routes.post("/admin/register", adminController);

//TODO exporting all routes
module.exports = routes;
