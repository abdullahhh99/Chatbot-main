"use client";
import { Provider } from "react-redux";
import { store } from "@/GlobalRedux/store";

export default function GlobalProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
