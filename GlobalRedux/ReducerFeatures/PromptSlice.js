"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messageArray: [],
  messageObj: {
    id: "",
    message: "",
    isUserPrompt: true,
    mood: "normal",
  },
  arrayId: null,
  dbUpdate: 0,
};

export const PromptSlice = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    setPrompt: (state, action) => {
      state.messageObj = action.payload.messageObj;
      state.messageArray.push(action.payload.messageArray);
    },
    resetMsg: (state) => {
      state.messageObj.message = "";
    },
    setStreaminArray: (state, action) => {
      state.messageArray[state.messageArray.length - 1].message +=
        action.payload.text;
    },
    setArray: (state, action) => {
      state.messageArray = action.payload.map((el) => el);
    },
    setArrayId: (state, action) => {
      state.arrayId = action.payload.id;
    },
    pushinArray: (state, action) => {
      state.messageArray.push(action.payload);
    },
    setdbUpdate: (state) => {
      state.dbUpdate = state.dbUpdate + 1;
    },
  },
});

export const {
  setPrompt,
  resetMsg,
  pushinArray,
  setArray,
  setStreaminArray,
  setArrayId,
  setdbUpdate,
} = PromptSlice.actions;

export default PromptSlice.reducer;
