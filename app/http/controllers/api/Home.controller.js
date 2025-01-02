const Controller = require("../controller");

module.exports = new (class HomeController extends Controller {
  async indexPage(req, res, next) {
    try {
      return res.status(HttpStatus.OK).send("Index Page Store");
    } catch (error) {
      next(error);
    }
  }
})();
