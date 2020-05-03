import {
    GET_STATS
} from './types'

import api from '../apis/api';

export const highest_close = (formValues) => async (dispatch) => {
    console.log(formValues)
    const response = await api.post('/highest_close', formValues);
    dispatch({ type: GET_STATS, payload: response.data });
}