import { CategoryModel } from "../../../../models/category";
import Controller from "../../controller";
import createError from "http-errors";
import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AddCategorySchema, UpdateCategorySchema } from "@/http/validators/admin/category.schema";

class CategoryController extends Controller {
  async addCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await AddCategorySchema.validate(req.body);
      const { title, parent } = req.body;
      const category = await CategoryModel.create({ title, parent });
      if (!category) throw createError.InternalServerError("خطای شبکه ");
      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        data: {
          message: "دسته بندی با موفقیت افزوده شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async remvoeCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const category = await this.checkExistCategory(id);
      // const deleteResult = await CategoryModel.deleteOne({
      //   __id: category.__id,
      // });
      // برای حذف هم زمان زیرمجموعه ها و خود دسته بندی به این صورت باید نوشته شود
      const deleteResult = await CategoryModel.deleteMany({
        $or: [{ _id: category._id }, { parent: category._id }],
      });
      if (deleteResult.deletedCount == 0) throw createError.InternalServerError("حذف دسته بندی انجام نشد.");
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: { message: "حذف دسته بندی با موفقیت انجام شد." },
      });
    } catch (error) {
      next(error);
    }
  }
  async editCategoryTitle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const category = await this.checkExistCategory(id);
      await UpdateCategorySchema.validate(req.body);
      const resultOfUpdate = await CategoryModel.updateOne({ _id: id }, { $set: { title } });
      if (resultOfUpdate.modifiedCount == 0) throw createError.InternalServerError("بروز رسانی انجام نشد.");
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          message: "بروز رسانی با موفقیت انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // const category = await CategoryModel.aggregate([
      //   {
      //     $lookup: {
      //       from: "categories",
      //       localField: "_id",
      //       foreignField: "parent",
      //       as: "children",
      //     },
      //   },
      //   {
      //     $project: {
      //       __v: 0,
      //       "children.__v ": 0,
      //       "children.parent": 0,
      //     },
      //   },
      //   {
      //     $match: {
      //       parent: undefined
      //     }
      //   }
      // ]);
      // const category = await CategoryModel.aggregate([
      //   {
      //     $graphLookup: {
      //       from: "categories",
      //       startWith: "$_id",
      //       connectFromField: "_id",
      //       connectToField: "parent",
      //       maxDepth: 5,
      //       depthField: "depth",
      //       as: "children",
      //     },
      //   },
      //   {
      //     $project: {
      //       __v: 0,
      //       "children.__v": 0,
      //       "children.parent": 0,
      //     },
      //   },
      //   {
      //     $match: {
      //       parent: undefined,
      //     },
      //   },
      // ]);

      const categories = await CategoryModel.find({ parent: undefined }, { __v: 0 });
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          categories,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id: _id } = req.params;
      const category = await CategoryModel.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(_id) },
        },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "parent",
            as: "children",
          },
        },
        {
          $project: {
            __v: 0,
            "children.__v": 0,
            "children.parent": 0,
          },
        },
      ]);
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          category,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllParents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parents = await CategoryModel.find({ parent: undefined }, { __v: 0 });
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          parents,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getChildOfParents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { parent } = req.params;
      const children = await CategoryModel.find({ parent }, { __v: 0, parent: 0 });
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          children,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllCategoryWithoutPopulate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categories = await CategoryModel.aggregate([
        {
          $match: {},
        },
      ]);
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          categories,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async checkExistCategory(id: string) {
    const category = await CategoryModel.findById(id);
    if (!category) throw createError.NotFound("دسته بندی یافت نشد.");
    return category;
  }
}

export const AdminCategoryController = new CategoryController();
export default AdminCategoryController;
