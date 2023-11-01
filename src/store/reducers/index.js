import { combineReducers } from 'redux'
import dogReducer from "./dog.reducer"
import authReducer from "./auth.reducer"

import locationsReducer from './location.reducer'
import settingsReducer from './settings.reducer'
import filterReducer from './filter.reducer'

export default combineReducers({
    // Add reducers here
    auth: authReducer,
    dog: dogReducer,
    location: locationsReducer,
    settings: settingsReducer,
    filter: filterReducer,
})