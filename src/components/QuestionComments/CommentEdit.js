import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { CommentContext } from "./CommentProvider";
import "./Comments.css"

export const CommentForm = () => {
    const { updateComment, getCommentById, getComments } = useContext(CommentContext)
    const loggedInUser = sessionStorage.getItem("huntersHauntings_user")
    
    const [comment, setComment ] = useState({
        message: "",
        userId: 0,
        questionId: 0

    });
    
    

    const {commentId} = useParams();
	  const history = useHistory();

    useEffect(() => {
      getComments()
      .then(() => {
          getCommentById(commentId)
          .then(comment => {
              console.log(comment)
              setComment(comment)
          })
      })
    }, [])

    
    const handleControlledInputChange = (event) => {
      
      const newComment = { ...comment }
      
      newComment[event.target.id] = event.target.value
      
      setComment(newComment)
    }

    const handleSaveComment = () => {
        if (commentId) {
          
          updateComment({
              id: comment.id,
              userId: parseInt(loggedInUser),
              questionId: comment.questionId,
              message: comment.message
          }, commentId)
          .then(() => history.push(`/questions/detail/${comment.questionId}`))
        } 
      }
    return (
<>
    <form className="commentForm">
        <h2 className="commentForm__message">Edit Comment
        </h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="commentMessage">Message:
                    </label>
                    <input type="text" id="message" name="message" required autoFocus className="form-control"
                    placeholder="Write your message here"
                    onChange={handleControlledInputChange}
                    value={comment.message}/>
                </div>
                <button className="btn btn-primary"
          onClick={comment => {
            comment.preventDefault() 
            handleSaveComment()
          }}>
        Save Comment</button>
            </fieldset>
    </form>
</>
    )
}