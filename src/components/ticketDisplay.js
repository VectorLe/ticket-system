import React from 'react';
import { Link } from 'react-router-dom';

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

const Ticket = props => (
    <tr>
        <td>{props.ticket.title}</td>
        <td>{props.ticket.description}</td>
        <td>{props.ticket.projectName}</td>
        <td>{props.ticket.assignee}</td>
        { getPriorities(props.ticket.priority) }
        <td>{props.ticket.status}</td>
        <td>{props.ticket.type}</td>
        <td>
            <Link to={"/edit/"+props.ticket._id} className="badge badge-info">Edit</Link>
            <br></br>
            <a href="#" onClick={() => { 
                if(window.confirm('Are you sure you want to delete this ticket?')) 
                    props.deleteTicket(props.ticket._id) 
            }} 
            className="badge badge-danger">Delete</a>
            <br></br>
            {   /* *****
                *  FIX THIS TO UPDATE STATE
                * *****/
                props.ticket.status !== 'Resolved' ? 
                <a href="#" onClick={() => {
                    props.ticket.status = 'Resolved' 
                }} 
                className="badge badge-success">Mark as Resolved</a> :
                <a href="#" onClick={() => {
                    props.ticket.status = 'Open' 
                }} 
                className="badge badge-secondary">Mark as Open</a>
            }
        </td>
    </tr>
);

export default Ticket;