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
		groupId        : habitItem.groupId,
		id             : habitItem.id,
		habitName      : habitItem.habitName,
		habitHrs       : +habitItem.habitHrs,
		habitMins      : +habitItem.habitMins,
		habitTimeTotal : `${habitItem.habitHrs} hrs, ${habitItem.habitMins} mins`
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

export const addTimeLog = (timeData) => ({
	type    : ActionTypes.ADD_TIMELOG,
	payload : timeData
});
export const postTimeLog = (timeData) => (dispatch) => {
	const newTimeLog = {
		id        : timeData.id,
		habitId   : timeData.habitId,
		groupId   : timeData.groupId,
		hrs       : timeData.hrs,
		mins      : timeData.mins,
		timeTotal : timeData.timeTotal
	};
	return dispatch(addTimeLog(newTimeLog));
};
