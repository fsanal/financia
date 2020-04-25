import { combineReducers } from 'redux';

import headlineReducer from './Headline_Reducer'

export default combineReducers({
    headlines: headlineReducer
});
