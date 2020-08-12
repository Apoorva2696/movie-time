import { combineReducers } from 'redux'
import watchList from './watchList'
import userContentList from './userContentList'

export default combineReducers({
    watchList,
    userContentList
})