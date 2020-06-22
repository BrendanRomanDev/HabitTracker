import React, { Component } from 'react';
import { HabitGroup, HabitGroupInput } from './HabitGroupComponent';
// import '../css';

export function Dashboard(props) {
	console.log('dashboard is working', props);
	return (
		<React.Fragment>
			<HabitGroupInput
			// addToHabitGroupList={this.addToHabitGroupList}
			// allHabitGroups={this.state.allHabitGroups}
			/>
			<HabitGroup
			// removeFromHabitGroupList={this.removeFromHabitGroupList}
			// allHabitGroups={this.state.allHabitGroups}
			// toggleAddHabitModal={this.state.toggleAddHabitModal}
			// addHabitItem={this.addHabitItem}
			// groupItems={this.state.groupItems}
			/>
		</React.Fragment>
	);
}
