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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4">
      <button className="mb-4 px-4 py-2 bg-white text-indigo-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
        Back to Quiz
      </button>
      <h4 className="text-3xl font-bold mb-4">Quiz App</h4>
      <hr className="w-full mb-4 border-gray-300" />
      {isQuizCompleted ? (
        <div className="result text-center">
          <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
          <p className="text-lg">Your score is: {score} out of {levelQuestions.length}</p>
        </div>
      ) : (
        <>
          <p className="text-lg mb-2">{index + 1}. {Question.question}</p>
          <p className="text-lg mb-4">Time left: {timeLeft} seconds</p>
          <div className="options grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={(e) => checkAnswer(e)}
                className={`px-4 py-2 rounded-lg shadow-md transition duration-300 ${
                  selectedOption === option
                    ? option === Question.correctanswer
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : selectedOption && idx === correctOptionIndex
                    ? "bg-green-500 text-white"
                    : "bg-white text-indigo-500 hover:bg-gray-100"
                }`}
                disabled={isOptionClicked}
              >
                {option}
              </button>
            ))}
          </div>
          {feedbackMessage && <p className="text-lg mb-4">{feedbackMessage}</p>}
          <div className="flex justify-between w-full">
            <button
              onClick={previousQuestion}
              disabled={index === 0}
              className="px-4 py-2 bg-white text-indigo-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={nextQuestion}
              disabled={index === levelQuestions.length - 1}
              className="px-4 py-2 bg-white text-indigo-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;