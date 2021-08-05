import React, { useContext, useEffect, useState } from "react"
import { QuestionContext } from "./QuestionProvider"
import { QuestionCard } from "./QuestionCard"
import "./Questions.css"
import { useHistory } from "react-router-dom"

export const QuestionList = () => {
  const { questions, getQuestions, searchTerms } = useContext(QuestionContext)

  
  const [ filteredQuestions, setFiltered ] = useState([])
  const history = useHistory()
console.log(filteredQuestions)

  useEffect(() => {
      getQuestions()
  }, [])


  useEffect(() => {
    if (searchTerms !== "") {

      const subset = questions.filter(question => question.questionTitle.toLowerCase().includes(searchTerms))
      setFiltered(subset)
    } else {

      setFiltered(questions)
    }
  }, [searchTerms, questions])

  return (
    <>
      <h1 className="title">Questions</h1>

      <div className="questions">
      {
        filteredQuestions.map(question => {
          return <QuestionCard key={question.id} question={question} />
        })
      }
      </div>
      <div className="question">
      <button onClick={() => history.push("/questions/create")}>
          Ask a Question
      </button>
      </div>
    </>
  )
}