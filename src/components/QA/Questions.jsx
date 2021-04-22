/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Answers from './Answers.jsx';
import Helpful from './Helpful.jsx';

function Questions({ question }) {
  const [allAnswers, setAllAnswers] = useState('');
  const [displayedAnswers, setDisplayedAnswers] = useState('');
  const [answerNumberDisplayed, setAnswerNumberDisplayed] = useState(2);
  const [allAnswersDisplayed, setAllAnswersDisplayed] = useState(false);



  const getAnswers = function (questionObject) {
    const answerKeys = Object.values(questionObject.answers);
    const sortedAnswers = answerKeys.sort((a, b) => b.helpfulness - a.helpfulness);
    if (sortedAnswers.includes('Seller')) {
      const currentIndex = sortedAnswers.indexOf('Seller');
      sortedAnswers.splice(currentIndex, 1);
      sortedAnswers.unshift('Seller');
    }

    setAllAnswers(sortedAnswers);
  };

  const displayAllAnswers = function () {
    setAnswerNumberDisplayed(allAnswers.length);
    setDisplayedAnswers(allAnswers);
    setAllAnswersDisplayed(true);
  };

  const displayDefaultAnswers = function () {
    setAnswerNumberDisplayed(2);
    setDisplayedAnswers(allAnswers.slice(0, 2));
    setAllAnswersDisplayed(false);
  };

  useEffect(() => {
    getAnswers(question);
    setDisplayedAnswers(allAnswers.slice(0, answerNumberDisplayed));
  });


  return (
    <span>
      <h4>
        Q: {question.question_body}
      </h4>
      <p>
        Helpful?
        <Helpful questionHelpfulness={question.helpfulness} />
      </p>
      {displayedAnswers
      && displayedAnswers.map((data) => <Answers key={data.toString()} answer={data} />)}
      <br />
      {displayedAnswers && displayedAnswers < allAnswers && (
      <button type="submit" onClick={() => displayAllAnswers()}> MORE ANSWERS </button>)}
      {displayedAnswers && allAnswersDisplayed && (
      <button type="submit" onClick={() => displayDefaultAnswers()}> COLLAPSE ANSWERS </button>)}
      <br />
    </span>
  );
}

export default Questions;
