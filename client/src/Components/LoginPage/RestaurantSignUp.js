import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { restaurantSignup } from '../../actions/signupAction'
import { Redirect } from 'react-router';
import NavigationBar from '../NavigationBar';
import Countries  from 'react-select-country';



//export class SignUp extends React.Component {


class RestaurantSignUp extends Component{
    
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
            restName : this.state.restName,
            restPass : this.state.restPass,
            restEmail : this.state.restEmail,
            restPhone : this.state.restPhone,
            restCity : this.state.restCity,
            restCountry : this.state.restCountry,
            startTime : this.state.startTime,
            endTime : this.state.endTime,
            restType : this.state.restType
        }
    
    

        this.props.restaurantSignup(data);

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
        else if (this.props.user === "RESTAURANT ADDED" && this.state.signupFlag) {
            alert("You have registered successfully");
            redirectVar = <Redirect to="/Login" />
        }
        else if(this.props.user === "USER EXISTS" && this.state.signupFlag){
            message = "Email id is already registered"
        }
        
    return (
       <div>
           {redirectVar}
           <NavigationBar/>
            <div className = "form-row">
            <div> <h1> Restaurant Sign Up </h1> </div>
            <form onSubmit={this.onSubmit} className = "sign-up-form">  
            <div style={{ color: "#ff0000" }}>{message}</div><br /> 
                <div class="form-group">
                    <input type = "text" class="form-control" name="restName" placeholder="Restaurant Name"
                        onChange = {this.onChange}/> <br/>
                </div>
                <div class="form-group">
                    <input type = "password" class="form-control" name="restPass" placeholder="Restaurant Password"
                        onChange = {this.onChange}/> <br/>
                </div>
                <div class="form-group">
                    <input type = "email" class="form-control" name="restEmail" placeholder="Restaurant Email"
                        onChange = {this.onChange} /> <br/>
                </div>   
                <div class="form-group">
                    <input type = "number" class="form-control" name="restPhone" placeholder="Restaurant Phone"
                        onChange = {this.onChange} /> <br/>  
                </div>
                <div class="form-group">
                    <input type = "text" class="form-control" name="restCity" placeholder="Restaurant City"
                        onChange = {this.onChange} /> <br/>
                </div>
                <div class="form-group">
                    <Countries ref="country" class="form-control"name="restCountry" empty=" -- Select country --" flags = {true } onChange={this.onChange} /><br/>

                </div>

                <div class="form-group">
                    <input type = "text" class="form-control" name="restType" placeholder="Restaurant Type"
                        onChange = {this.onChange}/> <br/> 
                </div>
                <div class="form-group">
                    <input type = "text" name="startTime" class="form-control" placeholder="Start Time"
                        onChange = {this.onChange}/> <br/>
                </div>
                <div class="form-group">
                    <input type = "text" name="endTime" class="form-control" placeholder="End Time"
                        onChange = {this.onChange}/> <br/>
                </div>
                <div> {message} </div>
                <button type = "submit" class="btn btn-primary" > Submit </button>     
        </form>
 
        </div>

    </div>


        )
    }
}


const mapStateToProps = state => ({ 
    user: state.signup.user,
    payload : state.signup.payload
});


export default connect(mapStateToProps, { restaurantSignup })(RestaurantSignUp);