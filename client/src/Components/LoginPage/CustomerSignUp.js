import React, { Component, useMemo  } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { customerSignup } from '../../actions/signupAction'
import { Redirect } from 'react-router';
import NavigationBar from '../NavigationBar';
import Countries  from 'react-select-country';


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
        else if(this.props.user === "CUSTOMER EXISTS" && this.state.signupFlag){
            message = "Email id is already registered"
        }
        
    return (
       <div>
           {redirectVar}
            <NavigationBar/>
            <div className = 'base-container'>
            <div> <h1> Customer Sign Up </h1> </div>          
              <form onSubmit={this.onSubmit} className = "sign-up-form">   
                <div style={{ color: "#ff0000" }}>{message}</div><br />
                <div class="form-group">
                    <input type = "text" name="custName" class="form-control" placeholder="Customer Name"
                        onChange = {this.onChange}/> <br/>
                </div>
                <div class="form-group">
                    <input type = "password" name="custPass" class="form-control" placeholder="Customer Password"
                        onChange = {this.onChange}/> <br/>
                </div>
                <div class="form-group">
                    <input type = "email" name="custEmail" class="form-control" placeholder="Customer Email"
                        onChange = {this.onChange} /> <br/>
                </div>   
                <div class="form-group">
                    <input type = "number" name="custPhone" class="form-control" placeholder="Customer Phone"
                        onChange = {this.onChange} /> <br/>  
                </div>
                <div class="form-group">
                    <input type = "text" name="custCity" class="form-control" placeholder="Customer City"
                        onChange = {this.onChange} /> <br/>
                </div>
                <div class="form-group">
                    <Countries ref="country" class="form-control"name="restCountry" empty=" -- Select country --" flags = {true } onChange={this.onChange} /><br/>
                </div>
                <select class="selectpicker countrypicker"></select>
                <div class="form-group">
                    <input type = "text" name="dob" class="form-control" placeholder="DOB(DD/MM/YYYY)"
                        onChange = {this.onChange} /> <br/>
                </div>
                <div> {message} </div>
                <button type = "submit" class="btn btn-primary" > Submit </button>  
                <a href= '/restaurantSignUp'> Register as an Owner! </a>   
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