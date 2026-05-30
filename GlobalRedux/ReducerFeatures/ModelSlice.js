import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  model: "gpt-3.5-turbo",
  api: "zukijourney",
};

export const ModelSlice = createSlice({
  name: "modelName",
  initialState,
  reducers: {
    setModel: (state, action) => {
      state.model = action.payload.model.toLowerCase();
    },
    setApi: (state, action) => {
      state.api = action.payload.api;
    },
  },
});

export const { setModel, setApi } = ModelSlice.actions;
export default ModelSlice.reducer;
