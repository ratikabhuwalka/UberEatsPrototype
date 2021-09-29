import React from 'react';
import { Link } from "react-router-dom";
import './Card.css'

function Card({ res}) {
    var src= 'https://1000logos.net/wp-content/uploads/2021/04/Uber-Eats-logo-500x281.png'
    res =res.restaurant
    var title=res.RestName
    var description=res.RestId 
    var price=res.RestPhone

    return (
        <Link to={{pathname: '/restaurant', state : res }}>
        <div className='card'>
            <img src={src} alt="" />
            <div className="card__info">
                <h2>{title}</h2>
                <h4>{description}</h4>
                <h3>{price}</h3>
            </div>
        </div>
        </Link>
    )
}

export default Card