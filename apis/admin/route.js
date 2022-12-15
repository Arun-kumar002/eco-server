const routes = require("express").Router();
const adminServices= require("./service");
const baseRoute = "admin";

//@access private --method-POST
//url=http://localhost:5000/auth/admin/login
routes.post(`/${baseRoute}/login`, adminServices.validateAdmin);

//@access private --method-POST
//url=http://localhost:5000/auth/admin
routes.post(`/${baseRoute}`, adminServices.addAdminUser);

//@access private --method-put
//url=http://localhost:5000/auth/admin
routes.put(`/${baseRoute}`, adminServices.updateAdminUser);

//?testing routes
//@access private --method-POST
//url=http://localhost:5000/auth/admin
routes.delete(`/${baseRoute}`, adminServices.deleteAdminUser);
//TODO exporting all routes
module.exports = routes;
