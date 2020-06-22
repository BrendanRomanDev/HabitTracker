import { HABITS } from '../shared/habits';

//might need an action below, after state parameter
export const habits = (state = { habits: HABITS }) => {
	return state;
};
