const routes = require("express").Router();
const adminServices= require("./service");
const baseRoute = "admin";

//@access private --method-GET
//url=http://localhost:5000/api/v1/admin/
routes.get(`/${baseRoute}`,adminServices.getAdmin)
//@access private --method-POST
//url=http://localhost:5000/api/v1//admin/login
routes.post(`/${baseRoute}/login`, adminServices.validateAdmin);

//@access private --method-POST
//url=http://localhost:5000/api/v1//admin
routes.post(`/${baseRoute}`, adminServices.addAdminUser);

//@access private --method-put
//url=http://localhost:5000/api/v1/admin
routes.put(`/${baseRoute}`, adminServices.updateAdminUser);

//?testing routes
//@access private --method-POST
//url=http://localhost:5000/api/v1/admin
routes.delete(`/${baseRoute}`, adminServices.deleteAdminUser);
//TODO exporting all routes
module.exports = routes;
