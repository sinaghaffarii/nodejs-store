import AdminCourseController from "@/http/controllers/admin/course/course.controller";
import { stringToArray } from "@/http/middlewares/stringToArray";
import { uploadFile } from "@/utils/multer";
import { Router } from "express";

const router = Router();

router.get("/list", AdminCourseController.getListOfCourses); // get all course

router.get("/:id", AdminCourseController.getCourseById); // get one course by id

router.post("/add", uploadFile.single("image"), stringToArray("tags"), AdminCourseController.addCourse);

router.patch("/update/:id", uploadFile.single("image"), stringToArray("tags"), AdminCourseController.updateCourseById);

// router.put() // create new episode
// router.delete() // remove a course
// router.patch() // edit a course
// router.get() // get a course

export const CourseAdminApiRoutes = router;
