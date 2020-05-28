import React, { Component } from 'react';
import axios from 'axios';
import Ticket from './ticket-display';

export default class TicketList extends Component {
	constructor(props) {
		super(props);

		this.deleteTicket = this.deleteTicket.bind(this);

		this.state = { tickets: [] };
	}

    componentDidMount() {
        axios.get('http://localhost:5000/tickets/')
            .then(res => {
                this.setState({ tickets: res.data })
            })
            .catch(error => console.log(error));
    }

    deleteTicket(id) {
	    axios.delete('http://localhost:5000/tickets/'+id)
	        .then(res => { console.log(res.data)});

	    // update tickets array to all tickets without matching id
	    this.setState({
	        tickets: this.state.tickets.filter(el => el._id !== id)
	    })
	}

	getOpenList() {
        return this.state.tickets.map(currentTicket => {
            if(currentTicket.status !== 'Resolved') 
                return <Ticket 
            			ticket={currentTicket} 
            			deleteTicket={this.deleteTicket}
                        key={currentTicket._id}
                        />;
        })
	}

    getResolvedList() {
        return this.state.tickets.map(currentTicket => {
            if(currentTicket.status === 'Resolved') 
                return <Ticket 
                        ticket={currentTicket} 
                        deleteTicket={this.deleteTicket}
                        key={currentTicket._id}
                        />;
        })
    }

	render() {
		return(
			<div>
                <br></br>
				<h3>Open Tickets</h3>
                    <table className="table">
                        <thead className="thead-light">
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Project</th>
                            <th>Assigned To</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            { this.getOpenList() }
                        </tbody>
                    </table>
                <br></br>
                <h3>Resolved Tickets</h3>
                    <table className="table">
                        <thead className="thead-light">
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Project</th>
                            <th>Assigned To</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            { this.getResolvedList() }
                        </tbody>
                    </table>
			</div>
		);
	}
}