import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { customerSignup } from '../../actions/signupAction'
import { Redirect } from 'react-router';

//export class SignUp extends React.Component {


class CustomerSignUp extends Component{
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            CustName : this.state.custName,
            CustPass : this.state.custPass,
            CustEmail : this.state.custEmail,
            CustPhone : this.state.custPhone,
            CustCity : this.state.custCity,
            CustCountry : this.state.custCountry,
            DOB: this.state.dob
        }


        this.props.customerSignup(data);

        this.setState({
            signupFlag: 1
        });
    }

    render(){
        let redirectVar = null;
        let message = "";
        console.log(this.props.user)
        if (localStorage.getItem("user_id")) {
            redirectVar = <Redirect to="/customerHome" />
        }
        else if (this.props.user === "CUSTOMER ADDED" && this.state.signupFlag) {
            alert("You have registered successfully");
            redirectVar = <Redirect to="/Login" />
        }
        else if(this.props.user === "USER_EXISTS" && this.state.signupFlag){
            message = "Email id is already registered"
        }
        
    return (
       <div>
           {redirectVar}
            <div className = 'base-container'>
            <h1> Sign Up </h1>
            <form onSubmit={this.onSubmit} className = "sign-up-form">   
                <div class="form-group">
                    <input type = "text" name="custName" placeholder="Customer Name"
                        onChange = {this.onChange}/> <br/>
                </div>
                <div class="form-group">
                    <input type = "password" name="custPass" placeholder="Customer Password"
                        onChange = {this.onChange}/> <br/>
                </div>
                <div class="form-group">
                    <input type = "email" name="custEmail" placeholder="Customer Email"
                        onChange = {this.onChange} /> <br/>
                </div>   
                <div class="form-group">
                    <input type = "number" name="custPhone" placeholder="Customer Phone"
                        onChange = {this.onChange} /> <br/>  
                </div>
                <div class="form-group">
                    <input type = "text" name="custCity" placeholder="Customer City"
                        onChange = {this.onChange} /> <br/>
                </div>
                <div class="form-group">
                    <input type = "text" name="custCountry" placeholder="Customer Country"
                        onChange = {this.onChange} /> <br/>
                </div>
                <div class="form-group">
                    <input type = "text" name="dob" placeholder="DOB(DD/MM/YYYY)"
                        onChange = {this.onChange} /> <br/>
                </div>
                <div> {message} </div>
                <button type = "submit" > Submit </button>     
        </form>
 
        </div>

    </div>


        )
    }
}

// CustaurantSignUp.propTypes = {
//     CustaurantSignup: PropTypes.func.isRequired,
//     user: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({ 
    user: state.signup.user,
    payload : state.signup.payload
});


export default connect(mapStateToProps, { customerSignup })(CustomerSignUp);