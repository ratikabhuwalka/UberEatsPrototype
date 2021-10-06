import React, { Component } from 'react';
import { Redirect } from 'react-router';
import backendServer from "../webConfig";
import {Modal, Button, Alert, Container, Table } from "react-bootstrap";
import Navigationbar from './NavigationBar.js';
import axios from 'axios';
import moment from 'moment';

class Order extends Component {
    constructor(props) {
        super(props);
        // this.getUserProfile();
        this.getCustomerOrders = this.getCustomerOrders.bind(this);
        this.showModal = this.showModal.bind(this);
        // this.getOrderReceipt = this.getOrderReceipt.bind(this);
        this.state = {
            orders: '',
            receipts : '',
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
       
        this.getCustomerOrders();
       
    };

    getCustomerOrders = () => {
        const params = {
            cust_id : localStorage.getItem('user_id')
        }
        axios.get(`${backendServer}/order/getcustorders`, {params})
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


    getOrderReceipt = (order_id) => {
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

                return (
                    
                        <tr>
                            <td colSpan="4"><h5>{order.RestName}</h5>
                                ${order.Final}
                                <br/> {order.TimeStamp}

                            </td>
                            <td> <a href="#" onClick= {() => this.getOrderReceipt(order.OrderId)}> view receipt </a></td>

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
export default Order;