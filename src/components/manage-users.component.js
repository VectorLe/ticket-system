import React, { Component } from 'react';
import axios from 'axios';

import CreateUser from "./create-user.component";

const User = props => (
    <tr>
        <td>{props.user.name}</td>
        <td>{props.user.email}</td>
        <td>{props.user.role}</td>
        <td>
            <a href="#" onClick={() => { 
                if(window.confirm('Are you sure you want to delete this user?')) 
                    props.deleteUser(props.user._id) 
            }} 
            className="badge badge-danger">Delete</a>
        </td>
    </tr>
);

export default class ManageUsers extends Component {
	constructor(props) {
		super(props);

		this.deleteUser = this.deleteUser.bind(this);

		this.state = { users: [] };
	}

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(res => {
                this.setState({ users: res.data })
            })
            .catch(error => console.log(error));
    }

    componentDidUpdate() {
        axios.get('http://localhost:5000/users/')
            .then(res => {
                this.setState({ users: res.data })
            })
            .catch(error => console.log(error));
    }

    deleteUser(id) {
	    axios.delete('http://localhost:5000/users/'+id)
	        .then(res => { console.log(res.data)});

	    // update tickets array to all users without matching id
	    this.setState({
	        users: this.state.users.filter(el => el._id !== id)
	    })
	}

    getUsers() {
        return this.state.users.map(currentUser => {
            return <User
            			user={currentUser} 
            			deleteUser={this.deleteUser}
                        key={currentUser._id}
                    />;
        })
	}

	render() {
		return(
			<div>
				<table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        { this.getUsers() }
                    </tbody>
                </table>
                <br></br>
                <CreateUser />
			</div>
		);
	}
}