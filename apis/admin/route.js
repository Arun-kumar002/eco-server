const routes = require("express").Router();
const adminServices= require("./service");
const { loginSchema } = require("../../helpers/validators/validationHelper");
const baseRoute = "admin";


//@access private --method-POST
//url=http://localhost:5000/auth/admin/login
routes.post(`/${baseRoute}/login`, loginSchema, adminServices.validateAdmin);

//@access private --method-POST
//url=http://localhost:5000/auth/admin
routes.post(`/${baseRoute}`, adminServices.addAdmin);


//TODO exporting all routes
module.exports = routes;
