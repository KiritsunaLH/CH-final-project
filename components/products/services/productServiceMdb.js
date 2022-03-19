const {ObjectId} = require('mongodb');
let {connection, mongoose} = require("../../../config/database");
let {Schema, model} = mongoose;
let {productsSchema} = require("../../../models/schemas/product");
let productsSchemaModel = new Schema(productsSchema);
let productModel = new model('products', productsSchemaModel);

class productMdb{
    async getAll(){
        try {
            let products = await productModel.find();
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id){
        try {
            let product = await productModel.findOne({"_id": ObjectId(id)});
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async save(data){
        try {
            let new_product = new productModel(data);
            new_product.save();
            return new_product;
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(id,data){
        try {
            return await productModel.findOneAndUpdate({"_id": ObjectId(id)},{
                $set:{
                    timestamp:data.timestamp,
                    name:data.name,
                    desc:data.desc,
                    code:data.code,
                    img:data.img,
                    price:data.price,
                    stock:data.stock
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id){
        try {
            return await productModel.deleteOne({"_id": ObjectId(id)});
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new productMdb();