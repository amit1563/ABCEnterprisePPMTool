import React from 'react'
//import PropTypes from 'prop-types'
import ProjectTask from '../ProjectBoard/ProjectTasks/ProjectTask'

class Backlog extends React.Component{
  render () {
           const {projectTasksProp} = this.props;
           const tasks = projectTasksProp.map(projectTask =>(
             <ProjectTask key = {projectTask.id} projectTask = {projectTask}/>
           ))
           let todoItems = [];
           let inProgressItems = [];
           let doneItems = [];
              for(let i=0; i<tasks.length;i++){
                const status = tasks[i].props.projectTask.status
                if(status === "DONE"){
                  doneItems.push(tasks[i]);
                }
                if(status === "TO_DO"){
                  todoItems.push(tasks[i]);
                }
                if(status === "IN_PROGRESS"){
                  inProgressItems.push(tasks[i]);
                }
              }
          return (
      <div className="container">
          <div className="row">
              <div className="col-md-4">
                  <div className="card text-center mb-2">
                      <div className="card-header bg-secondary text-white">
                          <h3>TO DO</h3>
                      </div>
                  </div>

                      {
                        // task will render here
                        todoItems
                      }
              </div>
              <div className="col-md-4">
                  <div className="card text-center mb-2">
                      <div className="card-header bg-primary text-white">
                          <h3>In Progress</h3>
                      </div>
                  </div>
                  {
                    inProgressItems
                  }
              </div>
              <div className="col-md-4">
                  <div className="card text-center mb-2">
                      <div className="card-header bg-success text-white">
                          <h3>Done</h3>
                      </div>
                  </div>
                  {
                    doneItems
                  }
              </div>
          </div>
      </div>
    )
  }
}
export default Backlog;
