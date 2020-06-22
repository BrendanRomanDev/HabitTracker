import React from 'react';
import { Row, Col, Card, CardHeader, CardBody, Button, Form, FormGroup, Input } from 'reactstrap';

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

export function HabitGroup(props) {
	return (
		<CardBody>
			<h5>This is HabitGroup Component</h5>
			<hr />
		</CardBody>
	);
}
