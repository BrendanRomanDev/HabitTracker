/////////////////////////////////////////////
///////get add habit component to work///////
/////////////////////////////////////////////
///////////////////////////////////////////

import React, { Component } from 'react';
import {
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
	ModalBody
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
			<React.Fragment>
				<HabitGroupInput
					habitGroups={this.props.habitGroupsState.habitGroups}
					groupName={this.state.groupName}
					groupDescription={this.state.groupDescription}
					handleGroupChange={this.handleGroupChange}
					handleSubmit={this.handleGroupSubmit}
				/>
				<HabitGroupList
					habitGroups={this.props.habitGroupsState.habitGroups}
					habits={this.props.habitsState.habits}
					removeHabitGroup={this.props.handleRemoveHabitGroup}
					addHabitItem={this.props.handlePostHabitItem}
					removeHabitItem={this.props.handleRemoveHabititem}
				/>
			</React.Fragment>
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

///////HABIT GROUP, CONTAINING EACH GROUP AND EACH RESPECTIVE HABIT////////
//functional
export function HabitGroupList(props) {
	const { habitGroups, habits, removeHabitGroup, addHabitItem, removeHabitItem } = props;
	return habitGroups.map((habitGroup) => {
		return (
			<RenderHabitGroup
				habitGroup={habitGroup}
				removeHabitGroup={removeHabitGroup}
				habits={habits}
				addHabitItem={addHabitItem}
				removeHabitItem={removeHabitItem}
			/>
		);
	});
}

//presentational
export function RenderHabitGroup(props) {
	const { habitGroup, habits, removeHabitGroup, addHabitItem, removeHabitItem } = props;
	return (
		<React.Fragment>
			<div>
				<h6>Group #: {habitGroup.id + 1} </h6>
				<h4>Habit Group Name: {habitGroup.groupName}</h4>
				<p>Category Level: {habitGroup.groupLevel}</p>
				<p>Description: {habitGroup.groupDescription}</p>
				<ul>
					<HabitList habitGroup={habitGroup} habits={habits} removeHabitItem={removeHabitItem} />
				</ul>
			</div>
			<Button
				type="button"
				onClick={() => {
					removeHabitGroup(habitGroup);
				}}
			>
				Remove Habit Group
			</Button>
			<AddHabitModal addHabitItem={addHabitItem} habitGroup={habitGroup} habits={habits} />
			<hr />
			<hr />
		</React.Fragment>
	);
}

export function HabitGroupSelector(props) {}

//////////////INDIVIDUAL HABIT LIST///////////////
//functional
export function HabitList(props) {
	const { habitGroup, habits, removeHabitItem } = props;
	return habits.filter((habit) => habit.groupId === habitGroup.id).map((habit) => {
		return (
			<li>
				<RenderHabit habitGroup={habitGroup} habit={habit} removeHabitItem={removeHabitItem} />
			</li>
		);
	});
}

//presentational
export function RenderHabit(props) {
	const { habit, removeHabitItem } = props;
	return (
		<React.Fragment>
			<li>{habit.habitName}</li>
			<Button className="btn-sm" type="button" onClick={() => removeHabitItem(habit)}>
				Delete
			</Button>
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
				<Button type="button" onClick={this.toggleModal}>
					+ Add Habit
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
