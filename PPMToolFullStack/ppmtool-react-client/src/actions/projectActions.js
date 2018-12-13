import axios from 'axios';
import {GET_ERRORS} from './types';
import {GET_PROJECTS ,GET_PROJECT,DELETE_PROJECT } from './types';
import {ROOT_URL} from '../Config'


export const createProject = ( project, history ) => async dispatch => {
             try{
               await axios.post(`${ROOT_URL}/api/project/create/`, project)
               history.push("/dashboard")
             }
            catch(err){
              dispatch({
                type : GET_ERRORS,
                payload : err.response.data
              })
            }
}

export const updateProject = (project,history) => async dispatch =>{
            try{
                await axios.put(`${ROOT_URL}/api/project/update`, project)
                history.push("/dashboard")
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

export const getProjects = () => async dispatch =>{
         const res= await axios.get(`${ROOT_URL}/api/project/all`)
         dispatch({
           type : GET_PROJECTS,
           payload : res.data
         })
}

export const getProject = (id, history) => async dispatch=>{
            try{
              const res = await axios.get(`${ROOT_URL}/api/project/${id}`)
                         dispatch({
                            type : GET_PROJECT,
                            payload : res.data
                     })
            }
          catch (err) {
            dispatch({
              type : GET_ERRORS,
              payload : err.response.data
            })
          }
}
export const deleteProject = id => async dispatch =>{
  if(window.confirm(
    "Are you sure about this because this will erase all data related to this project"
  ))
  {
    await axios.delete(`${ROOT_URL}/api/project/delete/${id}`)
   dispatch({
     type : DELETE_PROJECT,
     payload : id
   })
  }
}
