import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Header/Header'
import "bootstrap/dist/css/bootstrap.min.css";
import AddProject from './components/project/AddProject';
import {Provider} from 'react-redux';
import store from './store'
import updateProjectComponent from './components/project/updateProjectComponent';
import ProjectBoard from './components/ProjectBoard/ProjectBoard.js'
import AddProjectTask from './components/ProjectBoard/ProjectTasks/AddProjectTask'
import UpdateProjectTask from './components/ProjectBoard/ProjectTasks/UpdateProjectTask'
import Landing from './components/Landing/Landing';
import Login from './components/User/Login';
import SignUp from './components/User/SignUp';


import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
      <Router>
      <div className="App">
        <Header/>
        {
          //start of unsecure route
        }
        <Route exact path = "/" component = {Landing}/>
        <Route exact path = "/login" component = {Login}/>
        <Route exact path = "/signUp" component = {SignUp}/>
        {
          //start of secure routing
        }
        <Route exact path = "/addProject" component={AddProject} />
        <Route exact path = "/dashboard" component={Dashboard}/>
        <Route exact path = "/updateProject/:id" component ={updateProjectComponent}/>
        <Route exact path = '/projectBoard/:id' component = {ProjectBoard} />
        <Route exact path = '/addProjectTask/:id' component = {AddProjectTask} />
        <Route exact path = '/updateProjectTask/:backlog_id/:projectSequence' component = {UpdateProjectTask} />
      </div>
      </Router>
        </Provider>
    );
  }
}

export default App;
