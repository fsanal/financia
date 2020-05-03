import {
    RETRIEVE_HEADLINES,
    SEARCH_HEADLINES
} from './types'
 
import api from '../apis/api';


export const retrieveHeadlines = (formValues) => async (dispatch) => {
    const response = await api.post('/scan_headline');
    dispatch({ type: RETRIEVE_HEADLINES, payload: response.data });
}

export const searchHeadlines = (formValues) => async (dispatch) => {
    console.log(formValues)
    const response = await api.post('/search_headlines', formValues);
    dispatch({ type: SEARCH_HEADLINES, payload: response.data });
}