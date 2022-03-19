let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const cartsSchema = new Schema({
    products:[{
        type:Schema.Types.ObjectId,
        ref:'Products',
    }]
})

module.exports = {cartsSchema}