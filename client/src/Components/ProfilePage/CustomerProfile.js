import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Form, Button, ButtonGroup, Card } from 'react-bootstrap';
import backendServer from "../../webConfig";

class CustomerProfile extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//         this.onChange = this.onChange.bind(this);
//         this.onUserImageChange = this.onUserImageChange.bind(this);
//         this.onUpdate = this.onUpdate.bind(this);
//         this.onUserUpload = this.onUserUpload.bind(this);
//     }

//     // componentWillMount() {
//     //     this.props.getOwner();
//     // }

//     componentWillReceiveProps(nextProps) {
//         if (nextProps.user) {
//             var { user } = nextProps;

//             var userData = {
//                 user_id: user.user_id || this.state.user_id,
//                 name: user.name || this.state.name,
//                 email_id: user.email_id || this.state.email_id,
//                 address: user.address || this.state.address,
//                 phone_number: user.phone_number || this.state.phone_number,
//                 res_id: user.res_id || this.state.res_id,
//                 res_name: user.res_name || this.state.res_name,
//                 res_cuisine: user.res_cuisine || this.state.res_cuisine,
//                 res_zip_code: user.res_zip_code || this.state.zip_code,
//                 user_image: user.user_image || this.state.user_image,
//                 res_image: user.res_image || this.state.res_image
//             };

//             this.setState(userData);
//         }
//     }

//     onChange = (e) => {
//         this.setState({
//             [e.target.name]: e.target.value
//         })
//     }

//     onUserImageChange = (e) => {
//         this.setState({
//             [e.target.name]: e.target.files[0],
//             userFileText: e.target.files[0].name
//         });
//     }

//     onResImageChange = (e) => {
//         this.setState({
//             [e.target.name]: e.target.files[0],
//             resFileText: e.target.files[0].name
//         });
//     }

//     onUpdate = (e) => {
//         //prevent page from refresh
//         e.preventDefault();

//         let data = Object.assign({}, this.state);
//         this.props.updateOwner(data);
//     };

//     // onResUpload = (e) => {
//     //     e.preventDefault();
//     //     const formData = new FormData();
//     //     formData.append("resimage", this.state.res_file);
//     //     const uploadConfig = {
//     //         headers: {
//     //             "content-type": "multipart/form-data"
//     //         }
//     //     };
//     //     axios.post(`${backendServer}/grubhub/uploads/restaurant/${this.state.res_id}`, formData, uploadConfig)
//     //         .then(response => {
//     //             alert("Image uploaded successfully!");
//     //             this.setState({
//     //                 resFileText: "Choose file...",
//     //                 res_image: response.data
//     //             });
//     //         })
//     //         .catch(err => {
//     //             console.log("Error");
//     //         });
//     // }

//     onUserUpload = (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append("image", this.state.user_file);
//         const uploadConfig = {
//             headers: {
//                 "content-type": "multipart/form-data"
//             }
//         };
//         axios.post(`localhost:3001/grubhub/uploads/user/${this.state.user_id}`, formData, uploadConfig)
//             .then(response => {
//                 alert("Image uploaded successfully!");
//                 this.setState({
//                     userFileText: "Choose file...",
//                     user_image: response.data
//                 });
//             })
//             .catch(err => {
//                 console.log("Error");
//             });
//     }

//     render() {
//         var userImageSrc, resImageSrc, res_title, title,
//             userFileText = this.state.userFileText || "Choose image..",
//             resFileText = this.state.resFileText || "Choose image..";

//         if (this.state) {
//             userImageSrc = `localhost:3001/grubhub/images/user/${this.state.user_image}`;
//             title = this.state.name;
//             resImageSrc = `localhost:3001/grubhub/images/restaurant/${this.state.res_image}`;
//             res_title = this.state.res_name;
//         }
//         return (
//             <div>
//                 <Container fluid={true}>
//                     <Row>
//                         <Col xs={6} md={4}>
//                                 <center>
//                                     <Card style={{ width: '18rem' }}>
//                                         <Card.Img variant="top" src={userImageSrc} />
//                                         <Card.Body>
//                                             <Card.Title><h3>{title}</h3></Card.Title>
//                                         </Card.Body>
//                                     </Card>
//                                     <form onSubmit={this.onUserUpload}><br /><br /><br />
//                                         <div class="custom-file" style={{ width: "80%" }}>
//                                             <input type="file" class="custom-file-input" name="user_file" accept="image/*" onChange={this.onUserImageChange} required/>
//                                             <label class="custom-file-label" for="user-file">{userFileText}</label>
//                                         </div><br /><br />
//                                         <Button type="submit" variant="primary">Upload</Button>
//                                     </form>
//                                 </center>
//                                 <center><br /><br />
//                                     <Card style={{ width: '18rem' }}>
//                                         <Card.Img variant="top" src={resImageSrc} />
//                                         <Card.Body>
//                                             <Card.Title><h3>{res_title}</h3></Card.Title>
//                                         </Card.Body>
//                                     </Card>
//                                     <form onSubmit={this.onResUpload}><br /><br /><br />
//                                         <div class="custom-file" style={{ width: "80%" }}>
//                                             <input type="file" class="custom-file-input" name="res_file" accept="image/*" onChange={this.onResImageChange} required/>
//                                             <label class="custom-file-label" for="user-file">{resFileText}</label>
//                                         </div><br /><br />
//                                         <Button type="submit" variant="primary">Upload</Button>
//                                     </form>
//                                 </center>
//                         </Col>
//                         <Col>
//                             <h4>Profile</h4>
//                             <br />
//                             <Form onSubmit={this.onUpdate} >
//                                 <Form.Row>
//                                     <Form.Group as={Col} controlId="name">
//                                         <Form.Label>Name</Form.Label>
//                                         <Form.Control name="name"
//                                             type="text"
//                                             onChange={this.onChange}
//                                             value={this.state.name}
//                                             pattern="^[A-Za-z0-9 ]+$"
//                                             required={true} />
//                                     </Form.Group>
//                                 </Form.Row>
//                                 <Form.Row>
//                                     <Form.Group as={Col} controlId="res_name">
//                                         <Form.Label>Restaurant Name</Form.Label>
//                                         <Form.Control name="res_name"
//                                             type="text"
//                                             onChange={this.onChange}
//                                             value={this.state.res_name}
//                                             pattern="^[A-Za-z0-9 ]+$"
//                                             required={true} />
//                                     </Form.Group>
//                                 </Form.Row>
//                                 <Form.Row>
//                                     <Form.Group as={Col} controlId="res_cuisine">
//                                         <Form.Label>Cuisine</Form.Label>
//                                         <Form.Control name="res_cuisine"
//                                             type="text"
//                                             onChange={this.onChange}
//                                             value={this.state.res_cuisine}
//                                             pattern="^[A-Za-z ]+$"
//                                             required={true} />
//                                     </Form.Group>
//                                 </Form.Row>
//                                 <Form.Row>
//                                     <Form.Group as={Col} controlId="email_id">
//                                         <Form.Label>Email</Form.Label>
//                                         <Form.Control type="email"
//                                             name="email_id"
//                                             value={this.state.email_id}
//                                             disabled />
//                                     </Form.Group>
//                                 </Form.Row>
//                                 <Form.Row>
//                                     <Form.Group as={Col} controlId="RB.password">
//                                         <Form.Label>Change Password</Form.Label>
//                                         <Form.Control type="password"
//                                             name="password"
//                                             onChange={this.onChange}
//                                             placeholder="New Password" />
//                                     </Form.Group>
//                                 </Form.Row>
//                                 <Form.Row>
//                                     <Form.Group as={Col} controlId="res_zip_code">
//                                         <Form.Label>ZIP Code</Form.Label>
//                                         <Form.Control type="text"
//                                             name="res_zip_code"
//                                             onChange={this.onChange}
//                                             value={this.state.res_zip_code}
//                                             pattern="^[0-9]+"
//                                             required={true}
//                                         />
//                                     </Form.Group>
//                                 </Form.Row>
//                                 <Form.Row>
//                                     <Form.Group as={Col} controlId="formGridCity">
//                                         <Form.Label>Address</Form.Label>
//                                         <Form.Control type="text"
//                                             name="address"
//                                             onChange={this.onChange}
//                                             value={this.state.address}
//                                             pattern="^[A-Za-z0-9 ,-]+$"
//                                             required={true} />
//                                     </Form.Group>
//                                 </Form.Row>
//                                 <Form.Row>
//                                     <Form.Group as={Col} controlId="formGridZip">
//                                         <Form.Label>Phone Number</Form.Label>
//                                         <Form.Control type="text"
//                                             name="phone_number"
//                                             onChange={this.onChange}
//                                             value={this.state.phone_number}
//                                             required={true}
//                                             pattern="^[0-9]+$"
//                                         />
//                                     </Form.Group>
//                                 </Form.Row>
//                                 <ButtonGroup aria-label="Third group">
//                                     <Button type="submit" variant="success">Update Details</Button>
//                                 </ButtonGroup>
//                                 {"  "}
//                                 <ButtonGroup aria-label="Fourth group">
//                                     <Link to="/home"><Button variant="secondary">Cancel</Button></Link>
//                                 </ButtonGroup>
//                             </Form>
//                         </Col>
//                     </Row>
//                     <center><Button href="/home">Home</Button></center>
//                 </Container>
//             </div>
//         )
//     }

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
       

    // if (this.state) {
    //      axios.get(`http://localhost:3001/image/dish/${this.state.user_image}`).then(response =>{
             
    //          userImageSrc = response;
    //          console.log(userImageSrc);
    //     });
    //     title = this.state.dishName;

    // }

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


