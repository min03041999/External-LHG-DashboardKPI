import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./feature/production";

const reducer = {
  product: productReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
