import { HABITGROUPS } from '../shared/habitGroups';
import * as ActionTypes from './ActionTypes';

//might need an action below, after state parameter
export const habitGroups = (state = { habitGroups: HABITGROUPS }, action) => {
	switch (action.type) {
		case ActionTypes.ADD_HABIT_GROUP:
			return { ...state, habitGroups: [ ...state.habitGroups, action.payload ] };
		case ActionTypes.DEL_HABIT_GROUP:
			return {
				...state,
				habitGroups : [ ...state.habitGroups.filter((item) => item.id !== action.payload) ]
			};

		default:
			return state;
	}
};
