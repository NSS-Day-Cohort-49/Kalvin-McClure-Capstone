import React, { useContext, useEffect, useState } from "react"
import { CommentContext } from "./CommentProvider"
import { CommentCard } from "./CommentCard"
import "./Comments.css"
import { useHistory } from "react-router-dom"

export const CommentList = ({ question }) => {
  const { getComments, comments } = useContext(CommentContext)

  
  const [ filteredComments, setFilteredComments ] = useState([])
  const history = useHistory()
console.log(filteredComments)

  useEffect(() => {
      getComments()
      .then(console.log("hi"))
    }, [])
    

  useEffect(() => {
    console.log(comments)
    const questionComments = comments.filter(comment => comment.questionId === question.id)
    setFilteredComments(questionComments)
  }, [comments])


  return (
    <>
      <h1 className="title">Comments</h1>

      <div className="comments">
      {
        filteredComments.map(comment => {
          return <CommentCard key={comment.id} comment={comment} />
        })
      }
      </div>
    </>
  )
}