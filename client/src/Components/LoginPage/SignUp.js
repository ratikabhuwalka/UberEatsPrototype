import React, { useState } from "react"
import Axios from 'axios'
//export class SignUp extends React.Component {

    

function SignUp(){
    
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
        )
    }

export default SignUp
