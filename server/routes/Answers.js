import express from "express";
//import auth from '../middlewares/auth.js'


import { postAnswer, deleteAnswer } from "../controllers/Answers.js";

const router = express.Router();

router.patch("/post/:id",  postAnswer);
router.patch("/delete/:id", deleteAnswer)

export default router;