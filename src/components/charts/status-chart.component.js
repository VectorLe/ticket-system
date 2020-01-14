import React, { Component } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';

const labels = ['Open', 'In Progress', 'Resolved'];
const backgroundColor = ['gold', 'cornflowerblue', 'darkslategray'];
const options = {
	maintainAspectRatio: false,
	responsive: false,
}

export default class StatusChart extends Component {
	constructor(props) {
		super(props);

		this.open = 0;
		this.progress = 0;
		this.resolved = 0;

		this.state = { 
			tickets: [],
			data: {
			    datasets: [{
			        data: [0, 0, 0],
			        backgroundColor: backgroundColor
			    }],

			    labels: labels
			}
		};
	}

	componentDidMount() {
        axios.get('http://localhost:5000/tickets/')
            .then(res => {
                this.setState({ tickets: res.data });
                this.state.tickets.map(ticket => {
                	// get number of each type and update state data
                	switch(ticket.status){
                		case 'Open': 
                			this.open++;
                			break;
                		case 'In Progress':
                			this.progress++;
                			break;
                		case 'Resolved':
                			this.resolved++;
                			break;
                	}

                	this.setState({ data: {
                		datasets: [{
                			data: [this.open, this.progress, this.resolved]
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