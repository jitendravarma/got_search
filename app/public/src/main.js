import React from 'react';
import ReactDOM from 'react-dom';


import { Input, Form } from 'reactstrap';
import Autocomplete from 'react-autocomplete';

import DashboardHeader from './components/dashBoard';

import { getRequest, getHeaders } from './utils/Utils';

class IndexPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: '',
			items: [],
			results: [],
			message: ''
		}
	}

	getSuggestions = (query) => {
		var suggestURL = 'http://0.0.0.0:8000/suggest?q=' + query
		getRequest(suggestURL, this.setSuggestions, getHeaders);
	}

	setSuggestions = (data) => {
		if (data) {
			var state = this.state;
			state.items = data.results;
			this.setState(state)
		}

	}
	onChange = (e) => {
		var state = this.state;
		this.getSuggestions(e.target.value)
		state.value = e.target.value;
		this.setState(state);
	}

	setSearchResults = (data) => {
		var state = this.state;
		if (data.results) {
			state.results = data.results;
			state.message = `Total ${data.results.length} result found`;
		} else {
			state.message = 'No results found';
		}
		this.setState(state)
	}

	handleKeyPress = () => {
		if (event.key === 'Enter' && this.state.value !== "") {
			var searchURL = 'http://0.0.0.0:8000/main-search?q=' + this.state.value;
			getRequest(searchURL, this.setSearchResults, getHeaders);
		}
	}

	render() {
		var results = []
		this.state.results.map((item, index) => {
			var attacker_badge = 'badge-success';
			var defender_badge = 'badge-danger';
			if (item.attacker_outcome === 'loss' || item.attacker_outcome === '') {
				attacker_badge = 'badge-danger';
				defender_badge = 'badge-success';
			}
			results.push(<div className="col-12 mt-3 mb-3 border">
				<div className="row m-2" index={index}>
					<div className="col-12 mb-2">
						<ul className="list-group list-group-flush">
							<li className="list-group-item d-flex justify-content-between align-items-center">
								Battle No<span className="badge badge-primary badge-pill">{item.battle_number}</span>
							</li>
							<li className="list-group-item d-flex justify-content-between align-items-center">
								Location<span className="badge badge-primary badge-pill">{item.location}</span>
							</li>
							<li className="list-group-item d-flex justify-content-between align-items-center">
								Battle Type<span className="badge badge-primary badge-pill">{item.battle_type}</span>
							</li>
						</ul>
					</div>
					<div className="col-md-6 col-sm-12 borderless">
						<ul className="list-group list-group-flush">
							<li className="list-group-item d-flex justify-content-between align-items-center">
								Attacker King<span className="badge badge-primary badge-pill">{item.attacker_king}</span>
							</li>
							<li className="list-group-item d-flex justify-content-between align-items-center">
								Attacker Size<span className="badge badge-primary badge-pill">{item.attacker_size ? item.attacker_size : 'Unknown'}</span>
							</li>
							<li className="list-group-item d-flex justify-content-between align-items-center">
								Attacker Outcome<span className={`badge ${attacker_badge} badge-pill`}>{item.attacker_outcome ? item.attacker_outcome : "loss"}</span>
							</li>
							<li className="list-group-item d-flex justify-content-between align-items-center">
								Attacker Commander<span className="badge badge-primary badge-pill text-wrap">{item.attacker_commander ? item.attacker_commander : 'Unkown'}</span>
							</li>
						</ul>
					</div>
					<div className="col-md-6 col-sm-12">
						<ul className="list-group list-group-flush">
							<li className="list-group-item d-flex justify-content-between align-items-center">
								Defender King
							<span className="badge badge-primary badge-pill">{item.defender_king}</span>
							</li>
							<li className="list-group-item d-flex justify-content-between align-items-center">
								Defender Size
							<span className="badge badge-primary badge-pill">{item.defender_size ? item.defender_size : "unkown"}</span>
							</li>
							<li className="list-group-item d-flex justify-content-between align-items-center">
								Defender Outcome
							<span className={`badge ${defender_badge} badge-pill`}>{item.attacker_outcome === 'win' ? 'loss' : 'win'}</span>
							</li>
							<li className="list-group-item d-flex justify-content-between align-items-center">
								Defender Commander
								<span className="badge badge-primary badge-pill text-wrap">{item.defender_commander ? item.defender_commander : 'Unkown'}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			)
		})
		return (
			<React.Fragment>
				<DashboardHeader />
				<div className="container">
					<div className="mt-4">
						<Autocomplete
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
							wrapperStyle={{ className: 'col-8' }}
							inputProps={{
								placeholder: 'Type a location or your fav character',
								className: 'form-control',
								onKeyPress: (e) => this.handleKeyPress(e)
							}} />
					</div>
					<div className="mt-4">
						<p>{this.state.message}</p>
						{results}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default IndexPage;

ReactDOM.render(<IndexPage />, document.getElementById('root'));