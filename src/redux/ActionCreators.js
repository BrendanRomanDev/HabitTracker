import * as ActionTypes from './ActionTypes';

export const addHabitGroup = (habitGroup) => ({
	type    : ActionTypes.ADD_HABIT_GROUP,
	payload : habitGroup
});

export const postHabitGroup = (habitGroup) => (dispatch) => {
	const newHabitGroup = {
		id               : habitGroup.id,
		groupName        : habitGroup.groupName,
		groupLevel       : habitGroup.groupLevel,
		groupDescription : habitGroup.groupDescription
	};
	return dispatch(addHabitGroup(newHabitGroup));
};
