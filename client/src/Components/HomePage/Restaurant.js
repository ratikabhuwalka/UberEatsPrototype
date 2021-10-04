import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import ItemCard from "./ItemCard"
import { Button, Card, Container, Col, Row } from 'react-bootstrap';
import Header from '../LandingPage/Header';
import NavigationBar from '../NavigationBar'
//import backendServer from "../../webConfig";

class Restaurant extends Component {
    constructor(props) {
        super(props);
        this.setState({
            //menu_sections: [],
            menu_items: []
        });
        //this.sectionItems = this.sectionItems.bind(this);
        //this.getSections();
        this.getMenuItems();
    }

    componentWillMount() {
        if (this.props.location.state) {
            console.log(this.props.location.state)
            document.title = this.props.location.state.RestName;
            let res = {
                "RestName": this.props.location.state.RestName,
                "RestId":this.props.location.state.RestId
            }
            localStorage.setItem("active_res",JSON.stringify(res) );
        }
    }

    // getSections = () => {
    //     if (this.props.location.state) {
    //         var url = 'http://localhost:3001/restaurant/getItems'
    //         url = url +'?search_string='+this.props.location.state.RestId
    //         console.log(url)
    //     }
    //         axios.get(url)
    //             .then(response => {
    //                 if (response.data[0]) {
    //                     this.setState({
    //                         menu_sections: response.data
    //                     });
    //                 }
    //             })
    //             .catch(err => {
    //                 if (err.response && err.response.data) {
    //                     console.log(err.response.data);
    //                 }
    //             });
    //     }
    // };

    getMenuItems = () => {
        if (this.props.location.state) {
            console.log(this.props.location.state)
            var url = 'http://localhost:3001/restaurant/getItems'
            url = url +'?rest_id='+this.props.location.state.RestId
            console.log(url)

            axios.get(url)
                .then(response => {
                    if (response.data[0]) {
                        var menu_item_string = JSON.stringify(response.data)
                        this.setState({
                            menu_items: menu_item_string
                        });
                    }
                })
                .catch(err => {
                    if (err.response && err.response.data) {
                        console.log(err.response.data);
                    }
                });
        }
    };

    // sectionItems = (menu_section) => {
    //     var itemsRender = [], items, item, section;


    //     if (this.state && this.state.menu_items && this.state.menu_items.length > 0) {
    //         items = this.state.menu_items.filter(menu_item => menu_item.menu_section_id === menu_section.menu_section_id);
    //         if (items.length > 0) {
    //             section = <h4>{menu_section.menu_section_name}</h4>;
    //             itemsRender.push(section);
    //             for (var i = 0; i < items.length; i++) {
    //                 item = <ItemCard menu_item={items[i]} />;
    //                 itemsRender.push(item);
    //             }
    //         }
    //         return itemsRender;
    //     }
    // };


    render() {
        var itemCards = null,
            noRecordMessage = null;
        // if (this.state && this.state.cuisineList) {
        //     cuisineDropdown = this.state.cuisineList.map(cuisine => {
        //         return (
        //             <Dropdown.Item href="#" onClick={this.onCuisineSelect}>{cuisine}</Dropdown.Item>
        //         )
        //     })
        // }

        if (this.state && this.state.menu_items) {
            var arr = JSON.parse(this.state.menu_items);
            console.log(arr);
            console.log(this.state.menu_items, typeof(this.state.menu_items));
            itemCards = arr.map(item => {
                return (
                    <Col sm={3}>
                         <ItemCard res = { {item} }  />
                    </Col>
                );
            });
        }

        // if (this.state && this.state.noRecord && this.state.search_input === "") {
        //     noRecordMessage = (
        //         <Alert variant="warning">
        //             No Restaurants are available now. Please try again later.
        //         </Alert>
        //     );
        // }
        // else if(this.state && this.state.noRecord){
        //     noRecordMessage = (
        //     <Alert variant="warning">
        //             No Results. Please try again.
        //         </Alert>
        //     );
        // }
        // else {
        //     noRecordMessage = null;
        // }
    // render() {
    //     let redirectVar = null,
    //         section = null,
    //         renderOutput = [],
    //         resImageSrc = null,
    //         resName, resPhone, resAddress, resCuisine, resZIP,
    //         restaurant = this.props.location.state;

    //     if (!localStorage.getItem("user_id") || !this.props.location.state) {
    //         redirectVar = <Redirect to="/home" />
    //     }

    //     if (restaurant) {
    //         resImageSrc = `${backendServer}/grubhub/images/restaurant/${restaurant.res_image}`;
    //         resName = restaurant.res_name;
    //         resAddress = restaurant.res_address;
    //         resZIP = restaurant.res_zip_code;
    //         resAddress = restaurant.address;
    //         resPhone = restaurant.phone_number;
    //         resCuisine = restaurant.res_cuisine;
    //     }
    //     if (this.state && this.state.menu_sections && this.state.menu_sections.length > 0) {
    //         for (var i = 0; i < this.state.menu_sections.length; i++) {
    //             section = this.sectionItems(this.state.menu_sections[i]);
    //             renderOutput.push(section);
    //         }
    //     }
        return (
            <div>
                <NavigationBar/>
                <div>
                    <h1> Restaurant header, picture, description to go here</h1>
                </div>
                <div>
                    <Row>{itemCards}</Row>
                </div>
            </div>
        )
    }
}

export default Restaurant;