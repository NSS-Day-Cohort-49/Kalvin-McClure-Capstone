import React, { useContext, useEffect, useState } from "react"
import { CommentContext } from "../QuestionComments/CommentProvider"
import { QuestionContext } from "./QuestionProvider"
import "./Questions.css"
import { useParams, useHistory } from "react-router-dom"
import { CommentList } from "../QuestionComments/CommentList"

export const QuestionDetail = () => {

const { getQuestionById, releaseQuestion } = useContext(QuestionContext)
const { addComment } = useContext(CommentContext)
const loggedInUser = sessionStorage.getItem("huntersHauntings_user")

	const [question, setQuestion] = useState({})

	const {questionId} = useParams();
  
	const history = useHistory();
  const [comment, setComment ] = useState({
      id: 0,
      message: "",
      userId: loggedInUser,
      commentId: 0

  });


const handleRelease = () => {
    releaseQuestion(question.id)
      .then(() => {
        history.push("/questions")
      })
  }

  useEffect(() => {
    console.log("useEffect", questionId)
    getQuestionById(questionId)
    .then((response) => {
      setQuestion(response)
    })
    }, [])

    

    const handleControlledInputChange = (event) => {
      
      const newComment = { ...comment }
      
      newComment[event.target.id] = event.target.value
      
      setComment(newComment)
    }

    const handleSaveComment = () => 
        addComment({
          userId: parseInt(loggedInUser),
          questionId: question.id,
          message: comment.message
        })
        .then(() => history.push(`/questions/detail/${question.id}`))
      
    console.log("test jklasdf", parseInt(sessionStorage.getItem("huntersHauntings_user")))
console.log("user", question.userId)

  return (
    <>
      <section className="question">
        <h3 className="question__name">{question.questionTitle}</h3>
        <div className="question__message">Message: {question.message}</div>
        {question.userId === parseInt(sessionStorage.getItem("huntersHauntings_user"))? 
        <div><button onClick={handleRelease}>Delete Message</button>  
        <button onClick={() => {
          history.push(`/questions/edit/${question.id}`)
          }}>Edit</button></div> : null
      }
        
      </section><br></br>
      <div className="commentBox">
      <textarea onChange={handleControlledInputChange} value={comment.message} id="message"></textarea><br></br>
      <button onClick={handleSaveComment}>Comment</button>
      <div>
      <CommentList key={question.id} question={question}/>
      </div>
      </div>
    </>
  )
}