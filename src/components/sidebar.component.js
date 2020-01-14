import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

export default class Sidebar extends Component {
	render() {
		return(
			<nav class="col-md-2 d-none d-md-block bg-light sidebar">
	  			<center><img src={logo} className="navbar-brand" width="120" alt="Tech support" /></center>
	    		<ul class="nav flex-column">
	    			<li className="nav-item">
	    				<NavLink to="/" onlyActiveOnIndex={true} className="nav-link" activeClassName="active">
	    					<i class="fas fa-home"></i>
	    					Dashboard Home
	    				</NavLink>
	    			</li>
	    			<li>
                		<NavLink to="/tickets/create" className="nav-link" activeClassName="active">
                			<i class="fas fa-ticket-alt"></i>
                			Submit a Ticket
                		</NavLink>
            		</li>
            		<li>
                		<NavLink to="/manage-users" className="nav-link" activeClassName="active">
                			<i class="fas fa-users"></i>
                			Manage Users
                		</NavLink>
            		</li>
            		<li>
                		<NavLink to="/manage-projects" className="nav-link" activeClassName="active">
                			<i class="fas fa-folder"></i>
                			Manage Projects
                		</NavLink>
            		</li>
	    		</ul>
			</nav>
		);
	}
}
