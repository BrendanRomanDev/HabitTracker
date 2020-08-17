import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Dashboard } from './DashboardComponent';
// import { connect } from 'react-redux';

class Main extends Component {
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

export default Main;
