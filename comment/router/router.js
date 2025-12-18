import express from "express";
import { CreateComment } from "../controller/controller.js";
import { getComments } from "../controller/controller.js";

const router = express.Router();

router.route("/:id/comments").post(CreateComment)
router.route("/:id/comments").get(getComments)

export default router;
 



