////////THIGNS TO FIX LATER////////////
///////LINE 180(ish) 	usedGroupIds     : [ 0, 1 ] <--- THIS WAS TEST DATA

import React, { Component, useState } from 'react';
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
import { PuffLoader, PulseLoader } from 'react-spinners';
import { css } from '@emotion/core';
import axios from 'axios';
import { baseUrl } from '../shared/baseUrl';
import uuid from 'react-uuid';

///////HABIT GROUP, CONTAINING EACH GROUP AND EACH RESPECTIVE HABIT////////
//functional
export function HabitGroupCard(props) {
	const {
		groupLoadingState,
		groupErrMess,
		selectGroupId,
		habitGroups,
		addHabitGroup,
		removeHabitGroup,
		group,
		habits,
		addHabitItem,
		addTimeLog,
		habitsLoadingState,
		habitsErrMess,
		timeLogs
	} = props;
	if (groupLoadingState) {
		return <GroupLoadingCard />;
	}
	if (groupErrMess) {
		return <h4>{groupErrMess}</h4>;
	}
	return (
		<Card className="habitGroup">
			<CardHeader>
				<GroupHeaderButtons habitGroups={habitGroups} selectGroupId={selectGroupId} />
				<AddHabitGroupModal addHabitGroup={addHabitGroup} habitGroups={habitGroups} />
				<hr />
			</CardHeader>
			<GroupCardBody
				//group related
				habitsLoadingState={habitsLoadingState}
				habitsErrMess={habitsErrMess}
				habitGroups={habitGroups}
				habitGroup={habitGroups.filter((item) => group.id === item.id)[0]}
				altHabitGroup={habitGroups.filter((item) => group.id !== item.id)[0]}
				removeHabitGroup={removeHabitGroup}
				//habit item related
				habits={habits}
				addHabitItem={addHabitItem}
				//timeLog Related
				timeLogs={timeLogs}
				addTimeLog={addTimeLog}
			/>
		</Card>
	);
}

//presentational
export function GroupHeaderButtons(props) {
	const { habitGroups, selectGroupId } = props;
	return habitGroups.map((habitGroup) => {
		return (
			<Button className="btn btn-sm btn-dark" onClick={() => selectGroupId(habitGroup)}>
				{habitGroup.groupName}
			</Button>
		);
	});
}

export function GroupCardBody(props) {
	const {
		habitGroup,
		altHabitGroup,
		removeHabitGroup,
		habits,
		addHabitItem,
		addTimeLog,
		timeLogs,
		habitsLoadingState,
		habitsErrMess
	} = props;
	let usedGroup;
	if (habitGroup) {
		usedGroup = habitGroup;
	} else {
		usedGroup = altHabitGroup;
	}
	return (
		<CardBody className="habitGroup text-center">
			<HabitGroupSettings removeHabitGroup={removeHabitGroup} habitGroup={usedGroup} />
			<h2 className="mb-2">{usedGroup.groupName}</h2>
			<div className="lvlCircle mb-3">
				<svg width="100" height="100">
					<circle cx="50" cy="50" r="45" fill="#63C132" />
				</svg>
				<h1 className="component-level habitGroup">{usedGroup.groupLevel}</h1>
			</div>
			<Row>
				<Col>
					<h6 className="text-left text-muted">0 / 400</h6>
				</Col>
				<Col>
					<h6 className="text-right text-muted">0%</h6>
				</Col>
			</Row>
			<div className="progress mb-4">
				<div className="progress-bar bg-info" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" />
			</div>
			<div className="card-stats-div mt-4">
				<h5 className="mb-3 font-weight-bold">Commitments</h5>
				<hr />
				<AddHabitModal
					addHabitItem={addHabitItem}
					habitGroup={usedGroup}
					habits={habits}
					timeLogs={timeLogs}
					addTimeLog={addTimeLog}
				/>
				<GroupHabitList
					habitGroup={usedGroup}
					habits={habits}
					habitsLoadingState={habitsLoadingState}
					habitsErrMess={habitsErrMess}
				/>
			</div>
		</CardBody>
	);
}

export class AddHabitGroupModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen      : false,
			// id               : '',
			groupName        : '',
			groupLevel       : '',
			groupDescription : ''
		};
	}

	toggleModal = () => {
		this.setState({
			isModalOpen : !this.state.isModalOpen
		});
	};

	handleGroupChange = (event) => {
		this.setState({
			// id                  : this.state.usedGroupIds.length,
			[event.target.name]: event.target.value
		});
	};

	handleGroupSubmit = (event) => {
		event.preventDefault();
		const habitGroupToAdd = {
			groupName        : this.state.groupName,
			groupLevel       : this.state.groupLevel,
			groupDescription : this.state.groupDescription
		};
		if (habitGroupToAdd.groupName) {
			this.props.addHabitGroup(habitGroupToAdd);
			this.setState({
				isModalOpen      : false,
				// id               : '',
				groupName        : '',
				groupLevel       : '',
				groupDescription : '',
				groupTimeTotal   : ''
				// usedGroupIds     : [ ...this.state.usedGroupIds.concat(this.state.id) ]
			});
		} else {
			alert('Habit Category cannot be blank');
		}
	};

	render() {
		return (
			<React.Fragment>
				<Button type="button" onClick={this.toggleModal} className="btn btn-sm btn-light add-habit-group-btn">
					<i className="fa fa-plus" />
				</Button>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Add New Habit Category</ModalHeader>
					<ModalBody>
						<Form onSubmit={(event) => this.handleSubmit(event)}>
							<Row className="form-group">
								<Col md={10}>
									<Input
										type="text"
										name="groupName"
										placeholder="Category Name..."
										onChange={(event) => this.handleGroupChange(event)}
										value={this.state.groupName}
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Col md={10}>
									<Input
										type="text"
										name="groupDescription"
										placeholder="Brief Description..."
										onChange={(event) => this.handleGroupChange(event)}
										value={this.state.groupDescription}
									/>
								</Col>
							</Row>
							<Button
								type="submit"
								value="submit"
								color="secondary"
								onClick={(event) => this.handleGroupSubmit(event)}
							>
								Add Category
							</Button>
						</Form>
					</ModalBody>
				</Modal>
			</React.Fragment>
		);
	}
}

//HABIT GROUP SETTINGS BUTTON
export const HabitGroupSettings = (props) => {
	const { habitGroup, removeHabitGroup } = props;
	const [ dropdownOpen, setOpen ] = useState(false);
	const toggle = () => setOpen(!dropdownOpen);
	return (
		<ButtonDropdown className="settings-btn" isOpen={dropdownOpen} toggle={toggle}>
			<DropdownToggle className="btn-light">
				<i className="fa fa-cog" />
			</DropdownToggle>
			<DropdownMenu>
				<DropdownItem>
					<div onClick={() => removeHabitGroup(habitGroup)}>Delete</div>
				</DropdownItem>
			</DropdownMenu>
		</ButtonDropdown>
	);
};

//////////////INDIVIDUAL HABIT LIST///////////////
//functional
export function GroupHabitList(props) {
	const { habitGroup, habits } = props;
	return habits.filter((habit) => habit.groupId === habitGroup.id).map((habit) => {
		return (
			<React.Fragment>
				<Row>
					<RenderGroupHabitItem habit={habit} />
				</Row>
				<hr className="card-stats-hr" />
			</React.Fragment>
		);
	});
}

//presentational
export function RenderGroupHabitItem(props) {
	const { habit } = props;
	return (
		<React.Fragment>
			<Col className="my-2 text-left">{habit.habitName}</Col>
			<Col className="my-2 text-center ml-5">Lvl: 2</Col>
		</React.Fragment>
	);
}

//////////////ADD HABIT ITEM MODAL///////////////
export class AddHabitModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id                 : '',
			isModalOpen        : false,
			groupId            : this.props.habitGroup.id,
			habitName          : '',
			habitHrs           : '',
			habitMins          : '',
			loggedMilliseconds : ''
			// usedItemIds    : //
		};
	}

	toggleModal = () => {
		this.setState({
			isModalOpen : !this.state.isModalOpen,
			groupId     : this.props.habitGroup.id
		});
	};

	handleInputChange = (event) => {
		this.setState({
			// id                  : this.state.usedItemIds.length,
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.toggleModal();
		const habitInfo = {
			groupId        : this.props.habitGroup.id,
			habitName      : this.state.habitName,
			habitTimeTotal : `Hrs: ${this.state.habitHrs} Min: ${this.state.habitMins}`
		};

		const timeData = {
			// id        : this.props.timeLogs.length,
			habitId            : '',
			groupId            : this.props.habitGroup.id,
			hrs                : +this.state.habitHrs,
			mins               : +this.state.habitMins,
			loggedMilliseconds : this.state.habitHrs * 3600000 + this.state.habitMins * 60000
		};

		this.props.addHabitItem(habitInfo, timeData);

		// const postHabitWithTimeLog = async () => {
		// 	await this.props.addHabitItem(habitInfo);
		// 	const res = await axios.get(`${baseUrl}habits`);
		// 	const newId = res.data[res.data.length - 1].id;
		// 	timeData.habitId = newId;
		// 	this.props.addTimeLog(timeData);
		// };
		// postHabitWithTimeLog();

		this.setState({
			isModalOpen        : false,
			id                 : '',
			groupId            : this.props.habitGroup.id,
			habitName          : '',
			habitHrs           : '',
			habitMins          : '',
			loggedMilliseconds : ''
			// usedItemIds    : [ ...this.state.usedItemIds.concat(this.state.id) ]
		});
	};

	render() {
		return (
			<React.Fragment>
				<Button type="button" onClick={this.toggleModal} className="btn btn-sm btn-light add-habit-btn">
					<i className="fa fa-plus" />
				</Button>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>{this.props.habitGroup.groupName}</ModalHeader>
					<ModalBody>
						<Form onSubmit={(event) => this.handleSubmit(event)}>
							<FormGroup className="row">
								<Col size={12}>
									<Label htmlFor="habitName">New Habit</Label>
									<Input
										type="text"
										name="habitName"
										placeholder="Your Habit Here..."
										onChange={(event) => this.handleInputChange(event)}
										value={this.state.habitName}
									/>
								</Col>
							</FormGroup>
							<hr />
							<Label htmlFor="habitHours">Time Already Invested</Label>

							<FormGroup className="row">
								<Col xs={3}>
									<Input
										type="number"
										name="habitHrs"
										placeholder="Hours"
										onChange={(event) => this.handleInputChange(event)}
										value={this.state.habitHrs}
									/>
								</Col>

								<Col xs={3}>
									<Input
										type="number"
										max="59"
										name="habitMins"
										placeholder="Mins"
										onChange={(event) => this.handleInputChange(event)}
										value={this.state.habitMins}
									/>
								</Col>
							</FormGroup>
							<Button type="submit" value="submit" color="secondary">
								Add Habit
							</Button>
						</Form>
					</ModalBody>
				</Modal>
			</React.Fragment>
		);
	}
}

export const GroupLoadingCard = (props) => {
	return (
		<Card className="habitGroup">
			<CardHeader>
				<Button className="btn btn-sm btn-dark">Loading...</Button>
				<Button type="button" className="btn btn-sm btn-light add-habit-group-btn loading-plus-btn">
					<i className="fa fa-plus" />
				</Button>
				<hr />
			</CardHeader>
			<CardBody className="text-center habitGroup">
				<HabitGroupSettings />
				<PuffLoader
					css={css`
						position: relative;
						margin-top: 62px;
						left: 50%;
						transform: translateX(-50%);
					`}
					size={60}
					color={'#63c132'}
					loading={true}
				/>
				<h6 style={{ margin: '25% auto 0' }}>Loading...</h6>
				<div className="card-stats-div">
					<h5 className=" mt-4 font-weight-bold">Commitments</h5>
					<hr />
					<Button className="btn btn-sm btn-light add-habit-btn loading-plus-btn">
						<i className="fa fa-plus" />
					</Button>
					<PulseLoader size={10} color={'#63c132'} loading={true} />
				</div>
			</CardBody>
		</Card>
	);
};
