import React from 'react';
import axios from 'axios';
import backendServer from "../../webConfig";
import Navigationbar from "../NavigationBar"
import Card from "./Card"
import { InputGroup, FormControl, Button, DropdownButton, Dropdown, Alert, Col, Row } from 'react-bootstrap';

//import Banner


export default class CustomerHome extends React.Component {


        constructor(props) {
            super(props);
            this.setState({
                search_input: "",
                noRecord: false
            });
    
            this.onChange = this.onChange.bind(this);
            this.onSearch = this.onSearch.bind(this);
            this.onTypeSelect = this.onTypeSelect.bind(this);
            this.onMealTypeSelect = this.onMealTypeSelect.bind(this);
        }
        


        get_cust_fav(cust_id) {
            var url = `${backendServer}/restaurant/getFav?cust_id=${cust_id}`
            axios.get(url)
                 .then(response => {
                    if (response.data.Favourites) {
                        console.log("customer fav response", response.data.Favourites)
                        var res = JSON.stringify(response.data.Favourites)
                        console.log(res)
    
                        if (response.data.Favourites.length === 0) {
                           console.log("no favs")
                        }
                        else {
                            localStorage.setItem('favourites', res)
                        }
                    }
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        console.log(error.response.data);
                    }
                }) 
            }

       get_rest_call(cust_city, search_param = null) {
        var url = `${backendServer}/restaurant/getRestaurants`
        let params = {
            search_string : search_param,
            cust_city : cust_city
        }
        // if(search_param){
        //     url = url +'?search_string='+search_param
        // }
        axios.get(url, {params})
             .then(response => {
                if (response.data) {
                    var res = JSON.stringify(response.data)
                    if (response.data.length===0) {
                        this.setState({
                            noRecord: true,
                            search_input: "",
                            restaurantList: res,
                            displayRestaurants: res
                        });
                    }
                    else {
                        console.log("inside else")
                        this.setState({
                            restaurantList: res,
                            displayRestaurants: res,
                        });
                    }
                }
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    console.log(error.response.data);
                }
            }) 
        }


        

        componentDidMount() {
            if(localStorage.getItem('user_id')){
                this.get_cust_fav(localStorage.getItem('user_id'));
            }
            this.get_rest_call(localStorage.getItem('city'));
            
           
        }
    
        onChange = (e) => {
            this.setState({
                [e.target.name]: e.target.value,
                noRecord: false
            });
        }
    
        onSearch = (e) => {
            e.preventDefault();
            if (this.state) {
                var searchInput = typeof this.state.search_input === "undefined" || this.state.search_input === "" ? "_" : this.state.search_input;
                this.get_rest_call(localStorage.getItem('city'), searchInput);
            }
        }
    
        onTypeSelect = (e) => {
            var arr = JSON.parse(this.state.restaurantList);
            console.log('array after parse', arr);
            console.log(typeof(arr));

            var filteredList = arr.filter(restaurant => restaurant.RestType=== e.target.text);
            console.log('array after filtering',filteredList);
            this.setState({
                displayRestaurants: JSON.stringify(filteredList)
            });
        }

        onMealTypeSelect = (e) => {
            console.log("inside on meal select");
            var arr = JSON.parse(this.state.restaurantList);
            console.log('array after parse meal select', arr);
            console.log(typeof(arr));

            var filteredList = arr.filter(restaurant => restaurant.Dishes.filter( dish => dish.Category === e.target.text));
            console.log('array after filtering',filteredList);
            this.setState({
                displayRestaurants: JSON.stringify(filteredList)
            });
        }
    
        render() {
            var restaurantCards = null,
                noRecordMessage = null;
                
            if (this.state && this.state.cuisineList) {
                // cuisineDropdown = this.state.cuisineList.map(cuisine => {
                //     return (
                //         <Dropdown.Item href="#" onClick={this.onCuisineSelect}>{cuisine}</Dropdown.Item>
                //     )
                // })
            }
    
            if (this.state && this.state.displayRestaurants) {
                var arr = JSON.parse(this.state.displayRestaurants);
                
                restaurantCards = arr.map(restaurant => {
                    return (
                        <Col sm={3}>
                             <Card res = { { restaurant } }  />
                        </Col>
                    );
                });
            }
    
            if (this.state && this.state.noRecord && this.state.search_input === "") {
                noRecordMessage = (
                    <Alert variant="warning">
                        No Restaurants are available now. Please try again later.
                    </Alert>
                );
            }
            else if(this.state && this.state.noRecord){
                noRecordMessage = (
                <Alert variant="warning">
                        No Results. Please try again.
                    </Alert>
                );
            }
            else {
                noRecordMessage = null;
            }
    
            return (
                <div>
                    <Navigationbar />
                    <center><br /><br />
         
                        <form onSubmit={this.onSearch}>
                            <InputGroup style={{ width: '50%' }} size="lg">
                                <FormControl
                                    placeholder="Restaurant Name\ Dish Name \ City "
                                    aria-label="Search Restaurants"
                                    aria-describedby="basic-addon2"
                                    name="search_input"
                                    onChange={this.onChange}
                                />
                                {"  "}
                                <InputGroup.Append>
                                {"   "} <Button variant="primary" type="submit">Search</Button>
                                </InputGroup.Append>
                                {"    "}
                                <DropdownButton
                                as={InputGroup.Append}
                                variant="outline-secondary"
                                title="Restaurant Type"
                                id="input-group-dropdown-2">
                                
                                <Dropdown.Item onClick={this.onTypeSelect}>Delivery</Dropdown.Item>
                                <Dropdown.Item onClick={this.onTypeSelect}>Pickup</Dropdown.Item>
                                <Dropdown.Item onClick={this.onTypeSelect}>Both</Dropdown.Item>
                                </DropdownButton>

                                <DropdownButton
                                as={InputGroup.Append}
                                variant="outline-secondary"
                                title="Meal Type"
                                id="input-group-dropdown-2">
                                
                                <Dropdown.Item onClick={this.onMealTypeSelect}>Veg</Dropdown.Item>
                                <Dropdown.Item onClick={this.onMealTypeSelect}>Non Veg</Dropdown.Item>
                                <Dropdown.Item onClick={this.onMealTypeSelect}>Vegan</Dropdown.Item>
                                </DropdownButton>

                            </InputGroup>
                        </form>
                        <br /><br />
                        {noRecordMessage}
                        <Row>{restaurantCards}</Row>
                    </center>
                </div>
            )
        }

}

