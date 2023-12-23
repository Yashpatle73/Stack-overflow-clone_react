import React from 'react'
import { useSelector } from "react-redux";
import { useLocation, useNavigate ,Link} from "react-router-dom";
import './HomeMainbar.css'
//import Questions from '../../pages/Questions/Questions'
import QuestionList from "./QuestionList";
import Questions from './Questions';


function HomeMainbar() {
  
  const user=1;
  const questionsList = useSelector((state) => state.questionsReducer);
  //console.log(questionsList)

  // var questionsList= [{
  //   _id:'1',
  //   upVotes:3,
  //   downVotes:2,
  //   noOfAnswers:2,
  //   questionTitle:"What is function?",
  //   questionBody:"It meant to be",
  //   questionTags:["java","react js","mongo_db","Node js"],
  //   userPosted:"mono",
  //   userId:1,
  //   askedOn:"jan1",
  //   answer:[{
  //     answerBody:"Answer",
  //     userAnswered:"Yash",
  //     answerOn:"jan 2",
  //     userID:2,

  //   }]


  // },{
  //   _id:'2',
  //   upVotes:3,
  //   downVotes:2,
  //   noOfAnswers:0,
  //   questionTitle:"What is function?",
  //   questionBody:"It meant to be",
  //   questionTags:["Js","Python","R","C#"],
  //   userPosted:"mono",
  //   userId:1,
  //   askedOn:"jan1",
  //   answer:[{
  //     answerBody:"Answer",
  //     userAnswered:"Yash",
  //     answerOn:"jan 2",
  //     userID:2,

  //   }]

  // },{
  //   _id:'3',
  //   upVotes:3,
  //   downVotes:2,
  //   noOfAnswers:0,
  //   questionTitle:"What is function?",
  //   questionBody:"It meant to be",
  //   questionTags:["java","C","R","C++"],
  //   userPosted:"mono",
  //   userId:1,
  //   askedOn:"jan11",
  //   answer:[{
  //     answerBody:"Answer",
  //     userAnswered:"Yash",
  //     answerOn:"jan 2",
  //     userID:2,

  //   }]

  // }]

 
  const location = useLocation();
  //const user=null;
  const navigate =useNavigate()
  
  
  const checkAuth=()=>{
    if (user=== null){
      alert("login or singup to ask a question")
      navigate('/Auth')
    }
    else{
      navigate('./AskQuestion')
    }
  }
 
  return (
    <div className="main-bar">
    <div className="main-bar-header">
      {location.pathname === "/" ? <h1>Top Questions</h1>: 
        <h1>All Questions</h1>
      }
      <button to='/AskQuestion' onClick={checkAuth} className='ask-btn'>Ask Question</button>
      
    </div>
    <div>{
      questionsList.data=== null?
      <h1>Loading...</h1>:
      <><p>{questionsList.data.length}  questions</p>
      <QuestionList questionsList={questionsList.data}/>
      
      
      </>
    }
    </div>
  </div>
);
};


export default HomeMainbar