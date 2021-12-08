import React, { Component } from 'react';
import axios from 'axios';
import ItemCard from "./ItemCard"
import {  Col, Row } from 'react-bootstrap';
import NavigationBar from '../NavigationBar'
import backendServer from "../../webConfig";
import { withApollo } from "react-apollo";
import {getRestaurantQuery} from "../../mutations/queries.js"


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
        console.log("props from login",this.props.location.state);
        if (this.props.location.state) {
            rest_id = this.props.location.state._id || this.props.location.state.RestId
            document.title = this.props.location.state.RestName;
            let res = {
                "RestName": this.props.location.state.RestName,
                "RestId": rest_id
            }
            localStorage.setItem("active_res",JSON.stringify(res) );
        }
        else{
            rest_id = localStorage.getItem("user_id");
        }
        console.log("rest_id",rest_id);

        const params = {
            rest_id : rest_id
        }
       
        const { data } =  this.props.client.query({
            query: getRestaurantQuery,
            variables: {
                restId : rest_id,
            },
        });

        console.log("graphgl data",data);
       
        axios.get(`${backendServer}/restaurant/getRestaurant`, { params })
            .then(response => {
                if (response.data) {
                    rest = response.data;
    
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
                    //var menu_item_string = JSON.stringify(rest.Dishes)
                  

                    this.setState({
                        restData: restData,
                        menu_items: rest.Dishes});
                }
            })
            .catch(error => {
                if (error.response && error.response.data) {
                }
            })


            //MENU


                        
        }


    render() {
        var itemCards = null,
           // noRecordMessage = null,
            restData ="";

        console.log("this state", this.state);
        if(this.state && this.state.restData){
            restData=this.state.restData;

        }
        console.log("this.state", this.state);

        if (this.state && this.state.menu_items) {
            var arr = this.state.menu_items;
            console.log("arr item card prop from rest page:", arr);
            itemCards = arr.map(item => {
                console.log("item", item);
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
                    <tr><h1>{restData.rest_name}</h1>
                    <h3> {restData.rest_city}</h3>     </tr>            
                    <div><img src = {restData.rest_image} alt="Restaurant" style = {{width:"100%", height:"300px", flex :"1"}}></img></div>
                    <div>
                       
                            <tr><td>Contact: {restData.rest_phone} {'    '}</td>
                                <td>Email: {restData.rest_email} {'    '}</td></tr>
                            <tr>
                            <td>Timing: {restData.start_time} - {restData.end_time}</td>
                            </tr>
                          
                    </div>


                    
                </div>
                <div>
                    <Row>{itemCards}</Row>
                </div>
            </div>
        )
    }
}
export default withApollo(Restaurant);