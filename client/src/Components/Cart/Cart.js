import React, { Component } from 'react';
import { Redirect } from 'react-router';
import backendServer from "../../webConfig"
import { Button, Alert, Container, Table, Card, ListGroup, ListGroupItem} from "react-bootstrap";
import { Link } from "react-router-dom";
import NavigationBar from '../NavigationBar';
import axios from 'axios';
import deleteIcon from "../../images/delete.jpg";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: []
        };
        
        this.emptyCart = this.emptyCart.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
   
   
   
    }

    componentDidMount() {
        let cart = []
        if (localStorage.getItem("cart")) {
            cart.push(...JSON.parse(localStorage.getItem("cart")));
            this.setState({
                cart: cart
            });
        this.getRestaurantDetails();

        }
        }

    getRestaurantDetails = () => {
        let rest_id;
        let temp_cart = [];

        if(localStorage.getItem("cart") )
        {   temp_cart = JSON.parse(localStorage.getItem("cart"))
            if(temp_cart.len!==0)
            {            
                rest_id = temp_cart[0].RestId
                axios.get(`${backendServer}/restaurant/getRestaurant?rest_id=${rest_id}`)
                    .then(response => {
                        console.log("response get rest by id", response);
                        if (response.data) {
                            this.setState({
                                restaurant: response.data
                            });
                        }
                    })
                    .catch(error => {
                        if (error.response && error.response.data) {
                        }
                    })
            }
        }
    };

    onQuantityChange = (e) => {
        let item_id = e.target.name;
        let newQuantity = parseInt(e.target.value);
        let cart = this.state.cart;
        console.log("cart, item_id", cart, item_id);
        let index = cart.findIndex((cart_item => cart_item.DishId === item_id));
        cart[index].DishQuantity = newQuantity;
        this.setState({
            cart: cart
        });
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    deleteItem = (e) => {
        let item_id = e.target.name;
        let cart = this.state.cart;
        let index = cart.findIndex((cart_item => cart_item.DishId === item_id));
        cart.splice(index, 1);
        this.setState({
            cart: cart
        });
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    calculateSubTotal = () => {
        let cart = this.state.cart;
        let subTotal = 0;
        for (var i = 0; i < cart.length; i++) {
            subTotal += (cart[i].DishQuantity * cart[i].DishPrice);
         
        }
        subTotal = subTotal.toFixed(2);
        return subTotal;
    };

    emptyCart = () => {
        localStorage.removeItem("cart");
        this.setState({
            cart: []
        });
    };

    render() {
        let redirectVar = null,
            itemsRender = [],
            message = null,
            restName, restCity,restCountry,
            restaurantDetails = null, discountAmount = null, deliveryAmount = null;

        if(this.state && this.state.restaurant){
            restName = this.state.restaurant.RestName;
            restCity = this.state.restaurant.RestCity;
            restCountry = this.state.restaurant.RestCountry;

            console.log("rest data:", this.state.restaurant)

        }

        let discount = 20,
            delivery = 6,
            tax = 9.25;

        if (!localStorage.getItem("user_id") || localStorage.getItem("is_owner") === "true") {
            redirectVar = <Redirect to="/" />
        }

        // if (this.state && this.state.restaurant) {
        //     resName = this.state.restaurant.res_name;
        //     resAddress = this.state.restaurant.address;
        //     resZIP = this.state.restaurant.res_zip_code;
        // }

        if (this.state && this.state.cart.length === 0) {
            message =
                [<center><Alert variant="warning">You haven't added any items to your cart. Please add your favorite items.</Alert><br />
                    <Button href="/customerHome">Home</Button></center>
                ]
        }
        else {
            
            message = <Alert variant="info">Make a purchase of worth $100 or more and get a discount of {discount}% and free delivery!</Alert>;
            restaurantDetails = (
                <Card style={{ width: "60rem", margin: "2%" }}>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem><h3>{restName}</h3></ListGroupItem>
                        <ListGroupItem>{restCity} | {restCountry}</ListGroupItem>
                    </ListGroup>
                </Card>
            );
            let cart = this.state.cart;
            var subTotal = this.calculateSubTotal(cart);
            if (subTotal < 100) {
                discount = 0;
                deliveryAmount = (
                    <tr>
                        <td colSpan="4">Delivery Charges</td>
                        <td align="center">$ {delivery.toFixed(2)}</td>
                    </tr>
                );
            }
            else {
                delivery = 0;
                message = <Alert variant="success">Congrats! Your purchase is eligible for a discount of {discount}% and free delivery!</Alert>;
                discountAmount = (<tr>
                    <td colSpan="4">Discounts ({discount}%)</td>
                    <td align="center">$ {(subTotal * discount / 100).toFixed(2)}</td>
                </tr>);
            }
            var total = ((subTotal * (100 + tax - discount) / 100) + delivery).toFixed(2);
            for (var i = 0; i < cart.length; i++) {
                let item = (
                    <tr>
                        <td align="center">{cart[i].DishName}</td>
                        <td align="center">$ {cart[i].DishPrice}</td>
                        <td align="center">
                            <input type="number" name={cart[i].DishId} min="1" width="10%" onChange={this.onQuantityChange} defaultValue={cart[i].DishQuantity}></input>
                        </td>
                        <td align="center">
                            <Button variant="link" name={cart[i].DishId}>
                                <img src={deleteIcon} width="15" name={cart[i].DishId} onClick={this.deleteItem} alt="" />
                            </Button>
                        </td>
                        <td align="center">$ {cart[i].DishPrice * cart[i].DishQuantity}</td>
                    </tr>
                );
                itemsRender.push(item);
            }
            var orderDetails = {restaurant: this.state.restaurant, subTotal: subTotal, delivery: delivery, discount: discount, tax: tax, total: total, cart: this.state.cart};
            var cartTable = (
                <div>
                    <Table style={{ width: "90%" }}>
                        <thead align="center">
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th></th>
                            <th>Total Price</th>
                        </thead>
                        <tbody>
                            {itemsRender}
                            <br /><br /><br /><br />
                            <tr>
                                <td colSpan="4"><b>Sub Total</b></td>
                                <td align="center"><b>$ {subTotal}</b></td>
                            </tr>
                            <tr>
                                <td colSpan="4">Tax ({tax}%)</td>
                                <td align="center">$ {(subTotal * tax / 100).toFixed(2)}</td>
                            </tr>
                            {discountAmount}
                            {deliveryAmount}
                            <tr>
                                <td colSpan="4"><b>Total</b></td>
                                <td align="center"><b>$ {total}</b></td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button variant="warning" onClick={this.emptyCart}>Clear Cart</Button> &nbsp; &nbsp;
                    <Button variant="primary" href="/customerHome">Save for Later</Button> &nbsp; &nbsp;
                    <Link to={{pathname: "/checkout", state: orderDetails}}>
                        <Button variant="success">Proceed to Checkout</Button>
                    </Link>
                </div>
            );
        }

        return (
            <div>
                {redirectVar}
                <NavigationBar /><br />
                <Container>
                    <h3>Your Cart</h3><br />
                    <center>
                        {message}
                        {restaurantDetails}
                        {cartTable}
                        <br /><br />
                    </center>
                </Container>

            </div>
        )
    }
}

export default Cart;