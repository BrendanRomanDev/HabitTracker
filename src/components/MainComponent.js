import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Dashboard } from './DashboardComponent';
import { connect } from 'react-redux';
import { postHabit } from '../redux/ActionCreators';
import { userInputHabitGroup } from '../redux/formsReducer';

const mapStateToProps = (state) => {
	return {
		habitGroupsState         : state.habitGroups,
		habitsState              : state.habits,
		userInputHabitGroupState : state.userInputHabitGroup,
		userInputHabitItem       : state.userInputHabitItem
	};
};

class Main extends Component {
	// componentDidMount() {
	// 	this.props.postHabit();
	// }

	render() {
		return (
			<React.Fragment>
				<Container fluid={true}>
					<Dashboard />
				</Container>
			</React.Fragment>
		);
	}
}

//RE-ADD MAPDISTPATCHTOPROPS WHEN YOU CAN

export default connect(mapStateToProps)(Main);
