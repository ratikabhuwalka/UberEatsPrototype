import React from 'react';
import axios from 'axios';
import backendServer from "../../webConfig";
import Navigationbar from "../NavigationBar"
import Card from "./Card"
import {  Col, Row } from 'react-bootstrap';


//import Banner


export default class Favourite extends React.Component {


        constructor(props) {
            super(props);
            this.setState({
                search_input: "",
                noRecord: false
            });
    
        }

        get_cust_fav(cust_id) {
            var url = `${backendServer}/restaurant/getFav?cust_id=${cust_id}`
            var token = localStorage.getItem('token')
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get(url)
                 .then(response => {
                    if (response.data) {
                        var res = JSON.stringify(response.data.Favourites)
                        console.log("stringified favs",response.data.Favourites)
                        if (response.data.Favourites.length===0) {
                           console.log("no favs")
                        }
                        else {
                            console.log("in else, fav", res)
                            this.setState(
                                {
                                    restaurantList : res,
                                    displayRestaurants: res
                                }
                            )
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

        componentDidMount() {
            if(localStorage.getItem('user_id')){
                this.get_cust_fav(localStorage.getItem('user_id'));
            
            }
        }
    
        
        render() {
            var restaurantCards = null;
                
    
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
    


    
            return (
                <div>
                    <Navigationbar />
                    <center><br /><br />
         
                        <Row>{restaurantCards}</Row>
                    </center>
                </div>
            )
        }

}

