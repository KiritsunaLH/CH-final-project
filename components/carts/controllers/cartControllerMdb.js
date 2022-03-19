const cartServiceMdb  = require("../services/cartServiceMdb");

class cartMongo{

    async postCart(req,res,next){
        const now = new Date();
        const cart = {
            timestamp: now,
            products: req.body.products
        };
        res.json(await cartServiceMdb.save(cart));
    }

    async deleteCart(req,res,next){
        let id = parseInt(req.params.id);
        res.json(await cartServiceMdb.deleteById(id));
    }

    async getProductsFromCartById(req,res,next){
        const id = parseInt(req.params.id);
        res.send(await cartServiceMdb.getProductsById(id));
    }

    async postProductToCartById(req,res,next){
        let id = parseInt(req.params.id);
        const product = {
            id: req.body.id,
            timestamp: req.body.timestamp,
            name: req.body.name,
            desc: req.body.desc,
            code: req.body.code,
            img: req.body.img,
            price: req.body.price,
            stock: req.body.stock
        };
        res.json(await cartServiceMdb.addProductToCartById(id,product));
    }

    async deleteProductFromCart(req,res,next){
        let id = parseInt(req.params.id);
        let id_prod = parseInt(req.params.id_prod);
        res.json(await cartServiceMdb.deleteProductFromCartById(id,id_prod));
    }
}

module.exports = new cartMongo();