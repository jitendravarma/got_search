import React from 'react';
import ReactDOM from 'react-dom';


import { Input, Form } from 'reactstrap';
import Autocomplete from 'react-autocomplete';

import DashboardHeader from './components/dashBoard';

class IndexPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: '',
			items: [
				{ label: 'apple' },
				{ label: 'banana' },
				{ label: 'pear' }
			]
		}
	}

	onChange = (e) => {
		var state = this.state;
		state.items = [
			{ label: 'apple2' },
			{ label: 'banana2' },
			{ label: 'pear2' }
		]
		state.value = e.target.value;
		this.setState(state);
	}

	render() {
		return (
			<React.Fragment>
				<DashboardHeader />
				<div className="container">
					<div className="mt-4">
						<Form>
							<div className="row mt-4 text-center">
								<div className="col-5">
									<Input placeholder="Search" />
								</div>
							</div>
							<Autocomplete
								className="form-group"
								getItemValue={(item) => item.label}
								items={this.state.items}
								renderItem={(item, isHighlighted) =>
									<div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
										{item.label}
									</div>
								}
								value={this.state.value}
								onChange={(e) => this.onChange(e)}
								onSelect={(value) => this.setState({ value })}
							/>
						</Form>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default IndexPage;

ReactDOM.render(<IndexPage />, document.getElementById('root'));