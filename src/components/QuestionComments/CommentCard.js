import React, { useContext } from "react";
import "./Comments.css"
import { CommentContext } from "./CommentProvider"
import { Link, useHistory, useParams } from "react-router-dom"

export const CommentCard = ({ comment }) => {
    const { releaseComment } = useContext(CommentContext)
    const history = useHistory();
    const {questionId} = useParams();

    const handleRelease = () => {
        releaseComment(comment.id)
          .then(() => {
            history.push(`/questions/detail/${questionId}`)
          })
      }
      return (
    <>
        <section className="comment">
        <div className="borderComment">
            <h5 className="commentMessage">
          
                { comment.message }
          
            </h5>
            <div className="comment__userId">{ comment.user.name }</div>
            {comment.userId === parseInt(sessionStorage.getItem("huntersHauntings_user"))? 
        <div><button onClick={handleRelease}>Delete</button>  
        <button onClick={() => {
          history.push(`/comments/edit/${comment.id}`)
          }}>Edit</button></div> : null
      }
        
            </div>
        </section>
    </>
      )}