import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Dashboard } from './DashboardComponent';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		habitGroupsState : state.habitGroups,
		habitsState      : state.habits
	};
};

// const mapDispatchToProps () => {
//  }

class Main extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
				<Container fluid={true}>
					<Dashboard
						habitGroups={this.props.habitGroupsState.habitGroups}
						habits={this.props.habitsState.habits}
					/>
				</Container>
			</React.Fragment>
		);
	}
}

export default connect(mapStateToProps)(Main);
