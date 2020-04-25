import {
    RETRIEVE_HEADLINES,
    SEARCH_HEADLINES
} from '../actions/types'

import _ from 'lodash';


export default (state = {}, action) => {
    switch (action.type) {
        case RETRIEVE_HEADLINES:
            return { ...state, ..._.keyBy(action.payload.data, 'id')};
        case SEARCH_HEADLINES:
            return { ..._.keyBy(action.payload.data, 'id')};
        default: 
            return state;
    }
}
