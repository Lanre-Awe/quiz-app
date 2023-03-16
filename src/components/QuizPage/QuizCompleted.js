import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./quiz.module.css";

const QuizCompleted = () => {
  const correct = useSelector((state) => state.quiz.correct);
  const quizQuestions = useSelector((state) => state.quiz.quizQuestions);

  const percentage = Math.floor((correct / quizQuestions.length) * 100);

  return (
    <div className={classes.completedCover}>
      <h2 className={classes.congrat}>Congratulations</h2>
      <div className={classes.complete}>
        You Have Completed The Quiz, Check Out Your Score
      </div>
      <div className={classes.progress}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textSize: "25px",
            textColor: "blue",
            pathColor: `rgb(0,0,255)`,
          })}
        />
      </div>
      <div className={classes.buttonContainer}>
        <Link to={`/categories/${quizQuestions[0].category.toLowerCase()}`}>
          <button>Take Another Quiz</button>
        </Link>
      </div>
      <div className={classes.history}>
        <h3>Quiz Questions And Answers</h3>
        <div>
          {quizQuestions.map((quiz) => {
            return (
              <div className={classes.corrections}>
                <p>
                  <strong>Question: </strong>
                  {quiz.question.replace(
                    /&quot;|&#039;|&rsquo;|&hellip;|&rdquo;|&ldquo;/g,
                    "'"
                  )}
                </p>
                <p className={classes.correctAnswer}>
                  <strong>answer: </strong>
                  <i>
                    {quiz.correct_answer.replace(
                      /&quot;|&#039;|&rsquo;|&hellip;|&rdquo;|&ldquo;/g,
                      "'"
                    )}
                  </i>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizCompleted;
