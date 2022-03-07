import { combineReducers } from "redux";
// slices
// import designReducer from './slices/design';
import projectReducer from "./slices/project";

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
  project: projectReducer,
});

export { rootReducer };
