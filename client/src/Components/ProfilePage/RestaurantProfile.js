import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Form, Button, ButtonGroup, Card } from 'react-bootstrap';
import backendServer from "../../webConfig";

class RestaurantProfile extends Component {
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
        rest_id : localStorage.getItem('user_id'),
        read_only : true
    };
    this.onChange = this.onChange.bind(this);
    this.onUserImageChange = this.onUserImageChange.bind(this);
    this.updateRestaurant = this.updateRestaurant.bind(this);
    this.onUserUpload = this.onUserUpload.bind(this);
    

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
                rest = response.data[0];

                var restData = {
                    rest_id: rest.RestId || this.state.rest_id,
                    rest_name: rest.RestName || this.state.rest_name,
                    rest_email: rest.RestEmail || this.state.rest_email,
                    rest_phone: rest.RestPhone || this.state.rest_phone,
                    rest_city: rest.RestCity || this.state.rest_city,
                    rest_country: rest.RestCountry || this.state.rest_country,
                    rest_type: rest.RestType || this.state.rest_type,
                    start_time: rest.StartTime || this.state.start_time,
                    end_time: rest.EndTime || this.state.end_time,
                    user_image: rest.RestImage || this.state.user_image,
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

onUserImageChange = (e) => {
    this.setState({
        [e.target.name]: e.target.files[0],
        userFileText: e.target.files[0].name
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
                    <Button type="submit" variant="primary" onClick = {this.updateRestaurant}>Update</Button>
                </ButtonGroup>
                {"  "}
                <ButtonGroup aria-label="Fourth group">
                    <Link to="/restaurant"><Button variant="secondary">Cancel</Button></Link>
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
                        <h4>Restaurant  Profile</h4>
                        <br />
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="restName">
                                    <Form.Label>Restaurant  Name</Form.Label>
                                    <Form.Control name="rest_name"
                                        readOnly = {this.state.read_only}
                                        type="text"
                                        onChange={this.onChange}
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
                                    <Form.Control type="text"
                                        readOnly = {this.state.read_only}
                                        name="rest_type"
                                        onChange={this.onChange}
                                        value={this.state.rest_type}
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
export default RestaurantProfile
//export default connect(mapStateToProps, { getOwner, updateOwner })(RestaurantProfile);


