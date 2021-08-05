import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const QuestionContext = createContext()

// This component establishes what data can be used.
export const QuestionProvider = (props) => {
    const [questions, setQuestions] = useState([])
    const [ searchTerms, setSearchTerms ] = useState("")

    const getQuestions = () => {
        return fetch("http://localhost:8088/questions?_expand=user")
        .then(res => res.json())
        .then(setQuestions)
    }
    
    const addQuestion = question => {
        return fetch("http://localhost:8088/questions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(question)
        })
        .then(getQuestions)
    }

    const releaseQuestion = questionId => {
        return fetch(`http://localhost:8088/questions/${questionId}`, {
          method: "DELETE"
        })
          .then(getQuestions)
    }

    const updateQuestion = (question, questionId) => {
        return fetch(`http://localhost:8088/questions/${questionId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(question)
        })
          .then(getQuestions)
      }
      
    const getQuestionById = (id) => {
        return fetch(`http://localhost:8088/questions/${id}`)
            .then(res => res.json())
    }

    
        return (
            <QuestionContext.Provider value={
              {
                questions, addQuestion, getQuestions, getQuestionById, searchTerms, updateQuestion, releaseQuestion, setSearchTerms
              }
            }>
              {props.children}
            </QuestionContext.Provider>
          )
        
}