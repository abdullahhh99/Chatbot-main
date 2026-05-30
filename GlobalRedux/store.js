"use client";
import { configureStore } from "@reduxjs/toolkit";
import PromptSlice from "@/GlobalRedux/ReducerFeatures/PromptSlice";
import ModelSlice from "./ReducerFeatures/ModelSlice";

export const store = configureStore({
  reducer: {
    prompt: PromptSlice,
    modelName: ModelSlice,
  },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
