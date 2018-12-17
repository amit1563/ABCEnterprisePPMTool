import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Redirect,Route} from 'react-router-dom'

const SecureRoute =({component :Component ,security, ...otherProps})=>(

  <Route
  {...otherProps} render={props => security.validToken === true ?
     (<Component {...props}/>):
     (<Redirect to ="/login"/>)

   }
   />
)

const mapStateToProps = state =>({
  security : state.security
})
SecureRoute.propTypes = {
  security : PropTypes.object.isRequired
}
export default connect(mapStateToProps)(SecureRoute)
