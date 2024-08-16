import { MouseEvent, useState, useEffect } from "react";
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

  useEffect(() => {
    const shuffledOptions = shuffleOptions([
      ...Question.incorrectanswer,
      Question.correctanswer
    ]);
    setOptions(shuffledOptions);
    setSelectedOption(null); // Reset selected option for new question
    setCorrectOptionIndex(shuffledOptions.indexOf(Question.correctanswer)); // Track correct option index
    setIsOptionClicked(false); // Reset option clicked state for new question
  }, [Question]);

  const shuffleOptions = (options: string[]) => {
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  };

  const checkAnswer = (e: MouseEvent<HTMLButtonElement>) => {
    if (!isOptionClicked) {
      setSelectedOption(e.currentTarget.textContent);
      setIsOptionClicked(true);
      if (e.currentTarget.textContent === Question.correctanswer) {
        setScore(score + 1);
      }
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
