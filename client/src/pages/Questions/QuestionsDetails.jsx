import React, { useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import './Questions.css'
import moment from "moment";
import copy from "copy-to-clipboard"
import { useSelector, useDispatch } from "react-redux";
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswer from "./DisplayAnswer";
import {postAnswer ,deleteQuestion, voteQuestion} from '../../actions/question'


const QuestionsDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const url = "http://localhost:3000";
    const questionsList = useSelector((state) => state.questionsReducer);
    const handleShare = () => {
        copy(url + location.pathname);
        alert("Copied url : " + url + location.pathname);
      };

    // var questionsList= [{
    //     _id:'1',
    //     upVotes:3,
    //     downVotes:2,
    //     noOfAnswers:2,
    //     questionTitle:"What is function?",
    //     questionBody:"It meant to be",
    //     questionTags:["java","react js","mongo_db","Node js"],
    //     userPosted:"mono",
    //     userId:1,
    //     askedon:"jan1",
    //     answer:[{
    //       answerBody:"Answer",
    //       userAnswered:"Yash",
    //       answerOn:"jan 2",
    //       userID:2,
    
    //     }]
    
    
    //   },{
    //     _id:'2',
    //     upVotes:3,
    //     downVotes:2,
    //     noOfAnswers:0,
    //     questionTitle:"What is function?",
    //     questionBody:"It meant to be",
    //     questionTags:["Js","Python","R","C#"],
    //     userPosted:"mono",
    //     userId:1,
    //     askedon:"jan1",
    //     answer:[{
    //       answerBody:"Answer",
    //       userAnswered:"Yash",
    //       answerOn:"jan 2",
    //       userID:2,
    
    //     }]
    
    //   },{
    //     _id:'3',
    //     upVotes:3,
    //     downVotes:2,
    //     noOfAnswers:0,
    //     questionTitle:"What is function?",
    //     questionBody:"It meant to be",
    //     questionTags:["java","C","R","C++"],
    //     userPosted:"mono",
    //     userId:1,
    //     askedon:"jan11",
    //     answer:[{
    //       answerBody:"Answer",
    //       userAnswered:"Yash",
    //       answerOn:"jan 2",
    //       userID:2,
    
    //     }]
    
    //   }]
    const [Answer, setAnswer] = useState("");
    const dispatch = useDispatch();
    const User = useSelector((state) => state.currentUserReducer);
    const Navigate = useNavigate();
    const handlePostAns = (e, answerLength) => {
        e.preventDefault();
        if (User === null) {
          alert("Login or Signup to answer a question");
          Navigate("/Auth");
        } else {
          if (Answer === "") {
            alert("Enter an answer before submitting");
          } else {
            dispatch(
              postAnswer({
                id,
                noOfAnswers: answerLength + 1,
                answerBody: Answer,
                userAnswered: User.result.name,
                userId:User.result._id
              })
            );
            //setAnswer("");
          }
        }
      };

      const handleDelete = () => {
        dispatch(deleteQuestion(id, Navigate));
      };

      const handleUpVote = () => {
        dispatch(voteQuestion(id, "upVote", User.result._id))
      }
      const handleDownVote = () => {
        dispatch(voteQuestion(id, "downVote", User.result._id))
      }

  return (
    <div className='question-details-page'>
        {
            questionsList.data===null ?
            <h1>Loading ...</h1>:
            <>
            {
                questionsList.data.filter(question => question._id === id).map((question) => (
                    <div key={question._id}>
                        <section className="question-details-container">
                        <h1>{question.questionTitle}</h1>
                        <div className="question-details-container-2">
                            <div className="question-votes">
                                <img src={upvote} alt="" width="18" srcSet="" className="votes-icon" onClick={handleUpVote} />
                                <p>{question.upVote.length - question.downVote.length}</p>
                                <img src={downvote} alt="" width="18" srcSet="" className="votes-icon"  onClick={handleDownVote} />

                            </div>
                            <div style={{ width: "100%" }}>
                            <p className="question-body">{question.questionBody}</p>
                            <div className="question-details-tags">
                            {
                            question.questionTags.map((tag) => (
                               <p key={tag}>{tag}</p>
                                ))
                            }
                            </div>
                            <div className="question-actions-user">
                                <div>
                                    <button type='button' onClick={handleShare}  >Share</button>
                                  { User?.result?._id === question?.userId && (
                                 <button type="button" onClick={handleDelete} > Delete</button>
                                  )}
                                </div>
                                <div>
                                <p>asked {moment(question.askedon).fromNow()}</p>
                                <Link to={`/Users/${question.userId}`} className="user-link" style={{ color: "#0086d8" }}>
                                    <Avatar backgroundColor="orange" px="8px"  py="5px"  borderRadius="4px">{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                    <div>{question.userPosted}</div>
                                 </Link>
                                </div>

                            </div>

                            </div>

                        </div>

                        </section>
                        {
                            question.noOfAnswers !== 0 &&(
                                <section>
                                    <h3>{question.noOfAnswers} Answers</h3>
                                    <DisplayAnswer key={question._id} question={question} handleShare={handleShare} />
                                
                                </section>
                            )
                        }
                        <section className="post-ans-container">
                        <h3>Your Answer</h3>
                        <form  onSubmit={(e)=> { handlePostAns(e, question.answer.length) } }  > 
                            <textarea name="" id="" cols="30" rows="10"  onChange={(e) => setAnswer(e.target.value)}  ></textarea>
                            <input type="submit" className="post-ans-btn" value="Post Your Answer" />
                        </form>
                        <p>
                        Browse other Question tagged
                        {
                            question.questionTags.map((tag) =>(
                                <Link to="/Tags" key={tag} className="ans-tags" ></Link>

                            ))
                        } or
                        <Link to="/AskQuestion" style={{ textDecoration: "none", color: "#009dff" }}> ask your own question. </Link>

                        </p>

                        </section>
                    </div>
                ))
            }
            </>
        }
      
    </div>
  )
}

export default QuestionsDetails
