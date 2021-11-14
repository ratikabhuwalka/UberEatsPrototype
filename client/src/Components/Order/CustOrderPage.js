import React, { Component } from 'react';
import { Redirect } from 'react-router';
import backendServer from "../../webConfig";
import { Modal, Button, Alert, Container, Table, DropdownButton, Dropdown, InputGroup } from "react-bootstrap";
import Navigationbar from '../NavigationBar.js';
import axios from 'axios';
import Paginate from './Pagination';

class Order extends Component {
    constructor(props) {
        super(props);
        // this.getUserProfile();
        this.getCustomerOrders = this.getCustomerOrders.bind(this);
        this.showModal = this.showModal.bind(this);
        this.getOrderReceipt = this.getOrderReceipt.bind(this);
        this.state = {
            orders: [],
            displayOrders: [],
            receipts: '',
            show: false,
            currPage: 1,
            itemsPerPage: 5,
        }
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    componentDidMount() {
        console.log("order page mounted");
        document.title = "Order History";
        this.getCustomerOrders();
    };


    onStatusSelect = (e) => {
        if (this.state && this.state.orders) {
            var filteredList
            if (e.target.text === "Completed") {
                filteredList = this.state.orders.filter(order => order.Status === "DELIVERED" || order.Status === "PICKED UP");
            }
            else if (e.target.text === "New") {
                filteredList = this.state.orders.filter(order => order.Status !== "DELIVERED" && order.Status !== "PICKED UP" && order.Status !== "CANCELLED")
            }
            else if (e.target.text === "Cancelled") {
                filteredList = this.state.orders.filter(order => order.Status === "CANCELLED")
            }
            else {
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
    getCustomerOrders = () => {
        const params = {
            cust_id: localStorage.getItem('user_id')
        }
        var token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get(`${backendServer}/order/getcustorders`, { params })
            .then(response => {
                console.log(response.data)
                if (response.data.response.data[0]) {
                    this.setState({
                        orders: response.data.response.data,
                        displayOrders: response.data.response.data
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    };


    getOrderReceipt = (order_id) => {
        const params = {
            order_id: order_id
        }
        var token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get(`${backendServer}/order/getorderreceipt`, { params })
            .then(response => {
                console.log("response of get receipt", response);
                if (response.data.response.data) {
                    sessionStorage.setItem("receipt", JSON.stringify(response.data.response.data));
                    this.showModal();

                }
            })
            .catch(error => {
                console.log(error);
            })
    };

    updateOrderStatus = (order_id, status) => {
        if (status !== "NEW") {

            alert("Cant cancel order now!")
        }
        else {
            const params = {
                order_id: order_id,
                status: "CANCELLED"
            }
            console.log()
            var token = localStorage.getItem('token')
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.put(`${backendServer}/order/updateorderstatus`, params)
                .then(response => {
                    console.log("response of update status", response)
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
    }

    render() {
        let message = null;
        let orders = [];
        let orderRows = null;
        let receipt_modal = null;
        let receipt_items = []
        const indexOfLastPost = this.state.currPage * this.state.itemsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.itemsPerPage;
        console.log("display orders", this.state.displayOrders)
        console.log("indexes, curr_page",indexOfFirstPost, this.state.currPage )
        const totalOrders = this.state.displayOrders.length
        const itemsPerPage = this.state.itemsPerPage


        const paginate = pageNumber => 
        {
            this.setState({
                currPage : pageNumber
            })
        };
    
        if (sessionStorage.getItem("receipt")) {
            var receipt_main = JSON.parse(sessionStorage.getItem("receipt"))
            console.log(receipt_main)
            var arr = receipt_main.OrderItem;
            console.log(arr);
            for (var receipt of arr) {
                let item = (

                    <tr>
                        <td align="center">{receipt.DishName}</td>
                        <td align="center">$ {receipt.Price}</td>
                        <td align="center">{receipt.Quantity} </td><td></td>
                        <td align="center">$ {receipt.Price * receipt.Quantity}</td>
                    </tr>
                )

                receipt_items.push(item);
            }

            var receipt_table = (
                <Table style={{ width: "90%" }}>
                    <thead align="center">
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th></th>
                        <th>Total Price</th>
                    </thead>
                    <tbody>
                        {receipt_items}
                        <br /><br /><br /><br />
                        <tr>
                            <td colSpan="4">Tax </td>
                            <td align="center">$ {receipt_main.Tax}</td>
                        </tr>
                        <tr>
                            <td colSpan="4">Delivery</td>
                            <td align="center">$ {receipt_main.Delivery}</td>
                        </tr>
                        <tr>
                            <td colSpan="4">Discount</td>
                            <td align="center">$ {receipt_main.Discount}</td>
                        </tr>

                        <tr>
                            <td colSpan="4"><b>Total</b></td>
                            <td align="center"><b>$ {receipt_main.Final}</b></td>
                        </tr>
                        <tr></tr>

                        <tr>
                            <td colSpan="4"><b>Special Instructions</b></td>
                            <td align="center">{receipt_main.Instruction}</td>
                        </tr>


                    </tbody>
                </Table>
            )

        }
 


        receipt_modal = (
            <Modal show={this.state.show} onHide={this.hideModal} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Receipt</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {receipt_table}
                </Modal.Body>
                <Modal.Footer>
                    {/* <input type="number"  name = "quantity"  value = { quantity} defaultValue= {cart_quant} min="0" max="20" step="1" pattern="[0-9]*"  onChange = {e => setQuantity(e.target.value)} />
          
          <Button variant="primary" onClick={addToCart}>
            Add to cart
          </Button> */}
                </Modal.Footer>
            </Modal>);


        if (this.state && this.state.displayOrders) {
            orders = this.state.displayOrders.slice(indexOfFirstPost, indexOfLastPost);

            //orders = this.state.displayOrders;
            if (this.state.displayOrders.length === 0) {
                message = <Alert variant="warning">You do not have any orders made in the past.</Alert>
            }
            if (orders.length > 0) {

                orderRows = orders.map(order => {

                    return (

                        <tr>
                            <td><h5>{order.RestName}</h5></td>
                            <td>Mode Selected <br /><b>{order.OrderType}</b></td>
                            <td>Final Price<br /><b>${order.Final}</b></td>
                            <td>Time <br /><b>{order.Timestamp}</b></td>
                            <td>Status <br /><b>{order.Status}</b></td>
                            <td><Button variant='danger' size="sm" onClick={() => this.updateOrderStatus(order._id, order.Status, order.OrderType)}>
                                Cancel Order </Button>
                                {/* <Button variant = 'primary' onClick= {() => this.getOrderReceipt(order.OrderId)}> View Receipt </Button> */}
                            </td>
                            <td> <a href="#" onClick={() => this.getOrderReceipt(order._id)}> view receipt </a></td>

                        </tr>
                    );

                });
            }

            // // paginate
            // this.state.displayOrders.splice()


        }
        else {
            message = <Alert variant="warning">You do not have any orders made in the past.</Alert>
        }
        return (
            <div>
                <Navigationbar />

                <Container>
                    <h3>Your past orders</h3>
                    {message}
                    <div>
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
                    </div>
                    <br />
                    <div>
                        <Table style={{ width: "90%" }}>
                            <tbody>
                                {orderRows}

                            </tbody>
                        </Table>
                        
                    </div>
                    <center>
                    
                        <Button href="/customerHome">Home</Button>
                    </center>

                </Container>
                {receipt_modal}
                <Paginate postPerPage={itemsPerPage} totalPost={totalOrders} paginate={paginate}/>

            </div>
        )
    }
}
export default Order;