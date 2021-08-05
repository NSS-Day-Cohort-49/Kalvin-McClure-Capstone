import React, { useState, useRef } from "react";
import "./Questions.css"
import { Link } from "react-router-dom"
import cn from "classnames";

export const QuestionCard = ({ question }) => (
    <section className="question">
      <div className="borderQuestion">
        <h3 className="question__title">
          <Link to={`/questions/detail/${question.id}`}>
            { question.questionTitle }
          </Link>
        </h3>
        <div className="question__userId">{ question.user.name }</div>
        <div className="question__message">{ question.message }</div>
        </div>
    </section>
)