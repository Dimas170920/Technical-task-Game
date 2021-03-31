import {applyMiddleware, combineReducers, createStore} from "redux"
import thunkMiddleware from "redux-thunk";
import gameReducer from "./game-reducer";


let reducers = combineReducers({
    gamePage: gameReducer,
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))
window.store = store;

export default store;