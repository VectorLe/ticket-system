import React, { Component } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';

const backgroundColor = ['aquamarine', 'burlywood', 'firebrick', 'gray'];
const labels = ['Bug/Error', 'Feature Request', 'Security', 'Other'];
const options = {
	maintainAspectRatio: false,
	responsive: false,
}

export default class TypeChart extends Component {
	constructor(props) {
		super(props);

		this.bug = 0;
		this.feature = 0;
		this.security = 0;
		this.other = 0;

		this.state = { 
			tickets: [],
			data: {
				labels: labels,

			    datasets: [{
			        data: [0, 0, 0, 0],
			        backgroundColor: backgroundColor
			    }],
			}
		};
	}

	componentDidMount() {
        axios.get('http://localhost:5000/tickets/')
            .then(res => {
                this.setState({ tickets: res.data });
                this.state.tickets.map(ticket => {
                	// get number of each type and update state data
                	if(ticket.status !== 'Resolved'){
	                	switch(ticket.type){
	                		case 'Bug/Error': 
	                			this.bug++;
	                			break;
	                		case 'Feature Request':
	                			this.feature++;
	                			break;
	                		case 'Security':
	                			this.security++;
	                			break;
	                		case 'Other':
	                			this.other++;
	                			break;
	                	}
                	}

                	this.setState({ data: {
                		datasets: [{
                			data: [this.bug, this.feature, this.security, this.other]
        			 	}]
        			}});
                });
            })
            .catch(error => console.log(error));
    }

	render() {
		return(
			<div>
				<Doughnut 
					data={this.state.data}
					options={options}
					height={300}
					width={500} />
			</div>
		);
	}
}