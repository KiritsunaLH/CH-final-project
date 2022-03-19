const {ObjectId} = require('mongodb');
let {connection, mongoose} = require("../../../config/database");
let {Schema, model} = mongoose;
let {cartsSchema} = require("../../../models/schemas/cart");
let cartsSchemaModel = new Schema(cartsSchema);
let cartModel = new model('cart', cartsSchemaModel);

class cartMongo{

    async save(data){
        try {
            let new_cart = new cartModel(data);
            new_cart.save();
            return new_cart;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id){
        try {
            return await cartModel.deleteOne({"_id": ObjectId(id)});
        } catch (error) {
            console.log(error);
        }
    }

    async getProductsById(id){
        try {
            let products = await cartModel.findOne({"_id": ObjectId(id)},{products:1,_id:0});
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    async addproductTocartById(id,data){
        try {
            return await cartModel.findOneAndUpdate({"_id": ObjectId(id)},{$push:{products:data}});
        } catch (error) {
            console.log(error);
        }
    }

    async deleteproductcartById(id, id_prod){
        try {
            let {products} = await cartModel.findOne({"_id": ObjectId(id)},{products:1,_id:0});
            console.log(products);
            products = products.filter((product)=>{
                return product.id !== id_prod;
            });
            return await cartModel.findOneAndUpdate({"_id": ObjectId(id)},{$set:{products:products}});
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new cartMongo();