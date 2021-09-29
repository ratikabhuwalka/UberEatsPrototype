import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../../actions/loginAction'


class Login extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {isOwner : false};
        this.handleChecked = this.handleChecked.bind(this);
    }

    handleChecked () {
        this.setState({isOwner: true});
      }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const data = {
            email_id: this.state.email_id,
            password: this.state.password,
            is_owner: this.state.isOwner
        }
        console.log(data);
        this.props.userLogin(data);
        console.log(`logging props from login component ${this.props}`);

        this.setState({
            loginFlag: 1
        });
    }



    render() {
        console.log(this.props.user);
        let redirectVar = null;
        let message = ""
        if(this.props.user && this.props.user.RestId){
            localStorage.setItem("email_id", this.props.user.RestEmail);
            localStorage.setItem("is_owner", true);
            localStorage.setItem("user_id", this.props.user.RestId);
            localStorage.setItem("name", this.props.user.RestName);
            redirectVar = <Redirect to="/customerHome" />
        }
        else if(this.props.user && this.props.user.CustId) { 
            localStorage.setItem("email_id", this.props.user.CustEmail);
            localStorage.setItem("is_owner", false);
            localStorage.setItem("user_id", this.props.user.CustId);
            localStorage.setItem("name", this.props.user.CustName);
            redirectVar = <Redirect to="/customerHome" />

        }
        else if(this.props.user === "NO_USER" && this.state.loginFlag){
            message = "No user with this email id";
        }
        else if(this.props.user === "INCORRECT_PASSWORD" && this.state.loginFlag){
            message = "Incorrect Password";
        }
  
        return (
            <div>
                {redirectVar}
                <div>
                    <div class="login-form">
                        <div class="main-div">
                            <div >
                                <h2>Login</h2>
                            </div>
                            <form onSubmit={this.onSubmit}>
                                <div style={{ color: "#ff0000" }}>{message}</div><br />
                                <div class="form-group">
                                    <input type="email" class="form-control" onChange={this.onChange} name="email_id" placeholder="Email Id" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required />
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control" onChange={this.onChange} name="password" placeholder="Password" required />
                                </div>
                                <div class = "form-check">
                                    <input type = "checkbox" class="form-check-input" id = "owner"  
                                        checked={this.state.active}
                                        onClick={this.handleClick}
                                        onChange={ this.handleChecked }/> 
                                    <label class="form-check-label" for ="owner"> Is Owner? </label>
                                </div>
                                <button type="submit" class="btn btn-primary" onClick = {this.onSubmit}>Login</button><br /><br />
                                <div><center><Link to="/signup">Create new account</Link></center></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// Login.propTypes = {
//     userLogin: PropTypes.func.isRequired,
//     user: PropTypes.object.isRequired
// }

const mapStateToProps = state => { 
    return ({
    user: state.login.user
})};

export default connect(mapStateToProps, { userLogin })(Login);

//export default Login