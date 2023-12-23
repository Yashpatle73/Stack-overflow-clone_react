import express from "express";
//import auth from '../middlewares/auth.js'

//import {AskQuestion} from  '../controllers/Questions.js'
import {getAllQuestions , deleteQuestion, voteQuestion ,AskQuestion} from  '../controllers/Questions.js'

const router = express.Router();

router.post("/Ask", AskQuestion);
router.get("/get", getAllQuestions);
router.delete("/delete/:id", deleteQuestion);
router.patch("/vote/:id", voteQuestion);



export default router;