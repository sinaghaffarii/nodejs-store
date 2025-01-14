import AdminCourseController from "@/http/controllers/admin/course.controller";
import { stringToArray } from "@/http/middlewares/stringToArray";
import { uploadFile } from "@/utils/multer";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 *   components:
 *     schemas:
 *       Types:
 *         type: string
 *         enum:
 *           - free
 *           - cash
 *           - special
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *        Insert-Course:
 *          type: object
 *          required:
 *            - title
 *            - short_text
 *            - text
 *            - tags
 *            - category
 *            - price
 *            - discount
 *            - image
 *            - type
 *            - teacher
 *          properties:
 *            title:
 *              type: string
 *              description: the title of Course
 *              placeholder: عنوان محصول
 *            short_text:
 *              type: string
 *              description: the short_text of Course
 *            text:
 *              type: string
 *              description: the text of Course
 *            tags:
 *              type: array
 *              description: the tags of Course
 *            category:
 *              type: string
 *              description: the category of Course
 *            price:
 *              type: string
 *              description: the price of Course
 *            discount:
 *              type: string
 *              description: the discount of Course
 *            image:
 *              type: file
 *              description: The image to upload
 *           teacher:
 *              type: string
 *              description: the Teacher of Course
 *            type:
 *              $ref: '#/components/schemas/Types'
 */

/**
 * @swagger
 *  /admin/courses/list:
 *      get:
 *          tags: [Course(AdminPanel)]
 *          summary: get all of courses
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search in course text, title, short_text
 *          responses:
 *              200:
 *                  description: success
 */

router.get("/list", AdminCourseController.getListOfCourses); // get all course

/**
 * @swagger
 *   /admin/courses/add:
 *     post:
 *       tags:
 *         - Course(AdminPanel)
 *       summary: Create and save Course
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *                $ref: '#/components/schemas/Insert-Course'
 *       responses:
 *         201:
 *           description: Created successfully!
 *         400:
 *           description: Bad Request - Invalid input.
 *         500:
 *           description: Internal Server Error.
 */

router.post("/add", uploadFile.single("image"), stringToArray("tags"), AdminCourseController.addCourse);

// router.put() // create new chapter
// router.put() // create new episode
// router.delete() // remove a course
// router.patch() // edit a course
// router.get() // get a course

export const CourseAdminApiRoutes = router;
