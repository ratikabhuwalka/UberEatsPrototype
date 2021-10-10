import React from 'react';
import { Link } from "react-router-dom";
import {  Modal, Button, Col, Row } from "react-bootstrap";
import Axios from 'axios'


import './Card.css'
function Card({ res}) {
    
    res =res.restaurant
    var rest_name=res.RestName
    var rest_id=res.RestId 
    var rest_contact=res.RestPhone
    var rest_start = res.StartTime
    var rest_end = res.EndTime
    var src= res.RestImage
    console.log(src);

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
            window.location.reload(false);
        }
    }

    function FavButton(){
        let favourites = []
        if(localStorage.getItem("favourites")){
             favourites.push(...JSON.parse(localStorage.getItem("favourites")));
        }
        let index = favourites.findIndex((rest => rest.RestId === rest_id));
            console.log(index)
            if (index !== -1) {
                return(
                <div>
                    <Button variant='success' name='res'>Favourite</Button>
                </div>
                )
            }
            else{
                return(<div>
                    <Button variant='warning' name='res' onClick={addToFav}>Add to Favourite</Button>
                </div>)

            }
        }


    return (<>
        
        <div className='card'>
        <Link to={{pathname: '/restaurant', state : res }} style={{ textDecoration: 'none' }}>
            <img src={src} alt="" width="300" height="250" /> 
            <div className="card__info">
                <h2>{rest_name}</h2>
                <h3>{rest_contact}</h3>
                <h4>{rest_start} - {rest_end}</h4>
            </div>
        </Link>

            {FavButton()}
        </div>
        
        </>
    )
}

export default Card