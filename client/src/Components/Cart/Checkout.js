import React, { Component } from 'react';
import { Redirect } from 'react-router';
import backendServer from "../../webConfig";
import { Button, Alert, Container, Table, Card } from "react-bootstrap";
import Navigationbar from '../NavigationBar.js';
import axios from 'axios';

class Checkout extends Component {
    constructor(props) {
        super(props);

        // this.getUserProfile();
        // this.placeOrder = this.placeOrder.bind(this);
    }

    componentWillMount() {
        document.title = "Your Order";
        if (this.props.location.state) {
            this.setState({
                restaurant: this.props.location.state.restaurant,
                cart_items: this.props.location.state.cart_items,
                discount: this.props.location.state.discount,
                delivery: this.props.location.state.delivery,
                tax: this.props.location.state.tax,
                sub_total: this.props.location.state.subTotal,
                total: this.props.location.state.total
            });
        }
    };

    // getUserProfile = () => {
    //     axios.get(`${backendServer}/grubhub/profile/customer/${localStorage.getItem("user_id")}`)
    //     .then(response => {
    //         if(response.data[0]){
    //             this.setState({
    //                 address: response.data[0].address,
    //                 phone_number: response.data[0].phone_number
    //             });
    //         }
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })
    // };

    // placeOrder = (e) => {

    //     let data = {
    //         user_id: localStorage.getItem("user_id"),
    //         res_id: this.state.restaurant.RestId,
    //         order_status: 'ORDER_PLACED',
    //         sub_total: this.state.sub_total,
    //         discount: (this.state.discount * this.state.sub_total / 100).toFixed(2),
    //         delivery: this.state.delivery,
    //         tax: (this.state.tax * this.state.sub_total / 100).toFixed(2),
    //         total: this.state.total,
    //         cart_items: this.state.cart_items
    //     }

    //     axios.post(`${backendServer}/grubhub/cart/placeorder`, data)
    //         .then(response => {
    //             if (response.data.status === "ORDER_PLACED") {
    //                 localStorage.removeItem("cart_items");
    //                 localStorage.removeItem("cart_res_id");
    //                 this.setState({
    //                     message: response.data.status
    //                 });
    //             }
    //         })
    //         .catch(error => {
    //             this.setState({
    //                 message: "ORDER_ERROR"
    //             });
    //         });
    // };

    render() {
        let redirectVar = null,
            order = null,
            message = null;

        if (!localStorage.getItem("user_id") || localStorage.getItem("is_owner") === "true") {
            redirectVar = <Redirect to="/" />
        }
        if (this.state.message === "ORDER_PLACED") {
            redirectVar = <Redirect to="/orders" />
        }
        else if (this.state.message === "ORDER_ERROR") {
            message = <Alert variant="warning">There was some error processing your order!</Alert>
        }
        else if (!localStorage.getItem("cart_items") || localStorage.getItem("cart_items").length === 0) {
            redirectVar = <Redirect to="/cart" />
        }

        if (this.state) {
            order = (
                <div>
                    <Card style={{width: "40rem", height: "35rem"}}>
                        <Card.Title>
                            <br />
                            <h3>{this.state.restaurant.RestName}</h3>
                            {this.state.restaurant.RestCity} | {this.state.restaurant.RestCountry}
                        </Card.Title>
                        <Card.Body>
                            <Table style={{ width: "90%" }}>
                                <tbody>
                                    <tr>
                                        <td colSpan="4">Your purchase</td>
                                        <td align="center">$ {this.state.sub_total}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4">Tax ({this.state.tax}%)</td>
                                        <td align="center">$ {(this.state.sub_total * this.state.tax / 100).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4">Discounts ({this.state.discount}%)</td>
                                        <td align="center">$ {(this.state.sub_total * this.state.discount / 100).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4">Delivery Charges</td>
                                        <td align="center">$ {this.state.delivery.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4"><b>Total</b></td>
                                        <td align="center"><b>$ {this.state.total}</b></td>
                                    </tr>
                                    <br/>
                                    <tr>
                                        <td colSpan="4">Delivery Address</td>
                                        <td align="center">{this.state.address}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4">Contact Number</td>
                                        <td align="center">{this.state.phone_number}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <center>
                                <Button variant="success" onClick={this.placeOrder}>Confirm Order</Button>&nbsp; &nbsp;
                                <Button variant="secondary" href="/home">Cancel</Button>
                            </center>
                            <br />
                        </Card.Body>
                    </Card>
                    <br />
                    <Button variant="info" href="/cart">Back to Cart</Button>
                </div>
            );
        }

        return (
            <div>
                {redirectVar}
                <Navigationbar /> <br />
                <Container>
                    <h3>Confirm your Order </h3>
                    <center>
                        {message}
                        {order}
                        <br /><br />
                    </center>
                </Container>
            </div >
        )
    }
}
export default Checkout;