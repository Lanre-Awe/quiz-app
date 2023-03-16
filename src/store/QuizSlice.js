import { createSlice } from "@reduxjs/toolkit";
const getQuestion = () => {
  const data = localStorage.getItem("QUESTION");
  if (data) {
    return JSON.parse(data);
  } else {
    return "";
  }
};
const getQuizQuestions = () => {
  const data = localStorage.getItem("QUIZQUESTIONS");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};
const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quizQuestions: getQuizQuestions(),
    firstQuestion: getQuestion(),
    answers: [],
    correct: 0,
    incorrect: 0,
    completed: false,
  },
  reducers: {
    onLoad(state, action) {
      state.quizQuestions = action.payload;
    },
    onFirstQuestion(state, action) {
      state.firstQuestion = action.payload;
    },
    onAnswer(state, action) {
      state.answers = JSON.parse(
        JSON.stringify(state.firstQuestion.incorrect_answers)
      );
      state.answers.push(action.payload);
    },
    onSubmit(state, action) {
      if (state.firstQuestion.correct_answer === action.payload) {
        state.correct++;
      } else {
        state.incorrect++;
      }
    },
    onCompleted(state, action) {
      state.completed = action.payload;
    },
  },
});

export const quizAction = quizSlice.actions;
export default quizSlice;
