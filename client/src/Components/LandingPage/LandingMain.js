import Panel from './Panel';
import './Header.css'
import NavigationBar from '../NavigationBar';
import { Redirect } from 'react-router';




const LandingMain = () => {
    var redirectVar = null
    console.log(localStorage.getItem("user_id"), localStorage.getItem("is_owner"))
    if(localStorage.getItem("user_id")){

        if(localStorage.getItem("is_owner")==='false'){
            console.log("customer redirect")
            redirectVar = <Redirect to="/customerHome"/>
        }
        else{
            console.log("restaurant redirect")
            redirectVar = <Redirect to="/restaurant"/>
        }
    }
    return (<>
        {redirectVar}
        <div className="Landing" >
            <NavigationBar/>
           <Panel />                   
       </div>
    
    </>)
}

export default LandingMain 
