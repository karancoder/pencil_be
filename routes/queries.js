import { Router } from "express";
const router = Router();
import { get_questions_from_topics } from "../controllers/queries.js";

router.get("/:q", get_questions_from_topics);

export default router;
