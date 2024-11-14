const HomeController = require("../../http/controllers/api/Home.controller");

const router = require("express").Router();

router.post("/", HomeController.indexPage);

module.exports = {
  HomeRoutes: router,
};
