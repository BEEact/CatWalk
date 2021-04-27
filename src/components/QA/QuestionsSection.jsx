/* eslint-disable no-useless-return */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getData from '../../helperFunctions/getData';
import AddQuestion from './AddQuestion.jsx';
import Questions from './Questions.jsx';
import Answers from './Answers.jsx';
import QuestionSearch from './QuestionSearch.jsx';

export default function QuestionsSection() {
  const [allQuestions, setAllQuestions] = useState('');
  const [questionsRendered, setQuestionsRendered] = useState(4);
  const [displayedQuestions, setDisplayedQuestions] = useState('');
  const [searchedQuestions, setSearchedQuestions] = useState([]);
  const [inputText, setInputText] = useState('');
  const [searchActivated, setSearchActivated] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const { id } = useParams();
  const urlAddOn = `qa/questions?product_id=${id}&count=1000`;

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

  const renderQuestions = function (questionArray) {
    const questions = [];
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

  useEffect(() => {
    getData(urlAddOn, (err, res) => {
      if (err) {
        return;
      } else {
        setAllQuestions(res.data.results);
        setDisplayedQuestions(res.data.results.slice(0, 2));
      }
    });
  }, []);

  return (
    <>
      <h3>Questions and Answers</h3>
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
            ? displayedQuestions.map((data) => <Questions key={data.toString()} question={data} />)
            : searchedQuestions.map((data) => <Questions key={data.toString()} question={data} />)}
          {searchActivated
            ? null
            : <button className="display-questions" type="submit" onClick={() => renderQuestions(allQuestions)}> MORE QUESTIONS </button>}

        </div>
        <AddQuestion />
      </div>
    </>
  );
}
