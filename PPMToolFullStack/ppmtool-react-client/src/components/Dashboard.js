import React from 'react';
import CreateProjectButton from './project/CreateProjectButton'
import ProjectItem from './project/ProjectItem'
import {connect} from 'react-redux';
import {getProjects} from '../actions/projectActions'
import PropTypes from 'prop-types'

class Dashboard extends React.Component {

componentDidMount(){
  this.props.getProjects();
}
  render(){

    const {projects} = this.props.project
    return(
            <div className="projects">
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <h1 className="display-4 text-center">Projects</h1>
                <br />
                <CreateProjectButton/>
                <br />
                <br />
                <br />
                {
                  projects.map(project =>(
                      <ProjectItem  key = { project.id} project ={project}/>
                      ))
                }

                <hr />
            </div>
        </div>
    </div>
</div>
);
    }
}
const mapStateToProps = state =>({
            project : state.project
          });
  Dashboard.propTypes = {
    getProjects : PropTypes.func.isRequired,
    project : PropTypes.object.isRequired

  }

export default connect(
         mapStateToProps,
        {getProjects}
      )(Dashboard);
