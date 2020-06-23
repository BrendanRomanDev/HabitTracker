import { HABITS } from '../shared/habits';
import * as ActionTypes from './ActionTypes';

//might need an action below, after state parameter
export const habits = (state = { habits: HABITS }) => {
	// switch (action.type) {
	// 	case ActionTypes.ADD_HABIT_ITEM:
	// 		return { ...state, habits: action.payload };
	// }
	return state;
};
