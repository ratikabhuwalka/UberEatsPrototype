import React, { Component } from 'react';
import { Redirect } from 'react-router';
import backendServer from "../../webConfig";
import {Modal, Button, Alert, Container, Table } from "react-bootstrap";
import Navigationbar from '../NavigationBar.js';
import axios from 'axios';
import moment from 'moment';

class RestOrder extends Component {
    constructor(props) {
        super(props);
        // this.getUserProfile();
        this.getRestaurantOrders = this.getRestaurantOrders.bind(this);
        this.updateOrderStatus = this.updateOrderStatus.bind(this);
        this.showModal = this.showModal.bind(this);
        // this.getOrderReceipt = this.getOrderReceipt.bind(this);
        this.state = {
            orders: '',
            receipts : '',
            order_status: '',
            show: false
          }

    }
    showModal = () => {
        this.setState({show : true});
    };
    
    hideModal = () => {
        this.setState({show : false});
    };



    componentDidMount() {
        console.log("order page mounted");
        document.title = "Order History";
    
        this.getRestaurantOrders();
       
    };


    getRestaurantOrders = () => {
        const params = {
            rest_id : localStorage.getItem('user_id')
        }
        axios.get(`${backendServer}/order/getrestorders`, {params})
        .then(response => {
            if(response.data[0]){
                this.setState({
                    orders: response.data
                });
            }
        })
        .catch(error => {
            console.log(error);
        })
    };


    
    updateOrderStatus = (order_id, status) => {
        if(status === 'DELIVERED' || status === 'PICKED UP')
        {
            alert("Order is already completed");
        } 
        else{
            if(localStorage.getItem('rest_type') && localStorage.getItem('rest_type') ==='Delivery'){
           
                if(status==='ORDER PLACED'){
                    status = 'PREPARING';
                }
                else if(status==='PREPARING'){
                    status = 'ON THE WAY';
                }
                else if(status==='ON THE WAY'){
                    status = 'DELIVERED';
                }
            }

            const params = {
                order_id : order_id,
                status : status
            }
            axios.put(`${backendServer}/order/updateorderstatus`, params)
            .then(response => {
                console.log(response);
                if (response.data === "DISH UPDATED") {
                    window.location.reload();
                    alert("Dish Updated!")
                }
    
            })
            .catch(error => {
                this.setState({
                    message: "ERROR"
                });
            });
        }
        
       
    };


    getOrderStatus = (order_id) => {
        const params = {
            order_id : order_id
        }
        axios.get(`${backendServer}/order/getorderreceipt`, {params})
        .then(response => {
            if(response.data[0]){
                
                this.setState({ 
                    receipts: response.data
                });
                console.log(this.state.receipts);
                this.showModal();

            }
        })
        .catch(error => {
            console.log(error);
        })
    };

    
    
    render() {
    let message = null;
    let orders = [];
    let orderRows = null;
    let receipt_modal = null;
    let receipt_items = null;
    if (this.state && this.state.receipts) {
        var arr = JSON.parse(this.state.receipts);
        
        receipt_items = arr.map(receipt => {
            return (
                  receipt
            );
        });
    }

    receipt_modal = (
        <Modal show={this.state.show} onHide={this.hideModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {receipt_items}
        </Modal.Body>
        <Modal.Footer>
        {/* <input type="number"  name = "quantity"  value = { quantity} defaultValue= {cart_quant} min="0" max="20" step="1" pattern="[0-9]*"  onChange = {e => setQuantity(e.target.value)} />
          
          <Button variant="primary" onClick={addToCart}>
            Add to cart
          </Button> */}
        </Modal.Footer>
      </Modal>);
    

    if (this.state && this.state.orders) {
        orders = this.state.orders;
        if (orders.length > 0) {
            orderRows = orders.map(order => {
                let status = order.Status;
                return (
                        <tr>
                            <td colSpan="4"><h5>{order.CustName}</h5>
                                ${order.Final}{} {order.TimeStamp} {" "}{status}

                            </td>
                            <td><Button variant ='success' onClick= {() => this.updateOrderStatus(order.OrderId, status )}> Update Order Status </Button>
                            {"    "}<Button variant = 'primary' onClick= {() => this.getOrderReceipt(order.OrderId)}> View Receipt </Button>
                            {"    "}<Button variant = "info" onClick= {() => this.getOrderReceipt(order.OrderId)}> View Customer Profile </Button>

                            </td>

                        </tr>
                     
                        
                );

            });
        }

        
    }
    else {
        message = <Alert variant="warning">You do not have any orders made in the past.</Alert>
    }
    return (
        <div>
            <Navigationbar/>
            <Container className="justify-content">
                <h3>Your past orders</h3>
                {this.receipt_modal}
                {message}
                <br/>
                <div>
                <Table style={{ width: "90%" }}>
                    <tbody>
                    {orderRows}
                    </tbody>
                </Table>
                </div>
                <center>
                    <Button href="/home">Home</Button>
                </center>

            </Container>
            {receipt_modal}
        </div>
    )
}
}

export default RestOrder;