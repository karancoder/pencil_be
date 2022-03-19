import { Router } from "express";
const router = Router();
import {
    get_questions,
    get_question,
    post_question,
} from "../controllers/questions.js";

router.get("/", get_questions);

router.get("/:q", get_question);

router.post("/", post_question);

export default router;
