import React from 'react';
import ReactDOM from 'react-dom';

import DashboardHeader from './components/dashBoard';

class IndexPage extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<React.Fragment>
				<DashboardHeader />
				<p>Test</p>
			</React.Fragment>
		);
	}
}

export default IndexPage;

ReactDOM.render(<IndexPage />, document.getElementById('root'));