import React from 'react';
import { Link } from "react-router-dom";
import {  Modal, Button, Col, Row } from "react-bootstrap";
import Axios from 'axios'


import './Card.css'
function Card({ res}) {
    var src= 'https://1000logos.net/wp-content/uploads/2021/04/Uber-Eats-logo-500x281.png'
    res =res.restaurant
    var rest_name=res.RestName
    var rest_id=res.RestId 
    var rest_contact=res.RestPhone
    var rest_start = res.StartTime
    var rest_end = res.EndTime


    const postFav = (cust_id, rest_id) => {
        Axios.post('http://localhost:3001/restaurant/addFav',{
           cust_id: cust_id,
           rest_id : rest_id
        }).then((response)=>{
            console.log(response);
        });
    }

    const addToFav = () => {
        //let item_id = this.props.menu_item.item_id;
        let favourites = [];

        if (!localStorage.getItem("user_id") && localStorage.getItem("is_owner")){
            alert("Login to continue")
        } 
        else{

            const cust_id = localStorage.getItem("user_id")

            if (localStorage.getItem("favourites")){
                favourites.push(...JSON.parse(localStorage.getItem("favourites")));

            }
        
            else  {
                localStorage.setItem("favourites", favourites);
            }
    
            console.log(favourites);
            let index = favourites.findIndex((rest => rest.RestId === rest_id));
            console.log(index)
            if (index === -1) {
                let rest_ = {
                    'RestId': rest_id,
                    'RestName': rest_name,
                    'RestPhone': rest_contact,
                    'StartTime': rest_start,
                    'EndTime': rest_end
                }
                favourites.push(rest_);
                localStorage.setItem("favourites", JSON.stringify(favourites));

                postFav(cust_id, rest_id);

                
            }
        }
    }
    return (<>
        
        <div className='card'>
        <Link to={{pathname: '/restaurant', state : res }}>
            <img src={src} alt="" /> 
        </Link>
            <div className="card__info">
                <h2>{rest_name}</h2>
                <h3>{rest_contact}</h3>
                <h4>{rest_start} - {rest_end}</h4>
            </div>

        <div>
            <Button variant='primary' name='res' onClick={addToFav}>Save</Button>
        </div>
        </div>
        
        </>
    )
}

export default Card