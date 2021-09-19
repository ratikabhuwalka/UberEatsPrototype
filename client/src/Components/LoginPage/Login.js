import React, { useState } from 'react'
import Axios from 'axios'

const Login = props => {

    const [restPass, setRestPass] = useState('')
    const [restEmail, setRestEmail] = useState('')

    const login = () => {
        Axios.get('http://localhost:3001/restaurant',{
            restPass : restPass,
            restEmail : restEmail
        }).then((response)=>{
            console.log(response);
        });
    }


    return (
        <div className ='base-container'>
            <h1> Login </h1>
            <form className = "login-form">
                <input type = "email" name="restEmail" placeholder="Restaurant Email"
                    onChange = { (e)=>{
                        setRestEmail(e.target.value)
                    }}/> <br/>
                <input type = "password" name="restPass" placeholder="Restaurant Password"
                    onChange = { (e)=>{
                        setRestPass(e.target.value)
                    }}/> <br/>

                <button type = "submit" onClick= {login}> Submit </button>     

            </form>
        </div>
    )
}

Login.propTypes = {

}

export default Login
