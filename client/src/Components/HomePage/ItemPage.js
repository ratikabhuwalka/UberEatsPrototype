import React, { Component } from 'react';
import backendServer from "../../webConfig";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Col, Row, Form, Button, ButtonGroup, Card, Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import Navigationbar from '../NavigationBar'




class ItemPage extends Component{
    constructor(props) {
        super(props);
        this.state = {

            rest_id : localStorage.getItem('user_id'),
            category : 'Select Category'
        };
        this.onChange = this.onChange.bind(this);
        this.onCategorySelect = this.onCategorySelect.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.addItem = this.addItem.bind(this);
        

    }

    componentWillMount() 
    {
        if(this.props.location.props && this.props.location.props.type && this.props.location.props.type==='ADD'){
            if(sessionStorage.getItem('active_dish'))
            {
                sessionStorage.removeItem('active_dish')
            }     
         }

        if ((this.props.location.props && this.props.location.props.dish_id) || sessionStorage.getItem('active_dish'))
        {

            let dish_id =''
            if((this.props.location.props && this.props.location.props.dish_id))
            {
                dish_id = this.props.location.props.dish_id
                sessionStorage.setItem('active_dish', this.props.location.props.dish_id)
            }
            else{
                dish_id = sessionStorage.getItem('active_dish')
            }
            var dish = ''
            const params = {
                dish_id : dish_id
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
                        dish_image: dish.DishImage
                    };
                    this.setState(dishData);
                }
            })
            .catch(error => {
                if (error.response && error.response.data) {
                }
            })

           


        }



    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onImageChange = (e) => {
        this.setState({
            dish_image: e.target.files[0]
        });
    }


    onCategorySelect = (e) => {
        this.setState (
            {
                category : e.target.text
            }
        )
    }
    onUpload = (e) => {
        console.log("on upload");
        const formData = new FormData();
        console.log(this.state.dish_image);
        formData.append("file", this.state.dish_image);
        axios.post(`${backendServer}/upload/dish/${this.state.dish_id}`,
            formData,
            {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            }
        );
        alert("Photo uploaded!")
        window.location.reload(false);
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
    


    render() {
           
        return (
            <div>
                <Navigationbar />

                <Container fluid={true}>
                    <Row>
                    <Col xs={6} md={4}>
                            <center>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={this.state.dish_image} />
                                </Card>
                                <input type ="file" name="dish_image" accept="image/*" onChange = {this.onImageChange}/>
                                <Button type="submit" variant="primary" onClick={this.onUpload}>Upload</Button>
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
                                            pattern="[0-9]+\.?[0-9]*|\.[0-9]+"
                                            placeholder ="in USD"
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
                                    <DropdownButton as={InputGroup.Append} variant="outline-secondary" 
                                                                    title={this.state.category}
                                                                    id="input-group-dropdown-2">
                                        <Dropdown.Item href="#" onClick={this.onCategorySelect}>Veg</Dropdown.Item>
                                        <Dropdown.Item href="#" onClick={this.onCategorySelect}>Non Veg</Dropdown.Item>
                                        <Dropdown.Item href="#" onClick={this.onCategorySelect}>Vegan</Dropdown.Item>
                                    </DropdownButton>
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