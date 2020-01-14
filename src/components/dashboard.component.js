import React, { Component } from 'react';
import StatusChart from "./charts/status-chart.component";
import PriorityChart from "./charts/priority-chart.component";
import TypeChart from "./charts/type-chart.component";
import TicketList from "./ticket-list.component";

export default class Dashboard extends Component {
    render() {
        return(
            <div>
            <table className="table table-bordered">
                    <thead className="thead-light">
                    <tr>
                        <th><h3>Tickets by Status</h3></th>
                        <th><h3>Tickets by Priority</h3></th>
                        <th><h3>Tickets by Type</h3></th>
                    </tr>
                    </thead>
                    <tbody>
                        <td><StatusChart /></td>
                        <td><PriorityChart /></td>
                        <td><TypeChart /></td>
                    </tbody>
            </table>
            <TicketList />
            </div>
        );
    }
}