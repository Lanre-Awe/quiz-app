import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { quizAction } from "../../store/QuizSlice";
import ErrorPage from "../UI/ErrorPage";
import Loader from "../UI/loader/loader";
import NotFound from "../UI/NotFound";
import classes from "./category.module.css";

const Category = () => {
  const quizCategory = useSelector((state) => state.category.category);
  const quizCategories = useSelector((state) => state.category.categories);
  const quizQuestions = useSelector((state) => state.quiz.quizQuestions);
  const history = useHistory();
  const dispatch = useDispatch();
  const { category } = useParams();

  const [difficulty, setDifficulty] = useState("easy");
  const [amount, setAmount] = useState(10);
  const [isCategory, setIsCategory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const difficultyOption = (event) => {
    setDifficulty(event.target.value);
  };

  const amountOption = (event) => {
    setAmount(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${amount}&category=${
          quizCategory.id
        }&difficulty=${difficulty.toLowerCase()}&type=multiple`
      );
      const data = await response.json();
      if (data.response_code === 0) {
        dispatch(quizAction.onLoad(data.results));
        dispatch(quizAction.onFirstQuestion(data.results[0]));
        history.push(`/categories/${quizCategory.name.toLowerCase()}/quiz`);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    dispatch(quizAction.onCompleted(false));
    setError(false);
    const categoryMatch = quizCategories.find(
      (item) => item.name.toLowerCase() === category
    );
    if (categoryMatch) {
      setIsCategory(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [category]);
  useEffect(() => {
    localStorage.setItem("QUIZCATEGORY", JSON.stringify(quizCategory));
  }, [quizCategory]);
  useEffect(() => {
    localStorage.setItem("QUIZQUESTIONS", JSON.stringify(quizQuestions));
  }, [quizQuestions]);

  return (
    <>
      {loading && <Loader />}
      {isCategory && !loading && !error && (
        <div className={classes.container}>
          <h2>{quizCategory.name}</h2>
          <div className={classes.formContainer}>
            <form onSubmit={onSubmit}>
              <div className={classes.difficulty}>
                <label htmlFor="difficulty">Select Difficulty:</label>
                <select
                  name="difficulty"
                  id="difficulty"
                  onChange={difficultyOption}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div className={classes.number}>
                <label htmlFor="amount">Select Number of Questions:</label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  min="5"
                  max="20"
                  step="1"
                  defaultValue="10"
                  onChange={amountOption}
                />
              </div>
              <div className={classes.buttonContainer}>
                <button type="submit">Start Quiz!</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {!isCategory && !loading && !error && <NotFound />}
      {error && !loading && <ErrorPage />}
    </>
  );
};

export default Category;
