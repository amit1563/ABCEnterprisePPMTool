import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {signUp} from '../../actions/userActions'
import classnames from 'classnames';

class SignUp extends React.Component{
  constructor (){
    super();
    this.state = {
      username : "",
      emailId  : "",
      fullName : "",
      password : "",
      confirmPassword : "",
      errors : {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
onChange(e){
  this.setState({ [e.target.name] : e.target.value })
}
componentDidMount() {
  if (this.props.security.validToken) {
    this.props.history.push("/dashboard");
  }
}
componentWillReceiveProps(nextProps){
  if(nextProps.errors){
    this.setState({errors : nextProps.errors})
  }
}
onSubmit(e){
  e.preventDefault();
  const newuser = {
    username : this.state.username,
    emailId  : this.state.emailId,
    fullName : this.state.fullName,
    password : this.state.password,
    confirmPassword : this.state.confirmPassword
  }
  this.props.signUp(newuser, this.props.history);

}
  render () {
    const {errors} = this.state;
    return (
      <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your Account</p>
                        <form onSubmit = {this.onSubmit}>
                          <div className="form-group">
                            <input type="text" className={classnames("form-control form-control-lg",{
                                      "is-invalid" : errors.username
                            })}
                            placeholder="Username"
                            name="username"
                            value = {this.state.username}
                            onChange = {this.onChange}
                            />
                            {errors.username && (
                              <div className = "invalid-feedback">
                              {errors.username}
                              </div>
                            )}
                            {errors.message && (
                              <div className = "invalid-feedback">
                              {errors.message}
                              </div>
                            )}

                          </div>

                        <div className="form-group">
                            <input type="email" className={classnames("form-control form-control-lg",{
                             "is-invalid" : errors.emailId
                            })}
                            placeholder="Email Address"
                            name="emailId"
                            value = {this.state.emailId}
                            onChange = {this.onChange}
                            />
                            {errors.emailId && (
                              <div className = "invalid-feedback">
                              {errors.emailId}
                              </div>
                            )}

                        </div>
                            <div className="form-group">
                                <input type="text" className={classnames("form-control form-control-lg",{
                                 "is-invalid" : errors.fullName
                                })}
                                placeholder="fullName"
                                name="fullName"
                                value = {this.state.fullName}
                                onChange = {this.onChange}
                                 />
                            { errors.fullName && (
                                      <div className = "invalid-feedback">
                                      {errors.fullName}
                                      </div>
                                    )}
                            </div>


                            <div className="form-group">
                                <input type="password" className={classnames("form-control form-control-lg",{
                                 "is-invalid" : errors.password
                                })}
                                 placeholder="Password"
                                 name="password"
                                 value = {this.state.password}
                                 onChange = {this.onChange}
                                 />
                                 { errors.password && (
                                           <div className = "invalid-feedback">
                                           {errors.password}
                                           </div>
                                         )}

                            </div>
                            <div className="form-group">
                                <input type="password" className={classnames("form-control form-control-lg",{
                                 "is-invalid" : errors.confirmPassword
                                })}
                                   placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value = {this.state.confirmPassword}
                                    onChange = {this.onChange}
                                    />
                                    { errors.confirmPassword && (
                                              <div className = "invalid-feedback">
                                              {errors.confirmPassword}
                                              </div>
                                            )}
                            </div>
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}
const mapStateToProps = state =>({
  errors : state.errors,
  security : state.security
})

SignUp.propTypes = {
  signUp : PropTypes.func.isRequired,
  errors : PropTypes.object.isRequired,
  security :PropTypes.object.isRequired
}
export default connect(
  mapStateToProps,{signUp}
) (SignUp);
