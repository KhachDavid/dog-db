import { combineReducers } from 'redux'
import dogReducer from "./dog.reducer"
import authReducer from "./auth.reducer"
import languageReducer from "./language.reducer"

export default combineReducers({
    // Add reducers here
    dog: dogReducer,
    auth: authReducer,
    language: languageReducer,
})