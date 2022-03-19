let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const productsSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
        default:"No description"
    },
    img: {
        type:String,
        required:true
    },
    stock: {
        type:Number,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
    code: {
        type:String,
        required:true,
        unique: true
    }
})


module.exports = {productsSchema}