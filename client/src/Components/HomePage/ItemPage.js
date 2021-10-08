import React, { Component } from 'react';
import backendServer from "../../webConfig";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Col, Row, Form, Button, ButtonGroup, Card } from 'react-bootstrap';


//export class SignUp extends React.Component {


class ItemPage extends Component{
    constructor(props) {
        super(props);
        this.state = {

            rest_id : localStorage.getItem('user_id')
        };
        this.onChange = this.onChange.bind(this);
        this.onUserImageChange = this.onUserImageChange.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.onUserUpload = this.onUserUpload.bind(this);
        this.addItem = this.addItem.bind(this);
        

    }

    // componentWillMount() {
    //     this.props.getOwner();
    // }

    componentWillMount() 
    {
        if (this.props.location.props && this.props.location.props.dish_id)
        {
            var dish = ''
            const params = {
                dish_id : this.props.location.props.dish_id
            }
            axios.get(`${backendServer}/dish/getdish`, { params })
            .then(response => {
                if (response.data) {
                    dish = response.data[0];

                    var dishData = {
                        dish_id: dish.DishId || this.state.dish_id,
                        dish_name: dish.DishName || this.state.dish_name,
                        description: dish.Description || this.state.description,
                        ingredients: dish.Ingredients || this.state.ingredients,
                        category: dish.Category || this.state.category,
                        price: dish.Price || this.state.price,
                        meal_type: dish.MealType || this.state.meal_type,
                        user_image: dish.DishImage || this.state.user_image,
                    };
                    this.setState(dishData);
                }
            })
            .catch(error => {
                if (error.response && error.response.data) {
                }
            })

           

            // var dishData = {
            //     dish_id: dish.DishId || this.state.dish_id,
            //     dish_name: dish.DishName || this.state.dish_name,
            //     description: dish.Description || this.state.description,
            //     category: dish.Category || this.state.category,
            //     price: dish.Price || this.state.price,
            //     meal_type: dish.MealType || this.state.meal_type,
            //     user_image: dish.DishImage || this.state.user_image,
            // };
            // console.log('dish', dishData);

            // this.setState(dishData);


        }



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
        let item_data = {
            "dishId": this.state.dish_id,
            "price": this.state.price,
            "dishName": this.state.dish_name,
            "ingredients": this.state.ingredients,
            "description": this.state.description,
            "category": this.state.category,
            "mealType": this.state.meal_type
        }

        axios.post(`${backendServer}/dish/updatedish`, item_data)
            .then(response => {
                console.log(response);
                if (response.data === "DISH UPDATED") {
                    
                    this.setState({
                        message: response.data
                    });
                    alert("Dish Updated!")
                }

            })
            .catch(error => {
                this.setState({
                    message: "ERROR"
                });
            });
    }

    addItem = (e) => {
        let item_data = {
            "restId": localStorage.getItem("user_id"),
            "price": this.state.price,
            "dishName": this.state.dish_name,
            "ingredients": this.state.ingredients,
            "description": this.state.description,
            "category": this.state.category,
            "mealType": this.state.meal_type
        }
        axios.post(`${backendServer}/dish/adddish`, item_data)
            .then(response => {
                
                if (response.data === "DISH ADDED") {
                    
                    this.setState({
                        message: response.data
                    });
                    alert("Dish Added!")
                }

            })
            .catch(error => {
                this.setState({
                    message: "ERROR"
                });
            });
    };
    

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
    }

    render() {
        var userImageSrc, title,
            userFileText = this.state.userFileText || "Choose image..";
           

        // if (this.state) {
        //      axios.get(`http://localhost:3001/image/dish/${this.state.user_image}`).then(response =>{
                 
        //          userImageSrc = response;
        //          console.log(userImageSrc);
        //     });
        //     title = this.state.dishName;

        // }
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
                                    <form><br /><br /><br />
                                        <div class="custom-file" style={{ width: "80%" }}>
                                            <input type="file" class="custom-file-input" name="user_file" accept="image/*" onChange={this.onUserImageChange} required/>
                                            <label class="custom-file-label" for="user-file">{userFileText}</label>
                                        </div><br /><br />
                                        <Button type="submit" variant="primary" onClick={this.onUserUpload}>Upload</Button>
                                    </form>
                                </center>
                                
                        </Col>
                        <Col>
                            <h4>Add Item</h4>
                            <br />
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="dishName">
                                        <Form.Label>Dish Name</Form.Label>
                                        <Form.Control name="dish_name"
                                            type="text"
                                            onChange={this.onChange}
                                            value={this.state.dish_name}
                                            pattern="^[A-Za-z0-9 ]+$"
                                            placeholder="Dish Name"
                                            required={true} />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text"
                                            name="description"
                                            value={this.state.description}
                                            onChange={this.onChange}
                                            placeholder="Description" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="price">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control name="price"
                                            type = "text"
                                            onChange={this.onChange}
                                            value={this.state.price}
                                            pattern="^[A-Za-z0-9 ]+$"
                                            required={true} />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="ingredients">
                                        <Form.Label>Ingredients</Form.Label>
                                        <Form.Control name="ingredients"
                                            type="text"
                                            onChange={this.onChange}
                                            value={this.state.ingredients}
                                            required={true} />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="category">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control type="text"
                                            name="category"
                                            onChange={this.onChange}
                                            value={this.state.category}
                                         />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="meal_type">
                                        <Form.Label>Meal Type</Form.Label>
                                        <Form.Control type="text"
                                            name="meal_type"
                                            onChange={this.onChange}
                                            value={this.state.meal_type}
                                         />
                                    </Form.Group>
                                </Form.Row>
                                
                               <br/>
                               <ButtonGroup aria-label="Third group">
                                    <Button type="submit" variant="success" onClick = {this.addItem}>Add</Button>
                                </ButtonGroup>
                                {"  "}

                                <ButtonGroup aria-label="Third group">
                                    <Button type="submit" variant="primary" onClick = {this.updateItem}>Update</Button>
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
    }
};
export default ItemPage;