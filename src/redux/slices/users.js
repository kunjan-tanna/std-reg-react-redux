import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   stdDataList: [],
};

const slice = createSlice({
   name: "common",
   initialState,
   reducers: {
      addStudentList(state, action) {
         state.stdDataList = action.payload;
      },
   },
});

// Reducer
export default slice.reducer;

// Actions
export const { addStudentList } = slice.actions;
