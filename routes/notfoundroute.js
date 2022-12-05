const routes = require("express").Router();
const {
  deletenotfound,
  getnotfound,
  postnotfound,
  putnotfound,
} = require("../controllers/pagenotfound");
//!@access mistake
routes.get("*", getnotfound);
routes.post("*", postnotfound);
routes.put("*", putnotfound);
routes.delete("*", deletenotfound);

//TODO exporting all routes
module.exports = routes;
