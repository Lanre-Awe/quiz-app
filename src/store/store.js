import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";
import quizSlice from "./QuizSlice";

const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
    quiz: quizSlice.reducer,
  },
});

export default store;
