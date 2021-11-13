import React, { Component } from 'react';
import { Redirect } from 'react-router';
import backendServer from "../../webConfig";
import { Button, Container, Table , DropdownButton, InputGroup, Dropdown} from "react-bootstrap";
import Navigationbar from '../NavigationBar.js';
import axios from 'axios';

class Checkout extends Component {
    constructor(props) {
        super(props);
        // this.getUserProfile();
        this.placeOrder = this.placeOrder.bind(this);
        this.onModeSelect = this.onModeSelect.bind(this);

        this.setState(
            {
                mode: 'Mode'
            }
        )
    }

    componentWillMount() {
        document.title = "Your Order";
        if (this.props.location.state) {
            console.log("props received", this.props.location.state)
            this.setState({
                restaurant: this.props.location.state.restaurant,
                cart_items: this.props.location.state.cart,
                discount: this.props.location.state.discount,
                delivery: this.props.location.state.delivery,
                tax: this.props.location.state.tax,
                sub_total: this.props.location.state.subTotal,
                total: this.props.location.state.total
            });
        }
            this.setState(
                {
                    mode: 'Mode'
                }
             )
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

    placeOrder = (e) => {
        let order_data = {
            custId: localStorage.getItem("user_id"),
            restId: this.state.restaurant._id,
            restName: this.state.restaurant.RestName,
            custName: localStorage.getItem("name"),
            status: 'NEW',
            total: this.state.sub_total,
            discount: (this.state.discount * this.state.sub_total / 100).toFixed(2),
            delivery: this.state.delivery,
            tax: (this.state.tax * this.state.sub_total / 100).toFixed(2),
            final: this.state.total,
            orderType : this.state.mode,
            cartItems : this.state.cart_items,
            deliveryAddress: "dummy data",
            instruction : this.state.instruction

        }

        console.log(order_data);

        axios.post(`${backendServer}/order/placeorder`, order_data)
            .then(response => {
                console.log(response);
                if (response.data.status_code === 200) {
                    localStorage.removeItem("cart");
                    this.setState({
                        message: response.data
                    });
                    alert("ORDER PLACED!")
                }

            })
            .catch(error => {
                this.setState({
                    message: "ORDER ERROR"
                });
            });
    };

    onModeSelect = (e) => {
        this.setState (
            {
                mode : e.target.text
            }
        )
    }


    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        let redirectVar = null,
            order = null,
            restaurant = null,
            mode_dropdown = null;

        if (!localStorage.getItem("user_id") || localStorage.getItem("is_owner") === "true") {
            redirectVar = <Redirect to="/" />
        }
        if (this.state.message === "ORDER PLACED") {
            redirectVar = <Redirect to="/customerOrder" />
        }
        else if (this.state.message === "ORDER ERROR") {
           // message = <Alert variant="warning">There was some error processing your order!</Alert>
        }
        else if (!localStorage.getItem("cart") || localStorage.getItem("cart").length === 0) {
            redirectVar = <Redirect to="/cart" />
        }
        if (this.state && this.state.restaurant){

                if(this.state.restaurant.RestType === 'Both')
                {
                 mode_dropdown = () => {
                    return (
                        <>
                        <Dropdown.Item href="#" onClick={this.onModeSelect}>Delivery</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={this.onModeSelect}>Pickup</Dropdown.Item>
                        </>
                    )
                }
            }
                else{
                    mode_dropdown = () => {
                    return (
                        <>
                        <Dropdown.Item href="#" onClick={this.onModeSelect}>{this.state.restaurant.RestType}</Dropdown.Item>
                        </>
                    )

                }
                }
            }

        if (this.state) {
            restaurant = (
                <div class="col-md-12 col-lg-6 pe-md-4 ">

                    <div style={{width: "40rem", height: "40rem", flex:"1"}}>
                    
                        <div>

                            <br />
                            <h3>{this.state.restaurant.RestName}</h3>
                            {this.state.restaurant.RestCity} | {this.state.restaurant.RestCountry}
                        </div>
                        
                        <div>
                       
                                Contact : {this.state.restaurant.RestPhone} ||
                                Timing : {this.state.restaurant.StartTime} - {this.state.restaurant.EndTime}
                        
                        <center>
                             <img src= "https://india-mahdavi.com/wp-content/uploads/2019/02/india_mahdavi_the-gallery-at-sketch_2014_restaurant_bar_architecture_design_interior-scaled-2000x1334.jpg"
 class="img-fluid" alt = "Restaurant"/>

                            </center>
                        </div>
                        <br/>
                        <Button variant="info" href="/cart">Back to Cart</Button>
                    </div>
                   
                </div>
            );

            
            

            order = (

                <div class="col-md-12 col-lg-6 ps-md-4"> 
                
                <div style={{width: "40rem", height: "35rem", flex:"1"}}>
                    <div>
                        <br />
                        <center> <h3>Final Receipt</h3></center>
                        <br/> <br/>
                    </div>
                    <div>
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
                                <tr>
                                    <td>Select mode of Delivery</td>
                                    <td><DropdownButton as={InputGroup.Append}
                                                        variant="outline-secondary"
                                                        title={this.state.mode}
                                                        id="input-group-dropdown-2">
                                                            {mode_dropdown()}
                                        </DropdownButton>
                                    </td>
                                
                                </tr>
                            </tbody>
                        </Table>
                        <div>
                            <label for="instruction">Special Instructions: </label>
                            <textarea id="instruction" name="instruction" rows="4" cols="50" onChange = {this.onChange}>
                            </textarea>
                        </div>

                        <div>
                          
                        <center>
                            <br/> <br/> <br/> <br/>
                            <Button variant="success" onClick={this.placeOrder}>Confirm Order</Button>&nbsp; &nbsp;
                            <Button variant="secondary" href="/cart">Cancel</Button>
                        </center>
                        
                        </div>
                    </div>
                </div>

                </div>


            );
        }

        return (
            <div>
                {redirectVar}
                <Navigationbar /> <br />
                <Container>
                    <div>
                    <center><h1>Confirm your Order </h1></center> </div>
                        <div style={{display: 'flex', flexDirection: 'row'}} class="row padding">
                            {restaurant}
                            {order}
                        </div>
                </Container>
            </div >
        )
    }
}
export default Checkout;