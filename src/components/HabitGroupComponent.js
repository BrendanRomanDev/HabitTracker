/////////////////////////////////////////////
///////get add habit component to work///////
/////////////////////////////////////////////
///////////////////////////////////////////

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
import { postHabitGroup, postHabitItem, removeHabitGroup, removeHabitItem } from '../redux/ActionCreators';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		habitGroupsState : state.habitGroups,
		habitsState      : state.habits
	};
};

const mapDispatchToProps = (dispatch) => ({
	handlePostHabitGroup   : (habitGroup) => {
		dispatch(postHabitGroup(habitGroup));
	},
	handlePostHabitItem    : (habit) => {
		dispatch(postHabitItem(habit));
	},
	handleRemoveHabitGroup : (groupName) => {
		dispatch(removeHabitGroup(groupName));
	},
	handleRemoveHabititem  : (habit) => {
		dispatch(removeHabitItem(habit));
	}
});

class HabitGroup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id               : '',
			groupName        : '',
			groupLevel       : '',
			groupDescription : ''
		};
	}

	handleGroupChange = (event) => {
		this.setState({
			id                  : this.props.habitGroupsState.habitGroups.length,
			[event.target.name]: event.target.value
		});
		console.log(this.props.habitsState.habits);
	};

	handleGroupSubmit = (event) => {
		event.preventDefault();
		const habitGroupToAdd = this.state;
		if (habitGroupToAdd.groupName) {
			this.props.handlePostHabitGroup(habitGroupToAdd);
			this.setState({
				id               : '',
				groupName        : '',
				groupLevel       : '',
				groupDescription : ''
			});
		} else {
			alert('Habit Category cannot be blank');
		}
	};

	render() {
		return (
			<Container className="main">
				{/* <HabitGroupInput
					habitGroups={this.props.habitGroupsState.habitGroups}
					groupName={this.state.groupName}
					groupDescription={this.state.groupDescription}
					handleGroupChange={this.handleGroupChange}
					handleSubmit={this.handleGroupSubmit}
				/> */}
				<HabitGroupCard
					habitGroups={this.props.habitGroupsState.habitGroups}
					habits={this.props.habitsState.habits}
					removeHabitGroup={this.props.handleRemoveHabitGroup}
					addHabitItem={this.props.handlePostHabitItem}
					removeHabitItem={this.props.handleRemoveHabititem}
				/>
			</Container>
		);
	}
}

export function HabitGroupInput(props) {
	return (
		<div>
			<Row className="text-center">
				<Col className="col-6 main-container">
					<Card className="card-component">
						<CardHeader>
							<Form onSubmit={(event) => props.handleSubmit(event)}>
								<FormGroup>
									<Row>
										<Col>
											<Input
												onChange={(event) => props.handleGroupChange(event)}
												name="groupName"
												value={props.groupName}
											/>
										</Col>
									</Row>
								</FormGroup>
								<FormGroup>
									<Row>
										<Col>
											<Input
												onChange={(event) => props.handleGroupChange(event)}
												name="groupDescription"
												value={props.groupDescription}
											/>
										</Col>
									</Row>
								</FormGroup>
								<FormGroup>
									<Row>
										<Col className="text-center">
											<Button className="btn btn-block btn-success" type="submit">
												Add Habit Category
											</Button>
										</Col>
									</Row>
								</FormGroup>
							</Form>
						</CardHeader>
					</Card>
				</Col>
			</Row>
		</div>
	);
}
////THE HABIT GROUP MAPPED BUTTONS NEED TO COME FROM WITHIN THE CARD HEADER, AND THE CARD BODY NEEDS TO RENDER BASED ON THAT/////

///////HABIT GROUP, CONTAINING EACH GROUP AND EACH RESPECTIVE HABIT////////
//functional
export function HabitGroupCard(props) {
	const { habitGroups, habits, removeHabitGroup, addHabitItem, removeHabitItem } = props;
	const [ group, setGroup ] = useState({ id: 0 });
	const selectGroupId = (habitGroup) => {
		setGroup(habitGroup);
	};
	//// THE STATE DATA IS CHANGING, BUT THE PAGE IS NOT RE-RENDERING TO INCLUDE THE STATE DATA. THIS IS PROBABLY BECAUSE WE NEED TO ADD A FUNCTION TO USESTATE THAT SETS SOMETHING...

	return (
		<Card className="habitGroup">
			<CardHeader>
				<GroupHeaderButtons habitGroups={habitGroups} selectGroupId={selectGroupId} />
				<hr />
			</CardHeader>

			<GroupCardBody
				habits={habits}
				addHabitItem={addHabitItem}
				habitGroup={habitGroups.filter((item) => group.id === item.id)[0]}
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
//display only the data for the groupID shown in state.

export function GroupCardBody(props) {
	const { habitGroup, habits, addHabitItem } = props;

	return (
		<CardBody className="habitGroup text-center">
			<HabitGroupSettings />
			<h2 className="mb-2">{habitGroup.groupName}</h2>
			<div className="lvlCircle mb-3">
				<svg width="100" height="100">
					<circle cx="50" cy="50" r="45" fill="#63C132" />
				</svg>
				<h1 className="component-level habitGroup">{habitGroup.groupLevel}</h1>
			</div>
			<Row>
				<Col>
					<h6 className="text-left text-muted">300 / 400</h6>
				</Col>
				<Col>
					<h6 className="text-right text-muted">75%</h6>
				</Col>
				PROGRESS BAR HERE
			</Row>

			<div className="card-stats-div mt-4">
				<h5 className="mb-3 font-weight-bold">Commitments</h5>
				<hr />
				<AddHabitModal addHabitItem={addHabitItem} habitGroup={habitGroup} habits={habits} />
				<GroupHabitList habitGroup={habitGroup} habits={habits} />
			</div>
		</CardBody>
	);
}

//presentational
export function RenderHabitGroupCard(props) {
	const { habitGroups, habitGroup, habits, removeHabitGroup, addHabitItem } = props;

	return (
		<Row>
			<Col>
				<Card className="habitGroup">
					<CardHeader>
						<Button className="btn btn-sm btn-dark">{habitGroup.groupName}</Button>
					</CardHeader>
					<Button className="btn btn-sm btn-light add-habit-group-btn">
						<i className="fa fa-plus" />
					</Button>

					{/* /// have habit list render properly : ) */}

					<Button
						type="button"
						onClick={() => {
							removeHabitGroup(habitGroup);
						}}
					>
						Remove Habit Group
					</Button>
				</Card>
			</Col>
		</Row>
	);
}

//HABIT GROUP SETTINGS BUTTON
export const HabitGroupSettings = (props) => {
	const [ dropdownOpen, setOpen ] = useState(false);
	const toggle = () => setOpen(!dropdownOpen);
	return (
		<ButtonDropdown className="settings-btn" isOpen={dropdownOpen} toggle={toggle}>
			<DropdownToggle className="btn-light">
				<i className="fa fa-cog" />
			</DropdownToggle>
			<DropdownMenu>
				<DropdownItem>Delete</DropdownItem>
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
			isModalOpen : false,
			id          : '',
			groupId     : this.props.habitGroup.id,
			habitName   : ''
		};
	}

	toggleModal = () => {
		this.setState({
			isModalOpen : !this.state.isModalOpen
		});
	};

	handleInputChange = (event) => {
		this.setState({
			id                  : this.props.habits.length,
			[event.target.name]: event.target.value
		});
		console.log('MODAL STATE', this.state);
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.toggleModal();
		const habitInfo = {
			id        : this.props.habits.length,
			groupId   : this.state.groupId,
			habitName : this.state.habitName
		};
		this.props.addHabitItem(habitInfo);
		this.setState({
			isModalOpen : false,
			id          : '',
			groupId     : this.props.habitGroup.id,
			habitName   : ''
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
							<Row className="form-group">
								<Col md={10}>
									<Label htmlFor="habitName">New Habit</Label>
									<Input
										type="text"
										name="habitName"
										placeholder="Your Habit Here..."
										onChange={(event) => this.handleInputChange(event)}
										value={this.state.habitName}
									/>
								</Col>
							</Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(HabitGroup);
