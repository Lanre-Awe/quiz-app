import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { categoryAction } from "../../store/categorySlice";
import { quizAction } from "../../store/QuizSlice";
import ErrorPage from "../UI/ErrorPage";
import Loader from "../UI/loader/loader";
import classes from "./frontpage.module.css";

const HomePage = () => {
  const [category, setCategory] = useState("General Knowledge");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const categorySelector = (event) => {
    setCategory(event.target.value);
  };
  const submitHandler = () => {
    dispatch(categoryAction.onQuizCategory(category));
  };
  useEffect(() => {
    const getCategory = async () => {
      setError(false);
      try {
        const response = await fetch("https://opentdb.com/api_category.php");
        if (!response.ok) {
          console.log("hehehe");
          setError(true);
          setLoading(false);
          return;
        }

        const data = await response.json();
        setCategories(data.trivia_categories);
        dispatch(categoryAction.onAdd(data.trivia_categories));
        localStorage.setItem(
          "QUIZCATEGORIES",
          JSON.stringify(data.trivia_categories)
        );
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    getCategory();
  }, []);
  useEffect(() => {
    dispatch(quizAction.onCompleted(false));
  }, []);
  return (
    <>
      {loading && <Loader />}
      {!error && !loading && (
        <div className={classes.homeContainer}>
          <div className={classes.title}> Welcome to Brain-Pick Trivia</div>
          <div className={classes.formContainer}>
            <form>
              <label htmlFor="category">
                {" "}
                Choose a category to get started
              </label>
              <select name="category" id="category" onChange={categorySelector}>
                {categories.map((item) => {
                  return (
                    <option value={item.name} key={item.id} id={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              <Link
                to={`/categories/${category.toLowerCase()}`}
                onClick={submitHandler}
              >
                <button> Get Started</button>
              </Link>
            </form>
          </div>
        </div>
      )}
      {error && !loading && <ErrorPage />}
    </>
  );
};

export default HomePage;
