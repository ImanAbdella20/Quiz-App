import { MouseEvent, useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import { questions } from "../assets/Data";
import './Quiz.css';

const Quiz = () => {
  const { level } = useParams<{ level: string }>();
  const levelQuestions = questions.find(q => q.level === parseInt(level!))?.questions || [];
  const [index, setIndex] = useState(0);
  const [Question, setQuestion] = useState(levelQuestions[index]);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctOptionIndex, setCorrectOptionIndex] = useState<number | null>(null);
  const [isOptionClicked, setIsOptionClicked] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const shuffledOptions = shuffleOptions([
      ...Question.incorrectanswer,
      Question.correctanswer
    ]);
    setOptions(shuffledOptions);
    setSelectedOption(null);
    setCorrectOptionIndex(shuffledOptions.indexOf(Question.correctanswer));
    setIsOptionClicked(false);
    setTimeLeft(30);
    setFeedbackMessage(null);
  }, [Question]);

  useEffect(() => {
    if (timeLeft === 0) {
      nextQuestion();
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [timeLeft]);

  const shuffleOptions = (options: string[]) => {
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  };

  const checkAnswer = (e: MouseEvent<HTMLButtonElement>) => {
    if (!isOptionClicked) {
      const selected = e.currentTarget.textContent;
      setSelectedOption(selected);
      setIsOptionClicked(true);
      if (selected === Question.correctanswer) {
        setScore(score + 1);
        setFeedbackMessage("Correct!");
      } else {
        setFeedbackMessage("Incorrect!");
      }
      clearInterval(timerRef.current!);
    }
  };

  const nextQuestion = () => {
    const newIndex = index + 1;
    if (newIndex < levelQuestions.length) {
      setIndex(newIndex);
      setQuestion(levelQuestions[newIndex]);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const previousQuestion = () => {
    const newIndex = index - 1;
    if (newIndex >= 0) {
      setIndex(newIndex);
      setQuestion(levelQuestions[newIndex]);
    }
  };

  return (
    <div className="container">
      <h4>Quiz App</h4>
      <hr />
      {isQuizCompleted ? (
        <div className="result">
          <h2>Quiz Completed!</h2>
          <p>Your score is: {score} out of {levelQuestions.length}</p>
        </div>
      ) : (
        <>
          <p>{index + 1}. {Question.question}</p>
          <p>Time left: {timeLeft} seconds</p>
          <div className="options">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={(e) => checkAnswer(e)}
                className={
                  selectedOption === option
                    ? option === Question.correctanswer
                      ? "correct"
                      : "incorrect"
                    : selectedOption && idx === correctOptionIndex
                    ? "correct"
                    : ""
                }
                disabled={isOptionClicked}
              >
                {option}
              </button>
            ))}
          </div>
          {feedbackMessage && <p>{feedbackMessage}</p>}
          <button onClick={previousQuestion} disabled={index === 0}>Previous</button>
          <button onClick={nextQuestion} disabled={index === levelQuestions.length - 1}>Next</button>
        </>
      )}
    </div>
  )
}
  export default Quiz;