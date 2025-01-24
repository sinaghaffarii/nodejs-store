import AdminEpisodeController from "@/http/controllers/admin/course/episode.controller";
import { uploadVideo } from "@/utils/multer";
import { Router } from "express";

const router = Router();

router.post("/add", uploadVideo.single("video"), AdminEpisodeController.addNewEpisode);
router.patch("/edit/:episodeID", uploadVideo.single("video"), AdminEpisodeController.updateEpisode);
router.delete("/remove/:episodeID", AdminEpisodeController.removeEpisode);

export const EpisodeAdminApiRoutes = router;
