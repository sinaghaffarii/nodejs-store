import { NextFunction, Request, Response } from "express";
import Controller from "../controller";
import { StatusCodes } from "http-status-codes";

class HomeController extends Controller {
  async indexPage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      res.status(StatusCodes.OK).send("Index Page Store");
    } catch (error) {
      next(error);
    }
  }
}

export const homeController = new HomeController();
