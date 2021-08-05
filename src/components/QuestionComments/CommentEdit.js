import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { CommentContext } from "./CommentProvider";
import "./Comments.css"

export const CommentForm = () => {
    const { updateComment, getCommentById, getComments } = useContext(CommentContext)
    const loggedInUser = sessionStorage.getItem("huntersHauntings_user")
    //for edit, hold on to state of eventObj in this view
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

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
      
      const newComment = { ...comment }
      //event is an object with properties.
      //set the property to the new value
      newComment[event.target.id] = event.target.value
      //update state
      setComment(newComment)
    }

    const handleSaveComment = () => {
        if (commentId) {
          //PUT - update
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
            comment.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSaveComment()
          }}>
        Save Comment</button>
            </fieldset>
    </form>
</>
    )
}