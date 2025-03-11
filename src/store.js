import { createStore } from "redux";
import { counterReducer } from "./redux";

export const store = createStore(counterReducer);
