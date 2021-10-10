import React, { Component } from 'react';
import axios from 'axios';
import ItemCard from "./ItemCard"
import {  Col, Row } from 'react-bootstrap';
import NavigationBar from '../NavigationBar'
import backendServer from "../../webConfig";

class Restaurant extends Component {
    constructor(props) {
        super(props);
        this.setState({
            //menu_sections: [],
            menu_items: []
        });
        //this.sectionItems = this.sectionItems.bind(this);
        //this.getSections();
    }

    componentWillMount() {
       
       //GETTING REST ID
        let rest ="",
            rest_id = "";
        if (this.props.location.state) {
            document.title = this.props.location.state.RestName;
            let res = {
                "RestName": this.props.location.state.RestName,
                "RestId":this.props.location.state.RestId
            }
            rest_id = this.props.location.state.RestId
            localStorage.setItem("active_res",JSON.stringify(res) );
        }
        else{
            rest_id = localStorage.getItem("user_id");
        }
        console.log("rest_id",rest_id);

        const params = {
            rest_id : rest_id
        }
       
        //RESTAURANT DETAILS

        axios.get(`${backendServer}/restaurant/getRestaurant`, { params})
            .then(response => {
                if (response.data) {
                    rest = response.data[0];
    
                    var restData = {
                        rest_id: rest.RestId ,
                        rest_name: rest.RestName ,
                        rest_email: rest.RestEmail,
                        rest_phone: rest.RestPhone,
                        rest_city: rest.RestCity,
                        rest_country: rest.RestCountry,
                        rest_type: rest.RestType,
                        start_time: rest.StartTime,
                        end_time: rest.EndTime,
                        rest_image: rest.RestImage
                    };

                    this.setState({
                        restData: restData});
                }
            })
            .catch(error => {
                if (error.response && error.response.data) {
                }
            })


            //MENU

            var url = 'http://localhost:3001/restaurant/getItems'
            url = url +'?rest_id='+rest_id

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


    render() {
        var itemCards = null,
           // noRecordMessage = null,
            restData ="";

        console.log("this state", this.state);
        if(this.state && this.state.restData){
            restData=this.state.restData;

        }

        if (this.state && this.state.menu_items) {
            var arr = JSON.parse(this.state.menu_items);
            itemCards = arr.map(item => {
                return (
                    <Col sm={3}>
                         <ItemCard res = { {item} }  />
                    </Col>
                );
            });
        }

       
       return (
            <div>
                <NavigationBar/>
                <div>
                    <h1>{restData.rest_name}</h1>                 
                    <div><img src = {restData.rest_image} alt="Restaurant" style = {{width:"100%", height:"300px", flex :"1"}}></img></div>
                    <div>
                            <h5>
                            <tr><td>Contact: {restData.rest_phone} {'   '} </td>
                                <td>Email: {restData.rest_email}</td></tr>
                            <tr><td>Timing: {restData.start_time} - {restData.end_time}</td></tr>
                            </h5>
                    </div>


                    
                </div>
                <div>
                    <Row>{itemCards}</Row>
                </div>
            </div>
        )
    }
}

export default Restaurant;