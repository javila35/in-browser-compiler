import { combineReducers } from "redux";
import cellsReducer from "./cellsReducer";
import bundlesReducer from "./bundlesReducer";

const reducers = combineReducers({
  bundles: bundlesReducer,
  cells: cellsReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
