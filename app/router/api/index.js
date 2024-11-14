const HomeController = require("../../http/controllers/api/Home.controller");

const router = require("express").Router();

router.get("/", HomeController.indexPage);

module.exports = {
  HomeRoutes: router,
};
