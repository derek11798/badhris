import { combineReducers } from "redux"
import commonState from "./commonState"

const reducer = combineReducers({
    commonState : commonState
})

export default reducer