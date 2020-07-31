import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { habitGroups } from './habitGroupsReducer';
import { habits } from './habitsReducer';
import { timeLogs } from './timeLogReducer';

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			habitGroups : habitGroups,
			habits      : habits,
			timeLogs    : timeLogs
		}),
		applyMiddleware(thunk, logger)
	);
	return store;
};
