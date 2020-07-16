//----------------ACTION Types End---------------------
import * as ActionTypes from './ActionTypes';
import axios from 'axios';
import { baseUrl } from '../shared/baseUrl';
import { HABITGROUPS } from '../shared/habitGroups';
import { HABITS } from '../shared/habits';
import { TIMELOG } from '../shared/timeLogs';

//----------------ACTION CREATOR START---------------------

//GENERAL USE

export const fetchItems = (itemsToFetch) => (dispatch) => {
	dispatch(dataLoading());
	return axios
		.get(`${baseUrl}${itemsToFetch}`)
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.log(error.response.data);
			dispatch(dataFailed(error.response.data));
		});
};

export const dataLoading = () => ({
	type : ActionTypes.DATA_LOADING
});

export const dataFailed = (errMess) => ({
	type    : ActionTypes.DATA_FAILED,
	payload : errMess
});

//////////////////////Habit GROUP/////////////////////////

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
	return axios
		.post(baseUrl + 'habitGroups', newHabitGroup)
		.then((res) => {
			dispatch(addHabitGroup(res.data));
		})
		.catch((error) => console.log(error));
};

export const delHabitGroup = (habitGroup) => ({
	type    : ActionTypes.DEL_HABIT_GROUP,
	payload : habitGroup
});

export const removeHabitGroup = ({ id }) => (dispatch) => {
	return dispatch(delHabitGroup(id));
};

//////////////////////Habit Item/////////////////////////

export const addHabitItem = (habit) => ({
	type    : ActionTypes.ADD_HABIT_ITEM,
	payload : habit
});

export const postHabitItem = (habitItem) => (dispatch) => {
	const newHabit = {
		groupId        : habitItem.groupId,
		id             : habitItem.id,
		habitName      : habitItem.habitName,
		habitTimeTotal : `${habitItem.habitHrs} hrs, ${habitItem.habitMins} mins`
	};
	return axios
		.post(baseUrl + 'habits', newHabit)
		.then((res) => {
			dispatch(addHabitItem(res.data));
		})
		.catch((error) => console.log(error));
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
	newTimeLog.date = new Date().toISOString();
	return axios
		.post(baseUrl + 'timeLogs', newTimeLog)
		.then((res) => {
			dispatch(addTimeLog(res.data));
		})
		.catch((error) => console.log(error));
};
