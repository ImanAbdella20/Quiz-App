import { MouseEvent, useState, useEffect, useRef } from "react";
import { questions } from "../assets/Data";
import './Quiz.css';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [Question, setQuestion] = useState(questions[index]);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctOptionIndex, setCorrectOptionIndex] = useState<number | null>(null);
  const [isOptionClicked, setIsOptionClicked] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null); // Add state for feedback message
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const shuffledOptions = shuffleOptions([
      ...Question.incorrectanswer,
      Question.correctanswer
    ]);
    setOptions(shuffledOptions);
    setSelectedOption(null); // Reset selected option for new question
    setCorrectOptionIndex(shuffledOptions.indexOf(Question.correctanswer)); // Track correct option index
    setIsOptionClicked(false); // Reset option clicked state for new question
    setTimeLeft(30); // Reset timer for new question
    setFeedbackMessage(null); // Reset feedback message for new question
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
        setFeedbackMessage("Correct!"); // Set feedback message for correct answer
      } else {
        setFeedbackMessage("Incorrect!"); // Set feedback message for incorrect answer
      }
      clearInterval(timerRef.current!); // Stop the timer when an option is clicked
    }
  };

  const nextQuestion = () => {
    const newIndex = index + 1;
    if (newIndex < questions.length) {
      setIndex(newIndex);
      setQuestion(questions[newIndex]);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const previousQuestion = () => {
    const newIndex = index - 1;
    if (newIndex >= 0) {
      setIndex(newIndex);
      setQuestion(questions[newIndex]);
    }
  };

  return (
    <div className="container">
      <h4>Quiz App</h4>
      <hr />
      {isQuizCompleted ? (
        <div className="result">
          <h2>Quiz Completed!</h2>
          <p>Your score is: {score} out of {questions.length}</p>
        </div>
      ) : (
        <>
          <p>{index + 1}. {Question.question}</p>
          <p>Time left: {timeLeft} seconds</p> {/* Display the timer */}
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
                disabled={isOptionClicked} // Disable button if an option is clicked
              >
                {option}
              </button>
            ))}
          </div>
          {feedbackMessage && <p className="feedback">{feedbackMessage}</p>} {/* Display feedback message */}
          <div className="navigation-buttons">
            {index > 0 && (
              <button type="button" onClick={previousQuestion}>PREVIOUS</button>
            )}
            <button type="button" onClick={nextQuestion}>NEXT</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
