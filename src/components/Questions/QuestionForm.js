import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { QuestionContext } from "./QuestionProvider";
import "./Questions.css"

export const QuestionForm = () => {
    const { addQuestion, updateQuestion, getQuestionById, getQuestions } = useContext(QuestionContext)
    const loggedInUser = sessionStorage.getItem("huntersHauntings_user")
    
    const [question, setQuestion ] = useState({
      questionTitle: "",
      message: "",
      userId: 0

    });
    
    const [isLoading, setIsLoading] = useState(true);

    const {questionId} = useParams();
	  const history = useHistory();

    useEffect(() => {
      getQuestions()
      .then(() => {
        if (questionId){
          getQuestionById(questionId)
          .then(question => {
              setQuestion(question)
              setIsLoading(false)
          })
        } else {
          setIsLoading(false)
        }
      })
    }, [])

    
    const handleControlledInputChange = (event) => {
      
      const newQuestion = { ...question }
      
      newQuestion[event.target.id] = event.target.value
      
      setQuestion(newQuestion)
    }

    const handleSaveQuestion = () => {
        setIsLoading(true);
        if (questionId) {
          
          updateQuestion({
              id: question.id,
              userId: parseInt(loggedInUser),
              questionTitle: question.questionTitle,
              message: question.message
          }, questionId)
          .then(() => history.push(`/questions/detail/${questionId}`))
        } else {
          
          addQuestion({
            userId: parseInt(loggedInUser),
            questionTitle: question.questionTitle,
            message: question.message
          })
          .then(() => history.push("/questions"))
        }
      }

    return (
      <form className="questionForm">
        <h2 className="questionForm__title">{questionId ? "Edit Question" : "Ask Question" }</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="questionName">Question: </label>
            <input type="text" id="questionTitle" name="title" required autoFocus className="form-control"
            placeholder="Question subject"
            onChange={handleControlledInputChange}
            value={question.questionTitle}/>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="questionMessage">Message: </label>
            <input type="text" id="message" name="message" required autoFocus className="form-control"
            placeholder="Put your message and details here"
            onChange={handleControlledInputChange}
            value={question.message}/>
          </div>
        </fieldset>
        <button className="btn btn-primary"
          disabled={isLoading}
          onClick={question => {
            question.preventDefault() 
            handleSaveQuestion()
          }}>
        {questionId ? "Save Question" : "Ask Question" }</button>
      </form>
    )
}