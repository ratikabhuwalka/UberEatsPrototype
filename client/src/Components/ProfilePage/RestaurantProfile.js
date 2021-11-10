import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Form, Button, ButtonGroup, Card, DropdownButton, Dropdown, InputGroup} from 'react-bootstrap';
import Navigationbar from '../NavigationBar'
import backendServer from "../../webConfig";

class RestaurantProfile extends Component {

constructor(props) {
    super(props);
    this.state = {
        rest_id : localStorage.getItem('user_id'),
        read_only : true,
        rest_type : 'Select Type'
    };
    this.onChange = this.onChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.updateRestaurant = this.updateRestaurant.bind(this);
    this.onUpload = this.onUpload.bind(this);
}

componentWillMount() 
{
    let rest_id = ""
    let rest = null
    if(localStorage.getItem("is_owner")==="true")
    {
        rest_id = localStorage.getItem("user_id")

        this.setState(
            {
                rest_id : localStorage.getItem("user_id"),
                read_only: false

            }
        );
    }

   const params = {
        rest_id : rest_id
    }
   
    axios.get(`${backendServer}/restaurant/getRestaurant`, { params})
        .then(response => {
            if (response.data) {
                rest = response.data;

                var restData = {
                    rest_id: rest._id || this.state.rest_id,
                    rest_name: rest.RestName || this.state.rest_name,
                    rest_email: rest.RestEmail || this.state.rest_email,
                    rest_phone: rest.RestPhone || this.state.rest_phone,
                    rest_city: rest.RestCity || this.state.rest_city,
                    rest_country: rest.RestCountry || this.state.rest_country,
                    rest_type: rest.RestType || this.state.rest_type,
                    start_time: rest.StartTime || this.state.start_time,
                    end_time: rest.EndTime || this.state.end_time,
                    rest_image: rest.RestImage
                };
                this.setState(restData);
            }
        })
        .catch(error => {
            if (error.response && error.response.data) {
            }
        })
    }

onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}

onTypeSelect = (e) => {
    this.setState (
        {
            rest_type : e.target.text
        }
    )
}

onImageChange = (e) => {
    this.setState({
        rest_image: e.target.files[0]
    });
}

updateRestaurant = (e) =>
{
    let rest_data = {
        "rest_id": this.state.rest_id,
        "rest_country": this.state.rest_country,
        "rest_name": this.state.rest_name,
        "rest_phone": this.state.rest_phone,
        "rest_email": this.state.rest_email,
        "rest_city": this.state.rest_city,
        "start_time": this.state.start_time,
        "end_time": this.state.end_time,
        "rest_type": this.state.rest_type
    }

    axios.post(`${backendServer}/restaurant/updaterest`, rest_data)
        .then(response => {
            if (response.data === "RESTAURANT UPDATED") {
                
                this.setState({
                    message: response.data
                });
                alert("Restaurant  Updated!")
            }

        })
        .catch(error => {
            this.setState({
                message: "ERROR"
            });
        });
}

onUpload = (e) => {
    console.log("on upload");
    const formData = new FormData();
    console.log(this.state.rest_image);
    formData.append("file", this.state.rest_image);
    axios.post(`${backendServer}/upload/restaurant/${this.state.rest_id}`,
        formData,
        {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        }
    );
    alert("Photo Uploaded");
}

render(){
    
    return (
        <div>
            <Navigationbar />
            <Container fluid={true}>
                <Row>
                    <Col xs={6} md={4}>
                            <center>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={this.state.rest_image} />
                                </Card>
                                <input type ="file" name="rest_image" accept="image/*" onChange = {this.onImageChange}/>
                                <Button type="submit" variant="primary" onClick={this.onUpload}>Upload</Button>
                            </center>
                            
                    </Col>
                    <Col>
                        <h4>Restaurant  Profile</h4>
                        <br />
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="restName">
                                    <Form.Label>Restaurant  Name</Form.Label>
                                    <Form.Control name="rest_name"
                                        readOnly = {this.state.read_only}
                                        type="text"
                                        onChange={this.onImageChange}
                                        value={this.state.rest_name}
                                        pattern="^[A-Za-z0-9 ]+$"
                                        required={true} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="rest_email">
                                    <Form.Label>Restaurant  Email</Form.Label>
                                    <Form.Control type="text"
                                        name="rest_email"
                                        readOnly = {this.state.read_only}
                                        value={this.state.rest_email}
                                        onChange={this.onChange}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="rest_country">
                                    <Form.Label>Restaurant  Country</Form.Label>
                                    <Form.Control name="rest_country"
                                        type = "text"
                                        readOnly = {this.state.read_only}
                                        onChange={this.onChange}
                                        value={this.state.rest_country}
                                        pattern="^[A-Za-z0-9 ]+$"
                                        required={true} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="rest_phone">
                                    <Form.Label>Restaurant  Phone</Form.Label>
                                    <Form.Control name="rest_phone"
                                        readOnly = {this.state.read_only}
                                        type="text"
                                        onChange={this.onChange}
                                        value={this.state.rest_phone}
                                        required={true} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="rest_city">
                                    <Form.Label>Restaurant  City</Form.Label>
                                    <Form.Control type="text"
                                        name="rest_city"
                                        readOnly = {this.state.read_only}
                                        onChange={this.onChange}
                                        value={this.state.rest_city}
                                     />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="start_time">
                                    <Form.Label>Start Time</Form.Label>
                                    <Form.Control type="text"
                                        readOnly = {this.state.read_only}
                                        name="start_time"
                                        onChange={this.onChange}
                                        value={this.state.start_time}
                                     />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="end_time">
                                    <Form.Label>End Time</Form.Label>
                                    <Form.Control type="text"
                                        readOnly = {this.state.read_only}
                                        name="end_time"
                                        onChange={this.onChange}
                                        value={this.state.end_time}
                                     />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="rest_type">
                                <Form.Label>Restaurant Type</Form.Label>
                                <DropdownButton as={InputGroup.Append} variant="outline-secondary" 
                                                                    title={this.state.rest_type}
                                                                        id="input-group-dropdown-2">
                                    <Dropdown.Item href="#" onClick={this.onTypeSelect}>Delivery</Dropdown.Item>
                                    <Dropdown.Item href="#" onClick={this.onTypeSelect}>Pickup</Dropdown.Item>
                                    <Dropdown.Item href="#" onClick={this.onTypeSelect}>Both</Dropdown.Item>
                                </DropdownButton>
                                </Form.Group>
                            </Form.Row>
                            
                           <br/>
                            <ButtonGroup aria-label="Third group">
                                <Button type="submit" variant="primary" onClick = {this.updateRestaurant}>Update</Button>
                            </ButtonGroup>
                            {"  "}
                            <ButtonGroup aria-label="Fourth group">
                                <Link to="/restaurant"><Button variant="secondary">Cancel</Button></Link>
                            </ButtonGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )

};


}
export default RestaurantProfile


