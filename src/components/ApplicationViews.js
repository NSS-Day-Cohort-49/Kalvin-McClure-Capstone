import React from "react"
import { Route } from "react-router-dom"
import "./ApplicationViews.css"
import { QuestionProvider } from "./Questions/QuestionProvider"
import { QuestionList } from "./Questions/QuestionList"
import { QuestionForm } from "./Questions/QuestionForm"
import { QuestionDetail } from "./Questions/QuestionDetail"
import { CommentProvider } from "./QuestionComments/CommentProvider"
import { CommentForm } from "./QuestionComments/CommentEdit"

export const ApplicationViews = () => {
  return (
  <>
  <QuestionProvider>
  <CommentProvider>
      <Route exact path="/home">
        
        <div class="home">Hunters and Hauntings is a web app dedicated to helping paranormal investigators identify and erradicate hauntings and other explained events. Here, you can identify different types of ghosts based on evidence, ask questions to other people in the field, and connect with others. Happy hunting!</div>
      </Route>
      <Route exact path="/questions">
        <QuestionList />
      </Route>
      <Route exact path="/ghosts">
        
      </Route>
      <Route exact path="/questions/create">
        <QuestionForm />
      </Route>
      <Route path="/questions/edit/:questionId(\d+)">
        <QuestionForm />
      </Route>
      <Route path="/comments/edit/:commentId(\d+)">
        <CommentForm />
      </Route>
      <Route exact path="/questions/detail/:questionId(\d+)">
        <QuestionDetail />
        
      </Route>
      </CommentProvider>
      </QuestionProvider>
    </>
  )
}