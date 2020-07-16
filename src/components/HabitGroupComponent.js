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
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

///////HABIT GROUP, CONTAINING EACH GROUP AND EACH RESPECTIVE HABIT////////
//functional
export function HabitGroupCard(props) {
	const {
		habitGroups,
		addHabitGroup,
		removeHabitGroup,
		selectGroupId,
		group,
		habits,
		addHabitItem,
		addTimeLog,
		timeLogs
	} = props;

	return (
		<Card className="habitGroup">
			<CardHeader>
				<GroupHeaderButtons habitGroups={habitGroups} selectGroupId={selectGroupId} />
				<AddHabitGroupModal addHabitGroup={addHabitGroup} habitGroups={habitGroups} />
				<hr />
			</CardHeader>
			<GroupCardBody
				//group related
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
	const { habitGroup, altHabitGroup, removeHabitGroup, habits, addHabitItem, addTimeLog, timeLogs } = props;
	if (habitGroup) {
		return (
			<CardBody className="habitGroup text-center">
				<HabitGroupSettings removeHabitGroup={removeHabitGroup} habitGroup={habitGroup} />
				<h2 className="mb-2">{habitGroup.groupName}</h2>
				<div className="lvlCircle mb-3">
					<svg width="100" height="100">
						<circle cx="50" cy="50" r="45" fill="#63C132" />
					</svg>
					<h1 className="component-level habitGroup">{habitGroup.groupLevel}</h1>
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
						habitGroup={habitGroup}
						habits={habits}
						timeLogs={timeLogs}
						addTimeLog={addTimeLog}
					/>
					<GroupHabitList habitGroup={habitGroup} habits={habits} />
				</div>
			</CardBody>
		);
	} else {
		return (
			<CardBody className="habitGroup text-center">
				<HabitGroupSettings removeHabitGroup={removeHabitGroup} habitGroup={altHabitGroup} />
				<h2 className="mb-2">{altHabitGroup.groupName}</h2>
				<div className="lvlCircle mb-3">
					<svg width="100" height="100">
						<circle cx="50" cy="50" r="45" fill="#63C132" />
					</svg>
					<h1 className="component-level habitGroup">{altHabitGroup.groupLevel}</h1>
				</div>
				<Row>
					<Col>
						<h6 className="text-left text-muted">300 / 400</h6>
					</Col>
					<Col>
						<h6 className="text-right text-muted">75%</h6>
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
						habitGroup={altHabitGroup}
						habits={habits}
						timeLogs={timeLogs}
						addTimeLog={addTimeLog}
					/>
					<GroupHabitList habitGroup={altHabitGroup} habits={habits} />
				</div>
			</CardBody>
		);
	}
}

export class AddHabitGroupModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen      : false,
			id               : '',
			groupName        : '',
			groupLevel       : '',
			groupDescription : '',
			usedGroupIds     : [ 0, 1 ]
		};
	}
	///maybe just add 1 to a number every time usedgroupID is used? ^^^^
	toggleModal = () => {
		this.setState({
			isModalOpen : !this.state.isModalOpen
		});
	};

	handleGroupChange = (event) => {
		this.setState({
			id                  : this.state.usedGroupIds.length,
			[event.target.name]: event.target.value
		});
	};

	handleGroupSubmit = (event) => {
		event.preventDefault();
		const habitGroupToAdd = {
			id               : this.state.id,
			groupName        : this.state.groupName,
			groupLevel       : this.state.groupLevel,
			groupDescription : this.state.groupDescription
		};
		if (habitGroupToAdd.groupName) {
			this.props.addHabitGroup(habitGroupToAdd);
			this.setState({
				isModalOpen      : false,
				id               : '',
				groupName        : '',
				groupLevel       : '',
				groupDescription : '',
				groupTimeTotal   : 0,
				usedGroupIds     : [ ...this.state.usedGroupIds.concat(this.state.id) ]
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
			isModalOpen    : false,
			id             : '',
			groupId        : this.props.habitGroup.id,
			habitName      : '',
			habitHrs       : '',
			habitMins      : '',
			habitTimeTotal : '',
			usedItemIds    : [ 0 ]
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
			id                  : this.state.usedItemIds.length,
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.toggleModal();
		const habitInfo = {
			id        : this.state.id,
			groupId   : this.props.habitGroup.id,
			habitName : this.state.habitName
		};

		const timeData = {
			id        : this.props.timeLogs.length,
			habitId   : this.state.id,
			groupId   : this.props.habitGroup.id,
			hrs       : +this.state.habitHrs,
			mins      : +this.state.habitMins,
			timeTotal : this.state.habitTimeTotal
		};
		this.props.addHabitItem(habitInfo);
		this.props.addTimeLog(timeData);
		this.setState({
			isModalOpen    : false,
			id             : '',
			groupId        : this.props.habitGroup.id,
			habitName      : '',
			habitHrs       : '',
			habitMins      : '',
			habitTimeTotal : '',
			usedItemIds    : [ ...this.state.usedItemIds.concat(this.state.id) ]
		});
	};
	//props.timelogs...
	//props.addTimeLog(timeData)
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
