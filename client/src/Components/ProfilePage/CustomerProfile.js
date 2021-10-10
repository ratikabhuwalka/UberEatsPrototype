import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Form, Button, ButtonGroup, Card } from 'react-bootstrap';
import Navigationbar from "../NavigationBar"
import backendServer from "../../webConfig";

class CustomerProfile extends Component {

constructor(props) {
    super(props);
    this.state = {
        cust_id : localStorage.getItem('user_id'),
        read_only : true
    };
    this.onChange = this.onChange.bind(this);
    this.onUserImageChange = this.onUserImageChange.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.onUserUpload = this.onUserUpload.bind(this);

}

componentWillMount() 
{
    let cust_id = ""
    let cust = null
    if(localStorage.getItem("is_owner")==="false")
    {
        cust_id = localStorage.getItem("user_id")

        this.setState(
            {
                cust_id : localStorage.getItem("user_id"),
                read_only: false

            }
        );
    }
    else if( this.props.location.props && this.props.location.props.cust_id){
        cust_id = this.props.location.props.cust_id

        this.setState(
            {
                cust_id : this.props.location.props.cust_id,
                read_only: true

            }
        );

    }
    const params = {
        cust_id : cust_id
    }
   
    axios.get(`${backendServer}/customer/customerdetail`, { params})
        .then(response => {
            if (response.data) {
                cust = response.data[0];

                var custData = {
                    cust_id: cust.CustId || this.state.cust_id,
                    cust_name: cust.CustName || this.state.cust_name,
                    cust_email: cust.CustEmail || this.state.cust_email,
                    cust_phone: cust.CustPhone || this.state.cust_phone,
                    cust_city: cust.CustCity || this.state.cust_city,
                    cust_country: cust.CustCountry || this.state.cust_country,
                    dob: cust.DOB || this.state.dob,
                    user_image: cust.CustImage || this.state.user_image,
                };
                this.setState(custData);
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

onUserImageChange = (e) => {
    this.setState({
        [e.target.name]: e.target.files[0],
        userFileText: e.target.files[0].name
    });
}

updateItem = (e) =>
{
    let cust_data = {
        "cust_id": this.state.cust_id,
        "cust_country": this.state.cust_country,
        "cust_name": this.state.cust_name,
        "cust_phone": this.state.cust_phone,
        "cust_email": this.state.cust_email,
        "cust_city": this.state.cust_city,
        "dob": this.state.dob
    }

    axios.post(`${backendServer}/customer/updatecust`, cust_data)
        .then(response => {
            console.log(response);
            if (response.data === "CUSTOMER UPDATED") {
                
                this.setState({
                    message: response.data
                });
                alert("Customer Updated!")
            }

        })
        .catch(error => {
            this.setState({
                message: "ERROR"
            });
        });
}

onUserUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("dish_image", this.state.user_file);
    const uploadConfig = {
        headers: {
            "content-type": "multipart/form-data"
        }
    };
    axios.post(`http://localhost:3001/upload/dish/1`, formData, uploadConfig)
        .then(response => {
            alert("Image uploaded successfully!");
            this.setState({
                userFileText: "Choose file...",
                user_image: response.data
            });
        })
        .catch(err => {
            console.log("Error", err);
        });
};

render(){
    var userImageSrc, title,
        userFileText = this.state.userFileText || "Choose image..",
        buttons = null,
        uploadbuttons = null
       

    if(this.state && !this.state.read_only){
        buttons = (
            <>
                <ButtonGroup aria-label="Third group">
                    <Button type="submit" variant="primary" onClick = {this.updateItem}>Update</Button>
                </ButtonGroup>
                {"  "}
                <ButtonGroup aria-label="Fourth group">
                    <Link to="/customerHome"><Button variant="secondary">Cancel</Button></Link>
                </ButtonGroup>
            </>
        )

        uploadbuttons = (
            <form>
                <br /><br /><br />
                <div class="custom-file" style={{ width: "80%" }}>
                    <input type="file" class="custom-file-input" name="user_file" accept="image/*" onChange={this.onUserImageChange} required/>
                    <label class="custom-file-label" for="user-file">{userFileText}</label>
                </div><br /><br />
                <Button type="submit" variant="primary" onClick={this.onUserUpload}>Upload</Button>
            </form>
        )
    }

    if(this.state && this.state.read_only){
        buttons = (
            <>
                {"  "}
                <ButtonGroup aria-label="Fourth group">
                    <Link to="/restaurantOrder"><Button variant="secondary">Go Back</Button></Link>
                </ButtonGroup>
            </>
        )

        uploadbuttons = (
            <form>
                <br /><br /><br />
                <div class="custom-file" style={{ width: "80%" }}>
                    <input type="file" class="custom-file-input" name="user_file" accept="image/*" onChange={this.onUserImageChange} required/>
                    <label class="custom-file-label" for="user-file">{userFileText}</label>
                </div><br /><br />
                <Button type="submit" variant="primary" onClick={this.onUserUpload}>Upload</Button>
            </form>
        )
    }



    return (
        <div>
            <Navigationbar />
            <Container fluid={true}>
                <Row>
                    <Col xs={6} md={4}>
                            <center>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={userImageSrc} />
                                    <Card.Body>
                                        <Card.Title><h3>{title}</h3></Card.Title>
                                    </Card.Body>
                                </Card>
                                {uploadbuttons}
                                
                            </center>
                            
                    </Col>
                    <Col>
                        <h4>Customer Profile</h4>
                        <br />
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="custName">
                                    <Form.Label>Customer Name</Form.Label>
                                    <Form.Control name="cust_name"
                                        readOnly = {this.state.read_only}
                                        type="text"
                                        onChange={this.onChange}
                                        value={this.state.cust_name}
                                        pattern="^[A-Za-z0-9 ]+$"
                                        required={true} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="cust_email">
                                    <Form.Label>Customer Email</Form.Label>
                                    <Form.Control type="text"
                                        name="cust_email"
                                        readOnly = {this.state.read_only}
                                        value={this.state.cust_email}
                                        onChange={this.onChange}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="cust_country">
                                    <Form.Label>Customer Country</Form.Label>
                                    <Form.Control name="cust_country"
                                        type = "text"
                                        readOnly = {this.state.read_only}
                                        onChange={this.onChange}
                                        value={this.state.cust_country}
                                        pattern="^[A-Za-z0-9 ]+$"
                                        required={true} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="cust_phone">
                                    <Form.Label>Customer Phone</Form.Label>
                                    <Form.Control name="cust_phone"
                                        readOnly = {this.state.read_only}
                                        type="text"
                                        onChange={this.onChange}
                                        value={this.state.cust_phone}
                                        required={true} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="cust_city">
                                    <Form.Label>Customer City</Form.Label>
                                    <Form.Control type="text"
                                        name="cust_city"
                                        readOnly = {this.state.read_only}
                                        onChange={this.onChange}
                                        value={this.state.cust_city}
                                     />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="dob">
                                    <Form.Label>DOB</Form.Label>
                                    <Form.Control type="text"
                                        readOnly = {this.state.read_only}
                                        name="dob"
                                        onChange={this.onChange}
                                        value={this.state.dob}
                                     />
                                </Form.Group>
                            </Form.Row>
                            
                           <br/>
                           
                           {buttons}
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )

};





}
export default CustomerProfile
//export default connect(mapStateToProps, { getOwner, updateOwner })(RestaurantProfile);


