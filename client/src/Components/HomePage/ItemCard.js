import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Card.css'
import { Modal, Button, Input } from 'react-bootstrap';
import axios from 'axios';
import backendServer from "../../webConfig";


function ItemCard({ res}) {
    var img= 'https://1000logos.net/wp-content/uploads/2021/04/Uber-Eats-logo-500x281.png'
    console.log(res)
    res=res.item
    res.img = img
    var dish_id = res.DishId
    var title=res.DishName
    var description=res.Description 
    var price=res.Price


    const [show, setShow] = useState(false);
    let cart = [];
    let cart_quant = 0;
    const handleClose = () => {setShow(false);}
    const handleShow = () => setShow(true);
    const [quantity, setQuantity] = useState(cart_quant);

    useEffect(() => {
        
        if (localStorage.getItem("cart")){
            cart.push(...JSON.parse(localStorage.getItem("cart")));
        }
        let index = cart.findIndex((dish => dish.DishId === res.DishId))
        if (index !== -1)
        {
            cart_quant = cart[index].DishQuantity
        }
        console.log("cart quantity:" + cart_quant);
        setQuantity(cart_quant);



      }, []);


    const deleteItem = () =>
    {
        axios.delete(`${backendServer}/dish/deletedish`, { data: { dish_id: dish_id } })
        .then(response => {
            console.log(response);
            if(response.data==='DISH DELETED'){
                alert("Item Deleted");
                handleClose();

            }
        })
        .catch(error => {
            console.log(error);
        })
    };



    const addToCart = () => {
        //let item_id = this.props.menu_item.item_id;
        let cart = [];
        let item = "";

        if (localStorage.getItem("cart")){
            cart.push(...JSON.parse(localStorage.getItem("cart")));
            if( cart.length !== 0){
            if( cart[0].RestId !== JSON.parse(localStorage.getItem('active_res')).RestId){
                alert("Items already in cart from different restaurant. Removing items")
                localStorage.removeItem("cart")
                cart = []
            } 
        }
        }
    
        else  {
            localStorage.setItem("cart", cart);
        }

        console.log(cart);
        
        let index = cart.findIndex((dish => dish.DishId === res.DishId))
        if (index === -1){
            console.log(res, item)
            item = {
                    'DishId': res.DishId,
                    'DishName': res.DishName,
                    'DishQuantity': quantity,
                    'DishPrice': res.Price,
                    'RestId': res.RestId
                    }
                console.log("Response and cart item:", res, item)

                cart.push(item);
                cart_quant = parseInt(quantity);
            }   
        else{
            cart_quant+= parseInt(quantity)
            cart[index].DishQuantity= cart_quant
            console.log(cart[index])
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Item added to the cart!")
        
    }

    function footer ()
    {
        if(localStorage.getItem('is_owner') === "false")
        {
            return (<>
                <center>
                <input type="number"  name = "quantity"  value = { quantity} defaultValue= {cart_quant} min="0" max="20" step="1" pattern="[0-9]*"  onChange = {e => setQuantity(e.target.value)} />
            
                <Button variant="primary" onClick={addToCart}>
                Add to cart
                </Button>
                </center>
            </>);
        }
        else{
            console.log("In else for owner");
            return (<>
                <center>
                <Link to={{pathname: "/itempage", props:{type:'EDIT', dish_id : dish_id  }}}>
                <Button variant="primary" onClick={addToCart}>
                Edit
                </Button>
                </Link>
                <Button variant="secondary" onClick={deleteItem}>
                Delete
                </Button>
                </center>
            </>);
        }

    };
 

    return (<>
        <div className='card'>
            <img src={img} alt="" onClick = {handleShow} />
            <div className="card__info">
                <h2>{title}</h2>
                <h4>{description}</h4>
                <h3>${price}</h3>
            </div>
        </div>
        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body><img src={img} alt="" /></Modal.Body>
        <Modal.Footer>
        {footer()}
        </Modal.Footer>
      </Modal>
     
    </>)
}

export default ItemCard