import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const CommentContext = createContext()

// This component establishes what data can be used.
export const CommentProvider = (props) => {
    const [comments, setComments] = useState([])

    const getComments = () => {
        return fetch("http://localhost:8088/comments?_expand=user")
        .then(res => res.json())
        .then(setComments)
    }
    
    const addComment = comment => {
        return fetch("http://localhost:8088/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
        .then(getComments)
    }
    const releaseComment = (id) => {
      return fetch(`http://localhost:8088/comments/${id}`, {
        method: "DELETE"
      })
        .then(getComments)
  } 
    const getCommentById = (id) => {
        return fetch(`http://localhost:8088/comments/${id}`)
            .then(res => {
              return res.json()
            }
              )
    }

    const updateComment = (comment, commentId) => {
      return fetch(`http://localhost:8088/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
      })
      .then(getComments)
    }
    
        return (
            <CommentContext.Provider value={
              {
                comments, addComment, releaseComment, getComments, getCommentById, updateComment
              }
            }>
              {props.children}
            </CommentContext.Provider>
          )
        
}