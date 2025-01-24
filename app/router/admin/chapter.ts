import AdminChapterController from "@/http/controllers/admin/course/chapter.controller";
import { Router } from "express";

const router = Router();


router.put("/add", AdminChapterController.addChapter);
router.get("/list/:courseID", AdminChapterController.chaptersOfCourse);
router.patch("/remove/:chapterID", AdminChapterController.removeChapterById);
router.patch("/update/:chapterID", AdminChapterController.updateChapterById);

export const ChapterAdminApiRoutes = router;


