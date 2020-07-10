//----------------ACTION Types End---------------------
import * as ActionTypes from './ActionTypes';
//----------------ACTION CREATOR START---------------------
//Habit Group//
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

export const delHabitGroup = (habitGroup) => ({
	type    : ActionTypes.DEL_HABIT_GROUP,
	payload : habitGroup
});

export const removeHabitGroup = ({ id }) => (dispatch) => {
	return dispatch(delHabitGroup(id));
};

///Habit Item
export const addHabitItem = (habit) => ({
	type    : ActionTypes.ADD_HABIT_ITEM,
	payload : habit
});

export const postHabitItem = (habitItem) => (dispatch) => {
	const newHabit = {
		groupId   : habitItem.groupId,
		id        : habitItem.id,
		habitName : habitItem.habitName
	};
	return dispatch(addHabitItem(newHabit));
};

export const delHabitItem = (habit) => ({
	type    : ActionTypes.DEL_HABIT_ITEM,
	payload : habit
});

export const removeHabitItem = ({ id }) => (dispatch) => {
	return dispatch(delHabitItem(id));
};
