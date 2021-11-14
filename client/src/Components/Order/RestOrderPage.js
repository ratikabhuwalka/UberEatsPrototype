import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backendServer from "../../webConfig";
import {Button, Alert, Container, Table, Dropdown, DropdownButton,InputGroup } from "react-bootstrap";
import Navigationbar from '../NavigationBar.js';
import axios from 'axios';
import Paginate from './Pagination';


class RestOrder extends Component {
    constructor(props) {
        super(props);
        // this.getUserProfile();
        this.getRestaurantOrders = this.getRestaurantOrders.bind(this);
        this.updateOrderStatus = this.updateOrderStatus.bind(this);
        this.showModal = this.showModal.bind(this);
        // this.getOrderReceipt = this.getOrderReceipt.bind(this);
        this.state = {
            orders: [],
            displayOrders:[],
            receipts : '',
            order_status: '',
            show: false,
            currPage: 1,
            itemsPerPage: 5,
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
        var token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get(`${backendServer}/order/getrestorders`, {params})
        .then(response => {
            console.log("response of restorders",response.data.response.data);
            if(response.data.response.data[0]){
                this.setState({
                    orders: response.data.response.data,
                    displayOrders : response.data.response.data
                });
            }
        })
        .catch(error => {
            console.log(error);
        })
    };


    
    updateOrderStatus = (order_id, status, order_type) => {
        console.log(status)
        if(status === 'CANCELLED')
        {
            alert("Cannot perform this operation. Order is cancelled");
        } 
        else if(status === 'DELIVERED' || status === 'PICKED UP')
        {
            alert("Order is already completed");
        } 
        else{
            if(status === 'Cancel'){
                console.log("inside cancel if")
                status = 'CANCELLED'
            }
            else if(order_type ==='Delivery'){
                if(status==='NEW'){
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
                if(status==='NEW'){
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
            console.log("params for update order status", params)
            axios.put(`${backendServer}/order/updateorderstatus`, params)
            .then(response => {
                console.log("response of update status",response)
                if (response.data.status_code === 200) {
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
            filteredList = this.state.orders.filter(order => order.Status!== "DELIVERED" && order.Status!== "PICKED UP" && order.Status!== "CANCELLED" )
        }
        else if(e.target.text === "Cancelled") {
            filteredList = this.state.orders.filter(order => order.Status=== "CANCELLED")
        }
        else{
            filteredList = this.state.orders
        }
        this.setState({
            displayOrders: filteredList
            });
        }
    }

    onItemChange = (e) => {
        if(this.state && this.state.currPage){
            this.setState({
                itemsPerPage : parseInt(e.target.text)
            })
        }
    }

    getOrderStatus = (order_id) => {
        const params = {
            order_id : order_id
        }
        var token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
    const indexOfLastPost = this.state.currPage * this.state.itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.itemsPerPage;
    const totalOrders = this.state.displayOrders.length
    const itemsPerPage = this.state.itemsPerPage

    const paginate = pageNumber => 
    {
        this.setState({
            currPage : pageNumber
        })
    };
    

    if (this.state && this.state.displayOrders) {
        if(this.state.displayOrders.length===0){
        message = <Alert variant="warning">You do not have any orders made in the past.</Alert>}
        orders = this.state.displayOrders.slice(indexOfFirstPost, indexOfLastPost);
        if (this.state.displayOrders.length === 0) {
            message = <Alert variant="warning">You do not have any orders made in the past.</Alert>
        }
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
                                                    
                            <td><Button variant ='success' size="sm" onClick= {() => this.updateOrderStatus(order._id, status, order.OrderType)}> 
                            Update Status </Button>
                            {/* <Button variant = 'primary' onClick= {() => this.getOrderReceipt(order.OrderId)}> View Receipt </Button> */}
                            </td>
                            <td><Button variant ='danger' size="sm" onClick= {() => this.updateOrderStatus(order._id, "Cancel", order.OrderType)}> 
                           Cancel Order </Button>
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
                                className="d-inline mx-2"
                                as={InputGroup.Append}
                                variant="outline-secondary"
                                title="Order Status"
                                id="input-group-dropdown-2">
                                <Dropdown.Item onClick={this.onStatusSelect}>New</Dropdown.Item>
                                <Dropdown.Item onClick={this.onStatusSelect}>Completed</Dropdown.Item>
                                <Dropdown.Item onClick={this.onStatusSelect}>Cancelled</Dropdown.Item>
                                <Dropdown.Item onClick={this.onStatusSelect}>All</Dropdown.Item>

                </DropdownButton>

                <DropdownButton
                        className="d-inline mx-2"
                        as={InputGroup.Append}
                        variant="outline-secondary"
                        title="Items per Page"
                        id="input-group-dropdown-2">
                        <Dropdown.Item onClick={this.onItemChange}>2</Dropdown.Item>
                        <Dropdown.Item onClick={this.onItemChange}>5</Dropdown.Item>
                        <Dropdown.Item onClick={this.onItemChange}>10</Dropdown.Item>

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
                <Paginate postPerPage={itemsPerPage} totalPost={totalOrders} paginate={paginate}/>

                </div>
               

            </Container>
        </div>
    )
}
}

export default RestOrder;