import express, { Router } from 'express';
import { CreateSnippet } from '../controller/controller.js';
import { getSnippet } from '../controller/controller.js';
import { deleteSnippet } from '../controller/controller.js';
const  router = express.Router();


router.route("/").post(CreateSnippet)
router.route("/").get(getSnippet)
router.route("/:id").delete(deleteSnippet)




export default router;


