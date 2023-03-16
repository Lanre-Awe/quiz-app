import { createSlice } from "@reduxjs/toolkit";

const getQuizCategory = () => {
  const data = localStorage.getItem("QUIZCATEGORY");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const getQuizCategories = () => {
  const data = localStorage.getItem("QUIZCATEGORIES");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: getQuizCategories(),
    category: getQuizCategory(),
  },
  reducers: {
    onAdd(state, action) {
      state.categories = action.payload;
    },
    onQuizCategory(state, action) {
      const quizCategory = state.categories.find(
        (item) => item.name === action.payload
      );
      state.category = quizCategory;
    },
  },
});

export const categoryAction = categorySlice.actions;

export default categorySlice;
