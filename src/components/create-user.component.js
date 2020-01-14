import React, { Component } from 'react';
import axios from 'axios';

const roles = ['Admin', 'Project Manager', 'Developer', 'Other'];

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            role: ''
        }
    }

    componentDidMount() {
        // set default values for state properties
        this.setState({
            role: roles[0]
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangeRole(e) {
        this.setState({
            role: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            name: this.state.name,
            email: this.state.email,
            role: this.state.role
        }

        console.log(user);

        axios.post('http://localhost:5000/users/create', user)
            .then(res => console.log(res.data));

        // clear form
        this.setState({
            name: '',
            email: '',
            role: ''
        });
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.name}
                               onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email"
                               className="form-control"
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Role: </label>
                        <select className="form-control"
                                value={this.state.role}
                                onChange={this.onChangeRole}>
                                {
                                    roles.map((role) => {
                                    return <option key={role}
                                                   value={role}>{role}
                                           </option>;
                                    })
                                }
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit"
                               value="Create User"
                               className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
}
