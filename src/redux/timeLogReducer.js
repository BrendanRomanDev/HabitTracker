import { TIMELOGS } from '../shared/timeLogs';
import * as ActionTypes from './ActionTypes';

export const timeLogs = (
	state = {
		// isLoading : true,
		// errMess   : null,
		timeLogs : TIMELOGS
	},
	action
) => {
	switch (action.type) {
		// case ActionTypes.DATA_LOADING:
		// 	return { ...state, isLoading: true, errMess: null, timeLogs: [] };
		// case ActionTypes.DATA_FAILED:
		// 	return { ...state, isLoading: false, errMess: action.payload };
		case ActionTypes.ADD_TIMELOG:
			return {
				...state,
				isLoading : false,
				errMess   : null,
				timeLogs  : [ ...state.timeLogs.concat(action.payload) ]
			};
		default:
			return state;
	}
};
