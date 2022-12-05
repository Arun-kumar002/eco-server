const routes = require("express").Router();
const { validateAdmin, addAdmin } = require("./service");
const { loginSchema } = require("../../helpers/validators/validationHelper");

const baseRoute = "admin";


//@access private --method-POST
//url=http://localhost:5000/auth/admin/login
routes.post(`/${baseRoute}/login`, loginSchema, validateAdmin);

//@access private --method-POST
//url=http://localhost:5000/auth/admin
routes.post(`/${baseRoute}`, addAdmin);


//TODO exporting all routes
module.exports = routes;
