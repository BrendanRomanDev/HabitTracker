import { HABITS } from '../shared/habits';
import * as ActionTypes from './ActionTypes';

//might need an action below, after state parameter
export const habits = (
	state = {
		isLoading : true,
		errMess   : null,
		habits    : HABITS
	},
	action
) => {
	switch (action.type) {
		case ActionTypes.DATA_LOADING:
			return { ...state, isLoading: true, errMess: null, habits: [] };
		case ActionTypes.DATA_FAILED:
			return { ...state, isLoading: false, errMess: action.payload };
		case ActionTypes.ADD_HABIT_ITEM:
			return { ...state, isLoading: false, errMess: null, habits: action.payload };
		case ActionTypes.DEL_HABIT_ITEM:
			return {
				...state,
				isLoading : false,
				errMess   : null,
				habits    : [ ...state.habits.filter((item) => item.id !== action.payload) ]
			};
		default:
			return state;
	}
};
