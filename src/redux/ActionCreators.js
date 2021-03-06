//----------------ACTION Types End---------------------
import * as ActionTypes from './ActionTypes';
import axios from 'axios';
import { baseUrl } from '../shared/baseUrl';
import { HabitGroupSettings } from '../components/HabitGroupComponent';
// import { HABITGROUPS } from '../shared/habitGroups';
// import { HABITS } from '../shared/habits';
// import { TIMELOG } from '../shared/timeLogs';

//----------------ACTION CREATOR START---------------------

//GENERAL USE

export const dataLoading = () => ({
	type : ActionTypes.DATA_LOADING
});

export const dataFailed = (errMess) => ({
	type    : ActionTypes.DATA_FAILED,
	payload : errMess
});

//////////////////////Habit GROUP/////////////////////////

export const fetchGroups = () => (dispatch) => {
	dispatch(dataLoading());
	return axios
		.get(`${baseUrl}${'habitGroups'}`)
		.then((res) => {
			dispatch(addHabitGroups(res.data));
		})
		.catch((error) => {
			console.log(error);
			dispatch(dataFailed(error.response));
		});
};

export const addHabitGroups = (habitGroups) => ({
	type    : ActionTypes.ADD_HABIT_GROUPS,
	payload : habitGroups
});

export const addHabitGroup = (habitGroup) => ({
	type    : ActionTypes.ADD_HABIT_GROUP,
	payload : habitGroup
});

export const postHabitGroup = (habitGroup) => (dispatch) => {
	return axios
		.post(baseUrl + 'habitGroups', habitGroup)
		.then((res) => {
			dispatch(addHabitGroup(res.data));
		})
		.catch((error) => console.log(error.response));
};

export const delHabitGroup = (habitGroup) => ({
	type    : ActionTypes.DEL_HABIT_GROUP,
	payload : habitGroup
});

export const removeHabitGroup = ({ id }) => (dispatch) => {
	return axios({
		method  : 'DELETE',
		url     : `${baseUrl}habitGroups/${id}`,
		headers : { 'Content-Type': 'application/json' }
	})
		.then((res) => {
			dispatch(delHabitGroup(id));
			dispatch(delGroupHabitItems(id));
			dispatch(delGroupTimeLogs(id));
		})
		.catch((error) => console.log(error.response));
};

//DELETE MULTIPLE HABIT ITEMS (EX: IN ONE HABIT GROUP)
export const delGroupHabitItems = (groupId) => ({
	type    : ActionTypes.DEL_HABIT_ITEMS,
	payload : groupId
});

//DELETE MULTIPLE TimeLogs (EX: IN ONE HABIT GROUP)
export const delGroupTimeLogs = (groupId) => ({
	type    : ActionTypes.DEL_GROUP_TIMELOGS,
	payload : groupId
});

//////////////////////Habit Item/////////////////////////

export const addHabitItems = (habitItems) => ({
	type    : ActionTypes.ADD_HABIT_ITEMS,
	payload : habitItems
});

export const fetchHabits = () => (dispatch) => {
	dispatch(dataLoading());
	return axios
		.get(`${baseUrl}${'habits'}`)
		.then((res) => {
			console.log('fetching Habit Items ', res.data);
			dispatch(addHabitItems(res.data));
		})
		.catch((error) => {
			console.log(error.message);
			dispatch(dataFailed(error.response));
		});
};

export const addHabitItem = (habit) => ({
	type    : ActionTypes.ADD_HABIT_ITEM,
	payload : habit
});

export const postHabitItem = (habitItem, timeData) => (dispatch) => {
	const newHabit = {
		habitGroupId       : habitItem.habitGroupId,
		habitName          : habitItem.habitName,
		targetMilliseconds : habitItem.targetMilliseconds
	};
	const newTimeLog = {
		habitGroupId       : timeData.habitGroupId,
		hrs                : timeData.hrs,
		mins               : timeData.mins,
		loggedMilliseconds : timeData.loggedMilliseconds
	};

	return axios
		.post(baseUrl + 'habits', newHabit)
		.then((res) => {
			const habitId = res.data.id;
			newTimeLog.habitId = habitId;
			newTimeLog.date = new Date().toISOString();
			dispatch(addHabitItem(res.data));
			axios.post(baseUrl + 'timeLogs', newTimeLog).then((res) => {
				dispatch(addTimeLog(res.data));
			});
		})
		.catch((error) => console.log('PostHabitItem error: ', error.response));
};

///DELETE ONE HABIT ITEM
export const delHabitItem = (habitId) => ({
	type    : ActionTypes.DEL_HABIT_ITEM,
	payload : habitId
});

export const delHabitTimeLogs = (habitId) => ({
	type    : ActionTypes.DEL_HABIT_TIMELOGS,
	payload : habitId
});

export const removeHabitItem = ({ id }) => (dispatch) => {
	axios({
		method  : 'DELETE',
		url     : `${baseUrl}habits/${id}`,
		headers : { 'Content-Type': 'application/json' }
	})
		.then((res) => {
			console.log('RES DELETE DATA', res.data);
			dispatch(delHabitItem(id));
			dispatch(delHabitTimeLogs(id));
		})
		.catch((error) => {
			console.log('removeHabitItem Error!!!', error.response);
		});
};

//////////////////////////////////////////////////////

export const addTimeLogs = (timeLogs) => ({
	type    : ActionTypes.ADD_TIMELOGS,
	payload : timeLogs
});

export const fetchTimeLogs = () => (dispatch) => {
	dispatch(dataLoading());
	return axios
		.get(`${baseUrl}${'timeLogs'}`)
		.then((res) => {
			dispatch(addTimeLogs(res.data));
		})
		.catch((error) => {
			console.log(error.message);
			dispatch(dataFailed(error.response));
		});
};

export const addTimeLog = (timeData) => ({
	type    : ActionTypes.ADD_TIMELOG,
	payload : timeData
});
export const postTimeLog = (timeData) => (dispatch) => {
	const newTimeLog = {
		habitId            : timeData.habitId,
		habitGroupId       : timeData.habitGroupId,
		hrs                : timeData.hrs,
		mins               : timeData.mins,
		loggedMilliseconds : timeData.loggedMilliseconds
	};
	newTimeLog.date = new Date().toISOString();
	return axios
		.post(baseUrl + 'timeLogs', newTimeLog)
		.then((res) => {
			dispatch(addTimeLog(res.data));
		})
		.catch((error) => console.log(error));
};
