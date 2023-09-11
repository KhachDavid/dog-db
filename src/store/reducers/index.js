import { combineReducers } from 'redux'
import dogReducer from "./dog.reducer"

export default combineReducers({
    // Add reducers here
    dog: dogReducer,
})