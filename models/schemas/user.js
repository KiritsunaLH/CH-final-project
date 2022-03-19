let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
        default:"avatar"
    },
    age:{
        type:Number,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cart:[{
        type:Array
    }]
})

const userModel = mongoose.model("user", userSchema, "user");

module.exports = userModel;