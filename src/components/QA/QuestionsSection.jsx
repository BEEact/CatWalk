/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
/* eslint-disable no-useless-return */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddQuestion from './AddQuestion.jsx';
import Questions from './Questions.jsx';
import Answers from './Answers.jsx';
import QuestionSearch from './QuestionSearch.jsx';
import { TrackerContext } from '../App.jsx';
import { ThemeContext } from '../themeContext.jsx';

export default function QuestionsSection({ productName }) {
  const [allQuestions, setAllQuestions] = useState('');
  const [questionsRendered, setQuestionsRendered] = useState(4);
  const [displayedQuestions, setDisplayedQuestions] = useState('');
  const [searchedQuestions, setSearchedQuestions] = useState([]);
  const [inputText, setInputText] = useState('');
  const [searchActivated, setSearchActivated] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const { id } = useParams();
  const clickTracker = useContext(TrackerContext);
  const { theme } = useContext(ThemeContext);

  const searchQuestions = (input) => {
    const searchQ = [];
    for (let i = 0; i < allQuestions.length; i++) {
      if (allQuestions[i].question_body.includes(input)) {
        searchQ.push(allQuestions[i]);
      }
    }
    if (searchQ.length > 0) {
      setSearchedQuestions(searchQ);
      setNoResults(false);
    } else {
      setSearchedQuestions([]);
      setNoResults(true);
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    if (e.target.value.length > 2) {
      searchQuestions(e.target.value);
      setSearchActivated(true);
    } else {
      setSearchedQuestions([]);
      setSearchActivated(false);
      setNoResults(false);
    }
  };

  const noQuestions = () => {
    if (!displayedQuestions) {
      setSearchActivated(true);
    }
  };

  const renderQuestions = (questionArray) => {
    const questions = [];
    clickTracker('More Questions', 'QA');
    for (let i = 0; i < questionsRendered; i++) {
      if (questionArray[i] === undefined) {
        return;
      }
      if (questionArray[i].answers !== {}) {
        questions.push(questionArray[i]);
      }
      setDisplayedQuestions(questions);
    }
    setQuestionsRendered(questionsRendered + 2);
  };

  useEffect(async () => {
    try {
      const res = await axios.get(`qa/questions?product_id=${id}&count=1000`);
      setAllQuestions(res.data.results);
      setDisplayedQuestions(res.data.results.slice(0, 2));
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <h3 className="qa-meta">Questions and Answers</h3>
      <div className="questions-area">
        <QuestionSearch inputText={inputText} handleInput={handleInputChange} />
      </div>
      <div className="questions-module">
        <div className="question-body">
          {noResults
            ? (
              <div className="no-results-box">
                <span className="no-results">No Matching Questions Found</span>
                <span className="helpful-questions">Users found the following questions helpful:</span>
              </div>
            )
            : null}
          {displayedQuestions && searchedQuestions.length < 1
            ? displayedQuestions.map((data) => (
              <Questions
                key={data.question_id}
                question={data}
                productName={productName}
              />
            ))
            : searchedQuestions.map((data) => (
              <Questions
                key={data.question_id.toString()}
                question={data}
                productName={productName}
              />
            ))}
          {searchActivated
            ? null
            : [displayedQuestions.length !== allQuestions.length
              ? <button key="jlkaf903ufjko9u" className={`${theme}-theme-secondary display-questions`} type="submit" onClick={() => renderQuestions(allQuestions)}> MORE QUESTIONS </button>
              : null,
            ]}

        </div>
        <AddQuestion productName={productName} />
      </div>
    </>
  );
}
