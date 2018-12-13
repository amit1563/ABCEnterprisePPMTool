import React from 'react'
import PropTypes from 'prop-types'
import {getProjectTask , updateProjectTaskByProjectSequence} from '../../../actions/backlogActions';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import classnames from 'classnames'

class UpdateProjectTask extends React.Component {

    constructor (){
      super();

      this.state = {
      id: "",
      projectSequence: "",
      summary: "",
      acceptanceCriteria: "",
      status: "",
      priority: "",
      dueDate: "",
      projectIdentifier: "",
      create_At: "",
      errors : {}
    };
  this.onChange = this.onChange.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
      const {backlog_id, projectSequence} = this.props.match.params;
      this.props.getProjectTask(backlog_id,projectSequence,this.props.history);
    }
    componentWillReceiveProps(nextProps) {
      if(nextProps.errors){
          this.setState({ errors : nextProps.errors })
      }
      const {
        id,
        projectSequence,
        summary,
        acceptanceCriteria,
        status,
        priority,
        dueDate,
        projectIdentifier,
        create_At
      } = nextProps.projectTask;

       this.setState({
        id,
        projectSequence,
        summary,
        acceptanceCriteria,
        status,
        priority,
        dueDate,
        projectIdentifier,
        create_At,
      });
    }
    onChange(e){
      this.setState({ [e.target.name] : e.target.value});
    }

    onSubmit(e){
      e.preventDefault();
      const UpdateProjectTask = {
      id: this.state.id,
      projectSequence: this.state.projectSequence,
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      status: this.state.status,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
      projectIdentifier: this.state.projectIdentifier,
      create_At: this.state.create_At
    };
    const {backlog_id, projectSequence} = this.props.match.params;
    this.props.updateProjectTaskByProjectSequence(backlog_id,projectSequence,
      UpdateProjectTask,this.props.history)
    }
  render () {
    const {errors} = this.state

/**
const errorHandler = (projectTask, errors) => {
    if (errors.message) {
      return (<div className="alert alert-danger text-center" role="alert">
        {errors.message}
      </div>);
    } else {
      return (<div className="alert alert-info text-center" role="alert">
        No Project Tasks found
      </div>);
    }
}**/
    return (
      <div className="add-PBI">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to = {`/projectBoard/${this.state.projectIdentifier}`} className="btn btn-light">
                            Back to Project Board
                        </Link>
                        <h4 className="display-4 text-center">Update Project Task</h4>
                        <p className="lead text-center">Project Name + Project Code</p>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" className= {classnames("form-control form-control-lg",{
                                     "is-invalid": errors.summary
                                  })}
                                  name="summary"
                                  placeholder="Project Task summary"
                                  value={this.state.summary}
                                  onChange={this.onChange}
                                  />
                                  {errors.summary && (
                                   <div className="invalid-feedback">{errors.summary}</div>
                                      )}
                            </div>
                            <div className="form-group">
                                <textarea className="form-control form-control-lg"
                                  placeholder="Acceptance Criteria" name="acceptanceCriteria"
                                  value={this.state.acceptanceCriteria}
                                  onChange={this.onChange}
                                  ></textarea>
                            </div>
                            <h6>Due Date</h6>
                            <div className="form-group">
                                <input type="date" className="form-control form-control-lg"
                                  name="dueDate"
                                  value = {this.state.dueDate}
                                  onChange={this.onChange}
                                  />
                            </div>
                            <div className="form-group">
                                <select className="form-control form-control-lg" name="priority"
                                    value = {this.state.priority}
                                    onChange={this.onChange}
                                  >
                                    <option value={0}>Select Priority</option>
                                    <option value={1}>High</option>
                                    <option value={2}>Medium</option>
                                    <option value={3}>Low</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <select className="form-control form-control-lg"
                                   name="status"
                                   value = {this.state.status}
                                   onChange={this.onChange}
                                  >
                                    <option value="">Select Status</option>
                                    <option value="TO_DO">TO DO</option>
                                    <option value="IN_PROGRESS">IN PROGRESS</option>
                                    <option value="DONE">DONE</option>
                                </select>
                            </div>

                            <input type="submit" className="btn btn-primary btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}
 UpdateProjectTask.propTypes = {
      getProjectTask : PropTypes.func.isRequired,
      projectTask : PropTypes.object.isRequired,
      updateProjectTaskByProjectSequence : PropTypes.func.isRequired
}
const mapStateToProps = state =>({
      errors : state.errors,
      projectTask : state.backlog.projectTask
})
export default connect(
mapStateToProps,{getProjectTask, updateProjectTaskByProjectSequence}
)(UpdateProjectTask);
