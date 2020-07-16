import { HABITGROUPS } from '../shared/habitGroups';
import * as ActionTypes from './ActionTypes';

export const habitGroups = (
	state = {
		habitGroups : HABITGROUPS
	},
	action
) => {
	switch (action.type) {
		// case ActionTypes.DATA_LOADING:
		// 	return { ...state, isLoading: true, errMess: null, habitGroups: [] };
		// case ActionTypes.DATA_FAILED:
		// 	return { ...state, isLoading: false, errMess: action.payload };
		case ActionTypes.ADD_HABIT_GROUP:
			return {
				...state,
				// isLoading   : false,
				// errMess     : null,
				habitGroups : [ ...state.habitGroups.concat(action.payload) ]
			};
		case ActionTypes.DEL_HABIT_GROUP:
			return {
				...state,
				// isLoading   : false,
				// errMess     : null,
				habitGroups : [ ...state.habitGroups.filter((item) => item.id !== action.payload) ]
			};
		default:
			return state;
	}
};
