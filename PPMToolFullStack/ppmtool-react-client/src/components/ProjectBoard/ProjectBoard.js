import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import {getBacklog} from '../../actions/backlogActions';
import {connect} from 'react-redux'
import Backlog from './Backlog'

class ProjectBoard extends React.Component {

 constructor(){
      super();
        this.state ={
           errors : {}
        }
 }
  componentWillMount() {
    const {id} = this.props.match.params;
       this.props.getBacklog(id);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors){
      this.setState({errors : nextProps.errors})
    }
  }

  render() {
        const {id} = this.props.match.params;
        const {projectTasks} = this.props
        const {errors} = this.state

  const errorHandler =(projectTasks,errors)=>{
    if(projectTasks.length<1){
      if(errors.message){
        return(
          <div className="alert alert-danger text-center" role="alert">
                {errors.message}
              </div>
        );
      } else {
        return (
          <div className="alert alert-info text-center" role="alert">
              No Project Tasks on this board
            </div>
        );
      }
    } else {
      return(
        <Backlog projectTasksProp = {projectTasks}></Backlog>
      )
    }
  }
    return (
      <div className="container">
      <Link to = {`/addProjectTask/${id}`} className="btn btn-primary mb-3">
        <i className="fas fa-plus-circle">
          Create Project Task</i>
      </Link>
      <br/>
      <hr/>
      {
        errorHandler(projectTasks,errors)//<Backlog projectTasksProp = {projectTasks}></Backlog>
      }
    </div>)
  }
}
const mapStateToProps = state => ({
  backlog: state.backlog,
  projectTasks : state.backlog.projectTasks,
  errors : state.errors
})

ProjectBoard.propTypes = {
  getBacklog: PropTypes.func.isRequired,
  backlog : PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired
  //  projectTasks : PropTypes.object.isRequired
}
export default connect(mapStateToProps, {getBacklog})(ProjectBoard);
