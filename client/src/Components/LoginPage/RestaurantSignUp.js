import React, { useState } from "react"
import Axios from 'axios'
//export class SignUp extends React.Component {

    

function RestaurantSignUp(){
    
    const [restName, setRestName] = useState('')
    const [restPass, setRestPass] = useState('')
    const [restEmail, setRestEmail] = useState('')
    const [restPhone, setRestPhone] = useState('')
    const [restCity, setRestCity] = useState('')
    const [restCountry, setRestCountry] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [restType, setRestType] = useState('')

    const signup = () => {
        Axios.post('http://localhost:3001/restaurant',{
            restName : restName,
            restPass : restPass,
            restEmail : restEmail,
            restPhone : restPhone,
            restCity : restCity,
            restCountry : restCountry,
            startTime : startTime,
            endTime : endTime,
            restType : restType
        }).then((response)=>{
            console.log(response);
        });
    }

    return (
        <div className = 'base-container'>
            <h1> Sign Up </h1>
            <form className = "sign-up-form">   
                <input type = "text" name="restName" placeholder="Restaurant Name"
                    onChange = { (e)=>{
                        setRestName(e.target.value)
                    }}/> <br/>
                <input type = "password" name="restPass" placeholder="Restaurant Password"
                    onChange = { (e)=>{
                        setRestPass(e.target.value)
                    }}/> <br/>

                <input type = "email" name="restEmail" placeholder="Restaurant Email"
                    onChange = { (e)=>{
                        setRestEmail(e.target.value)
                    }}/> <br/>
                <input type = "number" name="restPhone" placeholder="Restaurant Phone"
                    onChange = { (e)=>{
                        setRestPhone(e.target.value)
                    }}/> <br/>  
                <input type = "text" name="restCity" placeholder="Restaurant City"
                    onChange = { (e)=>{
                        setRestCity(e.target.value)
                    }}/> <br/>
                <input type = "text" name="restCountry" placeholder="Restaurant Country"
                    onChange = { (e)=>{
                        setRestCountry(e.target.value)
                    }}/> <br/>
                <input type = "text" name="startTime" placeholder="Start Time"
                    onChange = { (e)=>{
                        setStartTime(e.target.value)
                    }}/> <br/>
                 <input type = "text" name="endTime" placeholder="End Time"
                    onChange = { (e)=>{
                        setEndTime(e.target.value)
                    }}/> <br/>
                <input type = "text" name="restType" placeholder="Restaurant Type"
                    onChange = { (e)=>{
                        setRestType(e.target.value)
                    }}/> <br/>
                <button type = "submit" onClick= {signup}> Submit </button>     
            </form>
 
        </div>




// <form>
// <div class="form-row">
//   <div class="form-group col-md-6">
//     <label for="inputEmail4">Email</label>
//     <input type="email" class="form-control" id="inputEmail4" placeholder="Email" />
//   </div>
//   <div class="form-group col-md-6">
//     <label for="inputPassword4">Password</label>
//     <input type="password" class="form-control" id="inputPassword4" placeholder="Password" />
//   </div>
// </div>
// <div class="form-group">
//   <label for="inputAddress">Address</label>
//   <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" />
// </div>
// <div class="form-group">
//   <label for="inputAddress2">Address 2</label>
//   <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
// </div>
// <div class="form-row">
//   <div class="form-group col-md-6">
//     <label for="inputCity">City</label>
//     <input type="text" class="form-control" id="inputCity" />
//   </div>
//   <div class="form-group col-md-4">
//     <label for="inputState">State</label>
//     <select id="inputState" class="form-control">
//       <option selected>Choose...</option>
//       <option>...</option>
//     </select>
//   </div>
//   <div class="form-group col-md-2">
//     <label for="inputZip">Zip</label>
//     <input type="text" class="form-control" id="inputZip" />
//   </div>
// </div>
// <div class="form-group">
//   <div class="form-check">
//     <input class="form-check-input" type="checkbox" id="gridCheck" />
//     <label class="form-check-label" for="gridCheck">
//       Check me out
//     </label>
//   </div>
// </div>
// <button type="submit" class="btn btn-primary">Sign in</button>
// <a href= '/restaurantSignup'> Register as an Owner! </a>
// </form>
        )
    }

export default RestaurantSignUp
