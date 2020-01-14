import React, { Component } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const labels = ['Low', 'Medium', 'High'];
const barPercentage = '0.5';
const backgroundColor = ['lightgreen', 'moccasin', 'crimson'];
const options = {
	legend: {display: false},
	maintainAspectRatio: false,
	responsive: false,
	scales:{
		yAxes: [{
			"ticks": {
				"beginAtZero":true
			}
		}]
	}
}

export default class PriorityChart extends Component {
	constructor(props) {
		super(props);

		this.low = 0;
		this.medium = 0;
		this.high = 0;

		this.state = { 
			tickets: [],
			data: {
				labels: labels,

			    datasets: [{
			        data: [0, 0, 0],
			        barPercentage: barPercentage,
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
                	// get number of each priority and update state data
                	if(ticket.status !== 'Resolved'){
	                	switch(ticket.priority){
	                		case 'Low': 
	                			this.low++;
	                			break;
	                		case 'Medium':
	                			this.medium++;
	                			break;
	                		case 'High':
	                			this.high++;
	                			break;
	                	}
                	}

                	this.setState({ data: {
                		datasets: [{
                			data: [this.low, this.medium, this.high]
        			 	}]
        			}});
                });
            })
            .catch(error => console.log(error));
    }

	render() {
		return(
			<div>
				<Bar 
					data={this.state.data}
					options={options}
					height={350}
					width={500} />
			</div>
		);
	}
}