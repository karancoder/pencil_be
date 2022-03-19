import { Router } from "express";
const router = Router();
import { get_topics, get_topic, post_topic } from "../controllers/topics.js";

router.get("/", get_topics);

router.get("/:q", get_topic);

router.post("/", post_topic);

export default router;
