import Header from './Header'
import Panel from './Panel';
import './Header.css'
import NavigationBar from '../NavigationBar';



const LandingMain = () => {
    return (
        <div className="Landing" >
            <NavigationBar/>
           <Panel />            
       </div>
    )
}

export default LandingMain 
