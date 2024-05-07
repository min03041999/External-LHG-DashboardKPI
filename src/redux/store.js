import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./feature/production";
import finishgoodReducer from "./feature/finishgood";

const reducer = {
  product: productReducer,
  finishgood: finishgoodReducer,
};

const store = configureStore({
  reducer: reducer,

  devTools: true,
});

export default store;
