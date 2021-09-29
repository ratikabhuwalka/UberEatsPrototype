// import React, { Component } from 'react';
// import axios from 'axios';
// import backendServer from "../../webConfig";
// import { Card, Container, Col, Form, Row, Button, Alert } from "react-bootstrap";
// import { Link } from "react-router-dom";

// class RestaurantHome extends Component {
//     constructor(props) {
//         super(props);

//         this.getPendingOrders();
//         this.getRestaurantProfile();
//         this.onStatusChange = this.onStatusChange.bind(this);
//     }

//     getPendingOrders = () => {
//         axios.get(`${backendServer}/grubhub/orders/pendingorders/restaurant/${localStorage.getItem("user_id")}`)
//             .then(response => {
//                 if (response.data[0]) {
//                     this.setState({
//                         pending_orders: response.data
//                     });
//                 }
//             })
//             .catch(err => {
//                 if (err.response && err.response.data) {
//                     this.setState({
//                         message: err.response.data
//                     });
//                 }
//             });
//     };

//     getRestaurantProfile = () => {
//         axios.get(`${backendServer}/grubhub/profile/restaurant/${localStorage.getItem("user_id")}`)
//         .then(response => {
//             if(response.data[0]){
//                 this.setState({
//                     restaurant: response.data[0]
//                 });
//             }
//         })
//         .catch(error => {
//             console.log(error);
//         })
//     };

//     onStatusChange = (e) => {
//         e.preventDefault();
//         let order_id = parseInt(e.target.name);
//         let newStatus = e.target.value;
//         let orders = this.state.pending_orders;
//         let index = orders.findIndex((order => order.order_id === order_id));
//         orders[index].order_status = newStatus;

//         let data = {
//             order_id: order_id,
//             order_status: newStatus
//         };

//         axios.post(`${backendServer}/grubhub/orders/orderstatus`, data)
//             .then(response => {
//                 if (response.data === "STATUS_UPDATED") {
//                     this.setState({
//                         pending_orders: orders,
//                         message: response.data
//                     });
//                 }
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//     };

//     render() {
//         let orders = [];
//         let orderCards = null;
//         let message = null;
//         let statusDropdown;
//         let statusOptions;
//         let statuses = ["ORDER_PLACED", "ORDER_CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED", "ORDER_DECLINED"];
//         let restaurantDetails = null;

//         if (this.state && this.state.message === "NO_PENDING_ORDERS") {
//             message = (
//                 <Alert variant="warning">You do not have any pending orders.</Alert>
//             );
//         }
//         else if (this.state && this.state.message === "STATUS_UPDATED") {
//             message = (
//                 <Alert variant="success">Order Status Updated</Alert>
//             );
//         }
//         let loc = Location.pathname;

//         console.log(loc);

//         if(this.state && this.state.restaurant){
//             let restaurant = this.state.restaurant;
//             let resImageSrc = `${backendServer}/grubhub/images/restaurant/${restaurant.res_image}`;
//             restaurantDetails = (
//                 <Card bg="info" text="white" style={{ width: "70rem", height: "15rem", margin: "2%" }}>
//                     <Row>
//                         <Col>
//                             <Card.Img style={{ width: "18rem", height: "15rem" }} src={resImageSrc} />
//                         </Col>
//                         <Card.Body>
//                             <Card.Title><h1>{restaurant.res_name}</h1></Card.Title>
//                             <br />
//                             <Card.Text><h4>{restaurant.address} | {restaurant.res_zip_code} | {restaurant.phone_number}</h4></Card.Text>
//                             <br />
//                             <Card.Text><h4>Cuisine: {restaurant.res_cuisine}</h4></Card.Text>
//                         </Card.Body>
//                     </Row>
//                 </Card>
//             );
//         }
//         if (this.state && this.state.pending_orders) {
//             orders = this.state.pending_orders;
//             if (orders.length > 0) {
//                 orderCards = orders.map(order => {
//                     statusOptions = statuses.map(status => {
//                         if (status === order.order_status) {
//                             return <option selected>{status}</option>;
//                         }
//                         return <option>{status}</option>;
//                     });
//                     statusDropdown = (
//                         <Form.Control as="select" style={{ width: "80%" }} name={order.order_id} onChange={this.onStatusChange}>
//                             {statusOptions}
//                         </Form.Control>
//                     );
//                     return (
//                         <Card style={{ width: "50rem", margin: "2%" }}>
//                             <Card.Body>
//                                 <Row>
//                                     <Col>
//                                         <Card.Title>{order.name}</Card.Title>
//                                         <Card.Subtitle className="mb-2 text-muted">{order.address}</Card.Subtitle>
//                                         <Card.Subtitle className="mb-2 text-muted">{order.phone_number}</Card.Subtitle>
//                                         <br />
//                                         <Card.Text>{order.order_date}</Card.Text>
//                                     </Col>
//                                     <Col align="center">
//                                         <Link to={{ pathname: "/orders/details", state: {order_details: order, prevPath: "/home"} }}>
//                                             <Button variant="link">Order Details</Button>
//                                         </Link>
//                                         <Link to={{ pathname: "/orders/billing", state: {order_details: order, prevPath: "/home"}}}>
//                                             <Button variant="link">Billing Details</Button>
//                                         </Link>
//                                     </Col>
//                                     <Col align="center">
//                                         <br />
//                                         <b>Order Status</b>
//                                         <br />
//                                         {statusDropdown}
//                                         <br />
//                                     </Col>
//                                 </Row>
//                             </Card.Body>
//                         </Card>
//                     );
//                 });
//             }
//         }
//         return (
//             <div>
//                 <Container className="justify-content">
//                     <br/>
//                     {restaurantDetails}
//                     <h4>Pending Orders</h4>
//                     <br/>
//                     {message}
//                     {orderCards}
//                 </Container>
//             </div>
//         )
//     }
// }
// export default RestaurantHome;