import axios from 'axios';
import {ROOT_URL} from '../Config'
import {
     GET_BACKLOG,GET_ERRORS,GET_PROJECT_TASK,DELETE_PROJECT_TASK
} from './types';

export const addProjectTask = (backlog_id ,projectTask, history) => async dispatch =>{
        try{
          await axios.post(`${ROOT_URL}/api/backlog/${backlog_id}`,projectTask)
          history.push(`/projectBoard/${backlog_id}`)
          dispatch({
            type : GET_ERRORS,
            payload : {}
          })
        }
        catch(err){
          dispatch({
            type : GET_ERRORS,
            payload : err.response.data
          })
        }

}
export const getBacklog = (backlog_id) => async dispatch =>{
        try{
          const res = await axios.get(`${ROOT_URL}/api/backlog/${backlog_id}`)
          dispatch({
             type : GET_BACKLOG,
             payload : res.data
          })
        }
      catch(err){
        dispatch({
          type : GET_ERRORS,
          payload : err.response.data
        })
      }
}
export const getProjectTask = (backlog_id,projectSequence, history) => async dispatch =>{
           try{
              const res = await axios.get(`${ROOT_URL}/api/backlog/${backlog_id}/${projectSequence}`)
              dispatch({
                type : GET_PROJECT_TASK,
                payload : res.data
              })
           }catch(err){
             dispatch({
               type : GET_ERRORS,
               payload : err.response.data
             })
           }
}

export const updateProjectTaskByProjectSequence = (backlog_id,projectSequence,
  projectTask,history) => async dispatch =>{
          try{
            await axios.patch(`${ROOT_URL}/api/backlog/${backlog_id}/${projectSequence}`, projectTask)
            history.push(`/projectBoard/${backlog_id}`);
            dispatch({
              type : GET_ERRORS,
              payload : {}
            });
          }catch(err){
            dispatch({
              type : GET_ERRORS,
              payload : err.response.data
            })
          }
}

export const deleteProjectTask = (backlog_id,projectSequence) => async dispatch =>{
  if(window.confirm(
    "Are you sure about this because this will erase all data related to this task"
  ))
  {
    await axios.delete(`${ROOT_URL}/api/backlog/${backlog_id}/${projectSequence}`)
   dispatch({
     type : DELETE_PROJECT_TASK,
     payload : projectSequence
   })
  }
}
