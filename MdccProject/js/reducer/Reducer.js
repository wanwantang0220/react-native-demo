import { combineReducers } from 'redux'
import schedule from './Schedule'
import data from './Data'

export default combineReducers({
    schedule,
    data
})
