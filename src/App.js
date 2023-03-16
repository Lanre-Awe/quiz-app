import { Redirect, Route, Switch } from "react-router-dom";
import Category from "./components/CategoryPage/Category";
import Footer from "./components/frontPage/Footer";
import Header from "./components/frontPage/Header";
import HomePage from "./components/frontPage/HomePage";
import classes from "./components/frontPage/frontpage.module.css";
import SideMenu from "./components/frontPage/SideMenu";
import QuizPage from "./components/QuizPage/QuizPage";
import QuizCompleted from "./components/QuizPage/QuizCompleted";
import { useSelector } from "react-redux";
import NotFound from "./components/UI/NotFound";

function App() {
  const completed = useSelector((state) => state.quiz.completed);
  return (
    <div className={classes.frontpage}>
      <header>
        <Header />
      </header>
      <aside>
        <SideMenu />
      </aside>
      <main>
        <Switch>
          <Route path="/home" exact>
            <HomePage />
          </Route>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/categories/:category" exact>
            <Category />
          </Route>
          <Route path="/categories/:category/quiz">
            <QuizPage />
          </Route>
          <Route path="/categories/:category/quiz-completed">
            {completed ? <QuizCompleted /> : <NotFound />}
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
