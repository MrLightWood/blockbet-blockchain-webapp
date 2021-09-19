import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { fetch } from "./fetch.reducer";

const rootReducer = combineReducers({
  authentication,
  fetch,
});

export default rootReducer;
