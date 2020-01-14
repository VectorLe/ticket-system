import React, { Component } from 'react';
import axios from 'axios';

export default class CreateProject extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            projects: [],
            name: ''
        }
    }

    componentDidMount() {
        // get list of projects to set default project
        axios.get('http://localhost:5000/projects/')
            .then(res => {
                if(res.data.length > 0) {
                    this.setState({
                        projects: res.data.map(project => project.name)
                    })
                }
            })
            .catch((error) => { console.log(error); })
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const project = {
            name: this.state.name
        }

        console.log(project);

        axios.post('http://localhost:5000/projects/create', project)
            .then(res => console.log(res.data));

        // clear form
        this.setState({ name: ''});
    }

    render() {
        return (
            <div>
                <h3>Create New Project</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Project: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.name}
                               onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit"
                               value="Create Project"
                               className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
}
