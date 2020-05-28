import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MarkButton from './mark-button';

let getPriorities = (lvl) => {
    switch(lvl) {
        case 'Low': 
            return <td className="low-priority">{lvl}</td>;
        case 'Medium':
            return <td className="med-priority">{lvl}</td>;
        case 'High': 
            return <td className="high-priority">{lvl}</td>;
        default:
            return <td>{lvl}</td>;
    }
}

export default class Ticket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: ''
        }
    }

    componentDidMount() {
        // default state of ticket
        axios.get('http://localhost:5000/tickets/'+this.props.ticket._id)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    description: res.data.description,
                    projectName: res.data.projectName,
                    assignee: res.data.assignee,
                    priority: res.data.priority,
                    status: res.data.status,
                    type: res.data.type
                })
            })
            .catch(error => console.log(error));
    }

    onChangeStatus(e) {
        // axios.post('http://localhost:5000/tickets/update/' + this.props.ticket._id, this.props.ticket)
        //     .then(res => console.log(res.data));
    }

    render() {
        return (
            <tr>
                <td>{this.props.ticket.title}</td>
                <td>{this.props.ticket.description}</td>
                <td>{this.props.ticket.projectName}</td>
                <td>{this.props.ticket.assignee}</td>
                { getPriorities(this.props.ticket.priority) }
                <td>{this.props.ticket.status}</td>
                <td>{this.props.ticket.type}</td>
                <td>
                    <Link to={"/edit/"+this.props.ticket._id} className="badge badge-info">Edit</Link>
                    <br></br>
                    <a href="#" onClick={() => { 
                        if(window.confirm('Are you sure you want to delete this ticket?')) 
                            this.props.deleteTicket(this.props.ticket._id) 
                    }} 
                    className="badge badge-danger">Delete</a>
                    <br></br>
                    
                    <MarkButton 
                        mark={this.props.ticket.status} 
                        ticketID={this.props.ticket._id}
                    />
                    {   /* *****
                        *  FIX THIS TO UPDATE STATE
                        * *****/
                        // this.props.ticket.status !== 'Resolved' ? 
                        // <a href="#" onClick={() => {
                        //     this.props.ticket.status = 'Resolved' 
                        // }} 
                        // className="badge badge-success">Mark as Resolved</a> :
                        // <a href="#" onClick={() => {
                        //     this.props.ticket.status = 'Open' 
                        // }} 
                        // className="badge badge-secondary">Mark as Open</a>
                    }
                </td>
            </tr>
        );
    }
}