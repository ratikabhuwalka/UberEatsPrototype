import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backendServer from "../../webConfig";
import {Button, Alert, Container, Table, Dropdown, DropdownButton,InputGroup } from "react-bootstrap";
import Navigationbar from '../NavigationBar.js';
import axios from 'axios';

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
                    orders: response.data,
                    displayOrders : response.data
                });
            }
        })
        .catch(error => {
            console.log(error);
        })
    };


    
    updateOrderStatus = (order_id, status, order_type) => {
        

        if(status === 'DELIVERED' || status === 'PICKED UP')
        {
            alert("Order is already completed");
        } 
        else{
            if(order_type ==='Delivery'){
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

            else{
                if(status==='ORDER PLACED'){
                    status = 'PREPARING';
                }
                else if(status==='PREPARING'){
                    status = 'PICKUP READY';
                }
                else if(status==='PICKUP READY'){
                    status = 'PICKED UP';
                }    
                
            }

            const params = {
                order_id : order_id,
                status : status
            }
            axios.put(`${backendServer}/order/updateorderstatus`, params)
            .then(response => {
                if (response.data === "DISH UPDATED") {
                    window.location.reload();
                }
    
            })
            .catch(error => {
                this.setState({
                    message: "ERROR"
                });
            });
        }
        
       
    };

    onStatusSelect = (e) => {
        if (this.state && this.state.orders){
        var filteredList
        if(e.target.text === "Completed"){
            filteredList = this.state.orders.filter(order => order.Status=== "DELIVERED" || order.Status=== "PICKED UP");
        }
        else if(e.target.text === "New") {
            filteredList = this.state.orders.filter(order => order.Status!== "DELIVERED" && order.Status!== "PICKED UP")
        }
        else{
            filteredList = this.state.orders
        }
        this.setState({
            displayOrders: filteredList
            });
        }
    }

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

    
    

    if (this.state && this.state.displayOrders) {
        if(this.state.displayOrders.length===0){
        message = <Alert variant="warning">You do not have any orders made in the past.</Alert>}
        orders = this.state.displayOrders;
        if (orders.length > 0) {
            orderRows = orders.map(order => {
                let status = order.Status;
                return (<>
                        <tr>
                            <td><h5>{order.CustName}</h5></td>
                     
                            <td>Mode Selected <br/><b>{order.OrderType}</b></td>
                            <td>Final Price<br/><b>${order.Final}</b></td> 
                            <td>Time <br/><b>{order.Timestamp}</b></td>
                            <td>Status <br/><b>{status}</b></td>
                                                    
                            <td><Button variant ='success' size="sm" onClick= {() => this.updateOrderStatus(order.OrderId, status, order.OrderType)}> 
                            Update Status </Button>
                            {/* <Button variant = 'primary' onClick= {() => this.getOrderReceipt(order.OrderId)}> View Receipt </Button> */}
                            </td>
                            <br/>
                            <td><Link to={{pathname: "/customerProfile", props:{cust_id:order.CustId}}}><Button variant = "info" size="sm"> View Customer Profile </Button></Link></td>

                           
                        </tr>
                        </>                     
                        
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
                <h3>Order History<br/></h3>
                <DropdownButton
                                as={InputGroup.Append}
                                variant="outline-secondary"
                                title="Order Status"
                                id="input-group-dropdown-2">
                                <Dropdown.Item onClick={this.onStatusSelect}>New</Dropdown.Item>
                                <Dropdown.Item onClick={this.onStatusSelect}>Completed</Dropdown.Item>
                                <Dropdown.Item onClick={this.onStatusSelect}>All</Dropdown.Item>

                </DropdownButton>

                {/* {this.receipt_modal} */}
                {message}
                <br/>
                <div>
                <Table style={{ width: "90%" }}>
                    <tbody>
                    {orderRows}
                    </tbody>
                </Table>
                </div>
               

            </Container>
        </div>
    )
}
}

export default RestOrder;