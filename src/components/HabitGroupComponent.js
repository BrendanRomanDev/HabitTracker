import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Button, Form, FormGroup, Input } from 'reactstrap';
import { postHabitGroup } from '../redux/ActionCreators';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		habitGroupsState : state.habitGroups,
		habitsState      : state.habits
	};
};

const mapDispatchToProps = {
	postHabitGroup : () => {
		postHabitGroup();
	}
};

class HabitGroup extends Component {
	componentDidMount() {
		this.props.postHabitGroup();
	}
	render() {
		return (
			<React.Fragment>
				<HabitGroupInput habitGroups={this.props.habitGroupsState.habitGroups} />
				{!this.props.habitGroupsState.isLoading && (
					<HabitGroupList
						habitGroups={this.props.habitGroupsState.habitGroups}
						habits={this.props.habitsState.habits}
					/>
				)}
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
							<Form>
								<FormGroup>
									<Row>
										<Col>
											<Input />
										</Col>
									</Row>
								</FormGroup>
								<FormGroup>
									<Row>
										<Col>
											<Input />
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
	const { habitGroups, habits } = props;
	return habitGroups.map((habitGroup) => {
		return <RenderHabitGroup habitGroup={habitGroup} habits={habits} />;
	});
}

//presentational
export function RenderHabitGroup(props) {
	const { habitGroup, habits } = props;
	return (
		<React.Fragment>
			<div>
				<h6>Group #: {+habitGroup.id + 1} </h6>
				<h4>Habit Group Name: {habitGroup.groupName}</h4>
				<p>Category Level: {habitGroup.groupLevel}</p>
				<p>Description: {habitGroup.groupDescription}</p>
				<ul>
					<HabitList habitGroup={habitGroup} habits={habits} />
				</ul>
			</div>
			<Button>Remove Habit Group</Button>
			<hr />
		</React.Fragment>
	);
}
//////////////INDIVIDUAL HABIT LIST///////////////
//functional
export function HabitList(props) {
	const { habitGroup, habits } = props;
	return habits.filter((habit) => habit.groupId === habitGroup.id).map((habit) => {
		return (
			<li>
				<RenderHabit habitGroup={habitGroup} habit={habit} />
			</li>
		);
	});
}
//presentational
export function RenderHabit(props) {
	const { habit } = props;
	return <li>{habit.habitName}</li>;
}

export default connect(mapStateToProps, mapDispatchToProps)(HabitGroup);
