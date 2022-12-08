const routes = require("express").Router();
const adminServices= require("./service");
const validationSchema= require("../../helpers/validators/validationHelper");
const baseRoute = "admin";



//@access private --method-POST
//url=http://localhost:5000/auth/admin/login
routes.post(`/${baseRoute}/login`, validationSchema.loginSchema, adminServices.validateAdmin);

//@access private --method-POST
//url=http://localhost:5000/auth/admin
routes.post(`/${baseRoute}`,validationSchema.addAdminUserSchema, adminServices.addAdminUser);

//@access private --method-put
//url=http://localhost:5000/auth/admin
routes.put(`/${baseRoute}`,validationSchema.addAdminUserSchema, adminServices.updateAdminUser);

//?testing routes
//@access private --method-POST
//url=http://localhost:5000/auth/admin
routes.delete(`/${baseRoute}`,validationSchema.deleteAdminUser, adminServices.deleteAdminUser);
//TODO exporting all routes
module.exports = routes;
