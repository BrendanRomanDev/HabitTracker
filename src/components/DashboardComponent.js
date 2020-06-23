import React from 'react';
import HabitGroup from './HabitGroupComponent';
// import '../css';

export function Dashboard(props) {
	console.log('dashboard is working - dashboard props: ', props);
	return (
		<React.Fragment>
			<HabitGroup />
		</React.Fragment>
	);
}
