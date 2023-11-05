import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import loginReducer from "../reducers/loginReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    login: loginReducer,
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
