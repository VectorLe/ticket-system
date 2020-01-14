import React from 'react';
import { BrowserRouter as Router, Route  } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import components
import Navbar from "./components/navbar.component";
import Sidebar from "./components/sidebar.component";
import Dashboard from "./components/dashboard.component";
import CreateTicket from "./components/create-ticket.component";
import CreateUser from "./components/create-user.component";
import ManageUsers from "./components/manage-users.component";
import ManageProjects from "./components/manage-projects.component";
import EditTicket from "./components/edit-ticket.component";

export default function App() {
  return (
    <Router>
        <Navbar />
        <div className="wrapper">
            <Sidebar />
            <div id="content">
                <Route path="/" exact component={Dashboard} />
                <Route path="/tickets/create" component={CreateTicket} />
                <Route path="/manage-users" component={ManageUsers} />
                <Route path="/users/create" component={CreateUser} />
                <Route path="/manage-projects" component={ManageProjects} />
                <Route path="/edit/:id" component={EditTicket} />
            </div>
        </div>
    </Router>
  );
}

