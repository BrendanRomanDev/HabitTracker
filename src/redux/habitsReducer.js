import { HABITS } from '../shared/habits';
import * as ActionTypes from './ActionTypes';

//might need an action below, after state parameter
export const habits = (state = { habits: HABITS }, action) => {
	switch (action.type) {
		case ActionTypes.ADD_HABIT_ITEM:
			return { ...state, habits: [ ...state.habits, action.payload ] };
		case ActionTypes.DEL_HABIT_ITEM:
			return {
				...state,
				habits : [ ...state.habits.filter((item) => item.id !== action.payload) ]
			};
	}
	return state;
};
