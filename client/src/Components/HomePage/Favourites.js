import React, { Component } from 'react';
import axios from 'axios';
//import backendServer from "../../webConfig";
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
            var url = `http://localhost:3001/restaurant/getFav?cust_id=${cust_id}`
            axios.get(url)
                 .then(response => {
                    if (response.data) {
                        var res = JSON.stringify(response.data)
                        
                        if (response.data[0].search_result === 'NO_RECORD') {
                           console.log("no favs")
                        }
                        else {
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

