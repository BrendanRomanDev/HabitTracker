////////THIGNS TO FIX LATER////////////
///////LINE 180(ish) 	usedGroupIds     : [ 0, 1 ] <--- THIS WAS TEST DATA

import React, { Component, useState, useEffect } from 'react';
import {
	Container,
	Row,
	Col,
	Card,
	CardHeader,
	CardBody,
	Form,
	Button,
	FormGroup,
	Label,
	Input,
	Modal,
	ModalHeader,
	ModalBody,
	ButtonDropdown,
	DropdownToggle,
	DropdownItem,
	DropdownMenu
} from 'reactstrap';
import { HabitGroupCard } from './HabitGroupComponent';
import { Loading } from './LoadingComponent';
import {
	postHabitGroup,
	postHabitItem,
	removeHabitGroup,
	removeHabitItem,
	postTimeLog,
	fetchItems
} from '../redux/ActionCreators';
import { connect } from 'react-redux';
// import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = (state) => {
	return {
		habitGroupsState : state.habitGroups,
		habitsState      : state.habits,
		timeLogState     : state.timeLogs
	};
};

const mapDispatchToProps = (dispatch) => ({
	getItems               : (itemsToFetch) => {
		dispatch(fetchItems(itemsToFetch));
	},
	handlePostHabitGroup   : (habitGroup) => {
		dispatch(postHabitGroup(habitGroup));
	},
	handlePostHabitItem    : (habit) => {
		dispatch(postHabitItem(habit));
	},
	handleRemoveHabitGroup : (habitGroup) => {
		dispatch(removeHabitGroup(habitGroup));
	},
	handleRemoveHabititem  : (habit) => {
		dispatch(removeHabitItem(habit));
	},
	handlePostTimeLog      : (timeData) => {
		dispatch(postTimeLog(timeData));
	}
});

export function ManageHabits(props) {
	useEffect(() => {
		props.getItems('habitGroups');
	});
	useEffect(() => {
		props.getItems('habits');
	});
	useEffect(() => {
		props.getItems('timeLogs');
	});
	const [ group, setGroup ] = useState({ id: 0 });
	const selectGroupId = (habitGroup) => {
		setGroup(habitGroup);
	};

	if (props.habitGroupsState.habitGroups.isLoading) {
		return <Loading />;
	}
	if (props.habitGroupsState.habitGroups.errMess) {
		return <h4>{props.habitGroupsState.habitGroups.errMess}</h4>;
	}

	return (
		<Container className="main">
			<HabitGroupCard
				//habit group related
				habitGroups={props.habitGroupsState.habitGroups}
				addHabitGroup={props.handlePostHabitGroup}
				removeHabitGroup={props.handleRemoveHabitGroup}
				selectGroupId={selectGroupId}
				group={group}
				//habit item related
				habits={props.habitsState.habits}
				addHabitItem={props.handlePostHabitItem}
				//time log related
				timeLogs={props.timeLogState.timeLogs}
				addTimeLog={props.handlePostTimeLog}
			/>
			<AllHabitCards
				dataLoading={props.handleDataLoading}
				dataFailed={props.handleDataFail}
				//habit group related
				group={group}
				selectGroupId={selectGroupId}
				//habit item related
				habits={props.habitsState.habits}
				removeHabitItem={props.handleRemoveHabititem}
				timeLogs={props.timeLogState.timeLogs}
				addTimeLog={props.handlePostTimeLog}
			/>
		</Container>
	);
}
///GET EACH CARD RENDERING THE TIMELOGS PROPERLY based on the filter data!!!
export function AllHabitCards(props) {
	const { habits, group, removeHabitItem, timeLogs, addTimeLog } = props;
	return habits.filter((habit) => habit.groupId === group.id).map((habit) => {
		return (
			<React.Fragment>
				<Row>
					<HabitItemCard
						dataLoading={props.handleDataLoading}
						dataFailed={props.handleDataFail}
						habit={habit}
						removeHabitItem={removeHabitItem}
						timeLog={timeLogs.filter((timeLog) => timeLog.habitId === habit.id)}
					/>
				</Row>
			</React.Fragment>
		);
	});
}
//For every item belonging to the selected Habit Group, Display a Card for EACH habit item belonging to it.

export function HabitItemCard(props) {
	const { habit, removeHabitItem, timeLog } = props;
	return (
		<Card className="card habitItem text-center">
			<CardHeader className="card-header m-0">
				<h2>{habit.habitName}</h2>
			</CardHeader>
			<HabitItemSettings habit={habit} removeHabitItem={removeHabitItem} />
			<hr className="header-hr" />
			<CardBody className="habitItem">
				<Row>
					<Col className="col-3">
						<div className="lvlCircle mb-3">
							<svg width="50" height="50">
								<circle cx="25" cy="25" r="25" fill="#63C132" />
							</svg>
							<h1 className="component-level habitItem">31</h1>
							<Button className="btn btn-light log-time-btn">
								<i className="fa fa-plus m-0" />
							</Button>
						</div>
					</Col>
					<Col className="col-9">
						<Row>
							<Col>
								<h6 className="xp-num habitItem text-left text-muted ">0 / 400</h6>
							</Col>
							<Col>
								<h6 className="xp-num habitItem text-right text-muted mb-2">0%</h6>
							</Col>
						</Row>
						<div className="progress mb-2">
							<div className="progress-bar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" />
						</div>
					</Col>
				</Row>
				<div className="card-stats-div">
					<h4 className="mb-2">Today</h4>
					<div className="row">
						<div className="col my-2 text-left">Time Invested</div>
						<div className="col my-2">{timeLog.id ? timeLog.hrs : 0}</div>
					</div>
					<hr className="card-stats-hr" />
					<div className="row">
						<div className="col my-2 text-left">XP Gain</div>
						<div className="col my-2">250 XP</div>
					</div>
					<hr className="card-stats-hr" />
					<div className="row ">
						<div className="col my-2 text-left">Daily Streak</div>
						<div className="col my-2">3</div>
					</div>
					<hr className="card-stats-hr" />
				</div>
			</CardBody>
		</Card>
	);
}

//HABIT ITEM SETTINGS BUTTON
export const HabitItemSettings = (props) => {
	const { habit, removeHabitItem } = props;
	const [ dropdownOpen, setOpen ] = useState(false);
	const toggle = () => setOpen(!dropdownOpen);
	return (
		<ButtonDropdown className="details-btn" isOpen={dropdownOpen} toggle={toggle}>
			<DropdownToggle className="btn-light">
				<i className="fa fa-ellipsis-v" />
			</DropdownToggle>
			<DropdownMenu>
				<DropdownItem>
					<div onClick={() => removeHabitItem(habit)}>Delete</div>
				</DropdownItem>
			</DropdownMenu>
		</ButtonDropdown>
	);
};

//

export default connect(mapStateToProps, mapDispatchToProps)(ManageHabits);
