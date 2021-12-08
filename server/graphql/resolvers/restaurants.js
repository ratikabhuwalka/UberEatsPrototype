import {Restaurant, Dish} from '../../models/Restaurant.js';
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import config from "../../utils/config.js";

const resolvers = {
    Query: {
       
    },
    Mutation: {
        
        async loginRestaurant(_, { restaurantLoginInput }) {
            try {
                const { restEmail, restPass } = restaurantLoginInput;
                console.log(restaurantLoginInput)
                const result = await Restaurant.findOne({RestEmail : restEmail})
                if (!result) {
                    throw new Error("Invalid email");
          
                }
                console.log("rest result",result);
                const match = await bcrypt.compare(restPass, result.RestPass);
                if (!match) {
                    throw new Error("Invalid password");  
                }
                const payload = {
                    RestId: result._id,
                    RestName: result.RestName,
                    RestEmail: result.RestEmail,
                    RestType : result.RestType,
                    IsOwner: false
                    };
                const token = jwt.sign(payload, 'jwt_ubereats', {expiresIn: "2h"});
                return "JWT "+token;
               
            } catch(error) {
                console.log("======inside catch:");
                console.log("error==", error);
                throw new Error(error);
               
            }
        },
   
    },
}

module.exports= {resolvers};