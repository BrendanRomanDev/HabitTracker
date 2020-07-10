import React from 'react';
import ManageHabits from './ManageHabitsComponent';
// import '../css';

export function Dashboard(props) {
	console.log('dashboard is working - dashboard props: ', props);
	return (
		<React.Fragment>
			<ManageHabits />
		</React.Fragment>
	);
}
