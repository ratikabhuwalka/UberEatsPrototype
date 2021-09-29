import React from 'react';
import { Link } from "react-router-dom";
import './Card.css'

function ItemCard({ res}) {
    var src= 'https://1000logos.net/wp-content/uploads/2021/04/Uber-Eats-logo-500x281.png'
    console.log(res)
    res=res.item
    var title=res.DishName
    var description=res.Price 
    var price=res.Description

    return (
        //<Link to={{pathname: '/restaurant', state : res }}>
        <div className='card'>
            <img src={src} alt="" />
            <div className="card__info">
                <h2>{title}</h2>
                <h4>{description}</h4>
                <h3>{price}</h3>
            </div>
        </div>
       // </Link>
    )
}

export default ItemCard