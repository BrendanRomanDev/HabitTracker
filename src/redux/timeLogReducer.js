import { TIMELOGS } from '../shared/timeLogs';
import * as ActionTypes from './ActionTypes';

export const timeLogs = (state = { timeLogs: TIMELOGS }, action) => {
	switch (action.type) {
		case ActionTypes.ADD_TIMELOG:
			return { ...state, timeLogs: [ ...state.timeLogs, action.payload ] };
	}
	return state;
};
