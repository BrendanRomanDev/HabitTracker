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
import {
	postHabitGroup,
	postHabitItem,
	removeHabitGroup,
	removeHabitItem,
	postTimeLog,
	fetchGroups,
	fetchHabits,
	fetchTimeLogs
} from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { PulseLoader } from 'react-spinners';

const mapStateToProps = (state) => {
	return {
		habitGroupsState : state.habitGroups,
		habitsState      : state.habits,
		timeLogState     : state.timeLogs
	};
};

const mapDispatchToProps = {
	fetchGroups,
	fetchHabits,
	fetchTimeLogs,
	postHabitGroup,
	postHabitItem,
	removeHabitGroup,
	removeHabitItem,
	postTimeLog
};

export function ManageHabits(props) {
	const groupLoadingState = props.habitGroupsState.isLoading;
	const groupErrMess = props.habitGroupsState.errMess;
	const habitsLoadingState = props.habitsState.isLoading;
	const habitsErrMess = props.habitsState.errMess;
	// const timeLogLoadingState = props.timeLogs.isLoading;

	useEffect(() => {
		props.fetchGroups();
		props.fetchHabits();
		props.fetchTimeLogs();
	}, []);
	const [ group, setGroup ] = useState({ id: 0 });
	const selectGroupId = (habitGroup) => {
		setGroup(habitGroup);
	};

	return (
		<Container className="main">
			<HabitGroupCard
				//general use
				//habit group related
				habitGroups={props.habitGroupsState.habitGroups}
				addHabitGroup={props.postHabitGroup}
				removeHabitGroup={props.removeHabitGroup}
				selectGroupId={selectGroupId}
				group={group}
				groupLoadingState={groupLoadingState}
				groupErrMess={groupErrMess}
				//habit item related
				habits={props.habitsState.habits}
				addHabitItem={props.postHabitItem}
				habitsLoadingState={habitsLoadingState}
				habitsErrMess={habitsErrMess}
				//time log related
				timeLogs={props.timeLogState.timeLogs}
				addTimeLog={props.postTimeLog}
			/>
			<AllHabitCards
				//habit group related
				group={group}
				selectGroupId={selectGroupId}
				//habit item related
				habits={props.habitsState.habits}
				removeHabitItem={props.removeHabitItem}
				timeLogs={props.timeLogState.timeLogs}
				timeLogState={props.timeLogState}
				addTimeLog={props.postTimeLog}
			/>
		</Container>
	);
}
///GET EACH CARD RENDERING THE TIMELOGS PROPERLY based on the filter data!!!
export function AllHabitCards(props) {
	const { habits, group, removeHabitItem, timeLogs, timeLogState, addTimeLog } = props;

	return habits.filter((habit) => habit.habitGroupId === group.id).map((habit) => {
		return (
			<React.Fragment>
				<Row>
					<HabitItemCard
						key={habit.id}
						habit={habit}
						removeHabitItem={removeHabitItem}
						timeLogState={timeLogState}
						timeLog={timeLogs.filter((timeLog) => timeLog.habitId === habit.id).reduce((a, b) => {
							return {
								loggedMilliseconds : a.loggedMilliseconds + b.loggedMilliseconds
							};
						}, { loggedMilliseconds: 0 })}
						addTimeLog={addTimeLog}
					/>
				</Row>
			</React.Fragment>
		);
	});
}
//For every item belonging to the selected Habit Group, Display a Card for EACH habit item belonging to it.

export function HabitItemCard(props) {
	const { habit, removeHabitItem, timeLogState, timeLog, addTimeLog } = props;

	// calcHrsAndMins(timeLog.loggedMilliseconds);

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
							<AddTimeLogModal habit={habit} addTimeLog={addTimeLog} />
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
						<div className="col my-2">
							<RenderTimeLog timeLogState={timeLogState} timeLog={timeLog} />
						</div>
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
					<div onClick={() => removeHabitItem(habit)}>
						<i className="fa fa-trash" /> Delete
					</div>
				</DropdownItem>
			</DropdownMenu>
		</ButtonDropdown>
	);
};

export function RenderTimeLog({ timeLog }) {
	if (timeLog) {
		const hrs = Math.floor(timeLog.loggedMilliseconds / 3600000);
		const min = Math.floor((timeLog.loggedMilliseconds - hrs * 3600000) / 60000);
		return <h6>{`${hrs}hrs, ${min} min`}</h6>;
	}
	return <PulseLoader size={3} color={'#63c132'} loading={true} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageHabits);

export class AddTimeLogModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id                 : '',
			isModalOpen        : false,
			habitGroupId       : this.props.habit.habitGroupId,
			habitId            : this.props.habit.id,
			habitHrs           : '',
			habitMins          : '',
			loggedMilliseconds : ''
		};
	}

	toggleModal = () => {
		this.setState({
			isModalOpen : !this.state.isModalOpen
		});
	};

	handleInputChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.toggleModal();

		const timeData = {
			habitId            : this.props.habit.id,
			habitGroupId       : this.props.habit.habitGroupId,
			hrs                : +this.state.habitHrs,
			mins               : +this.state.habitMins,
			loggedMilliseconds : this.state.habitHrs * 3600000 + this.state.habitMins * 60000
		};

		this.props.addTimeLog(timeData);

		this.setState({
			id                 : '',
			isModalOpen        : false,
			habitGroupId       : this.props.habit.habitGroupId,
			habitId            : this.props.habit.id,
			habitHrs           : '',
			habitMins          : '',
			loggedMilliseconds : ''
		});
	};

	render() {
		return (
			<React.Fragment>
				<Button onClick={this.toggleModal} className="btn btn-light log-time-btn">
					<i className="fa fa-plus m-0" />
				</Button>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>{this.props.habit.habitName}</ModalHeader>
					<ModalBody>
						<Form onSubmit={(event) => this.handleSubmit(event)}>
							<Label htmlFor="habitHours">Log Time</Label>

							<FormGroup className="row">
								<Col xs={3}>
									<Input
										type="number"
										name="habitHrs"
										placeholder="Hours"
										min="0"
										onChange={(event) => this.handleInputChange(event)}
										value={this.state.habitHrs}
									/>
								</Col>

								<Col xs={3}>
									<Input
										type="number"
										max="59"
										min="0"
										name="habitMins"
										placeholder="Mins"
										onChange={(event) => this.handleInputChange(event)}
										value={this.state.habitMins}
									/>
								</Col>
							</FormGroup>
							<Button type="submit" value="submit" color="secondary">
								Log Time
							</Button>
						</Form>
					</ModalBody>
				</Modal>
			</React.Fragment>
		);
	}
}
