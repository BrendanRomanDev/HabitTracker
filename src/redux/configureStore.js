import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
//might need redux forms in here depending on how you do your form components...
import { habitGroups } from './habitGroupReducer';
import { habits } from './habitsReducer';

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			habitGroups : habitGroups,
			habits      : habits
		}),
		applyMiddleware(thunk, logger)
	);
	return store;
};
