const UserSchema = require('../models/User');
const MessageSchema = require('../models/Message');
const HouseSchema = require('../models/Houses');

const resolvers = {
    hello: () => {
        return 'Hello World!';
    },

    user: async (_, {id}) => {
        try{
            return await UserSchema.findOne({id: id});
        }catch(err){
            console.log("error")
        }
    },

    users: async () => {
        try{
            return await UserSchema.find();
        }catch(err){
            console.log("error")
        }
    },

    message: async (_, {id}) => {
        try{
            return await MessageSchema.findOne({_id: id}).populate({
                path: 'from',
                select: '-password'
            }).populate({
                path: 'to',
                
            });
        }catch(err){
            console.log("error")
        }
    },

    messages: async () => {
        try{
            return await MessageSchema.find().populate({
                path: 'from',
                select: '-password'
            }).populate({
                path: 'to',
                select: '-password'
            });
        }catch(err){
            console.log("error")
        }
    },

    houses: async () => {
        try{
            return await HouseSchema.find();
        }catch(err){
            console.log("error")
        }
    },

    house: async (_, {id}) => {
        try{
            return await HouseSchema.findOne({_id: id});
        }catch(err){
            console.log("error")
        }
    },

    userFilterInput: async (_, {filter}) =>{
        try{
            let query = {}

            if(filter){
                if(filter.name){
                    query.name = {
                        $regex: filter.name,
                        $options: 'i'
                    }
                }
                if(filter.lastname){
                    query.lastname = {
                        $regex: filter.lastname,
                        $options: 'i'
                    }
                }
                if(filter.email){
                    query.email = {
                        $regex: filter.email,
                        $options: 'i'
                    }
                }

                const users = await UserSchema.find(query);
                return users
            }
            
        }catch(err){
            console.log("error")
        }
    }
}


module.exports = resolvers;