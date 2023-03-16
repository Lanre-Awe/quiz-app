import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { quizAction } from "../../store/QuizSlice";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import classes from "./quiz.module.css";

const QuizPage = () => {
  const quizQuestions = useSelector((state) => state.quiz.quizQuestions);
  const firstQuestion = useSelector((state) => state.quiz.firstQuestion);
  const answers = useSelector((state) => state.quiz.answers);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selected, setSelected] = useState(false);
  const [completed, setCompleted] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [index, setIndex] = useState(0);

  const nextQuestion = (event) => {
    if (completed) {
      dispatch(quizAction.onCompleted(true));
      history.push(`/categories/${firstQuestion.category}/quiz-completed`);
    }
    dispatch(quizAction.onSubmit(selected));
    setIndex((prev) => prev + 1);
    setSelected(false);
  };

  const selectedAnswer = (answer) => {
    setSelected(answer);
  };

  useEffect(() => {
    console.log(firstQuestion);
    if (index === quizQuestions.length - 1) {
      dispatch(quizAction.onFirstQuestion(quizQuestions[index]));
      setCompleted(true);
    } else {
      dispatch(quizAction.onFirstQuestion(quizQuestions[index]));
    }
  }, [index]);

  useEffect(() => {
    dispatch(quizAction.onAnswer(firstQuestion.correct_answer));
    localStorage.setItem("QUESTION", JSON.stringify(firstQuestion));
  }, [firstQuestion]);
  useEffect(() => {
    const shuffled = [...answers].sort(() => Math.random() - 0.5);
    setShuffledAnswers(shuffled);
  }, [answers]);
  const percentage = Math.floor(((index + 1) / quizQuestions.length) * 100);
  return (
    <div>
      <div className={classes.heading}>
        <h3>{firstQuestion.category}</h3>
        <div>
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              textSize: "25px",
              textColor: "blue",
              pathColor: `rgba(0,0,255, ${percentage / 100})`,
            })}
          />
        </div>
      </div>

      <div className={classes.question}>
        {firstQuestion.question.replace(
          /&quot;|&#039;|&rsquo;|&hellip;|&rdquo;|&ldquo;/g,
          "'"
        )}
      </div>
      <span>
        <i>select one answer </i>
      </span>
      <div className={classes.answers}>
        {shuffledAnswers.map((answer) => {
          return (
            <div
              className={
                selected === answer
                  ? `${classes.option} ${classes.selected}`
                  : classes.option
              }
              key={answer}
              onClick={() => {
                selectedAnswer(answer);
              }}
            >
              {answer.replace(
                /&quot;|&#039;|&rsquo;|&hellip;|&rdquo;|&ldquo;/g,
                "'"
              )}
            </div>
          );
        })}
      </div>
      <div className={classes.next}>
        <button disabled={!selected ? true : false} onClick={nextQuestion}>
          {!completed ? "Next" : "Finish"}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
