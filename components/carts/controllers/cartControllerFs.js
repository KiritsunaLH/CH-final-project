const cartServiceFs  = require("../services/cartServiceFs");

class cartFs{

    async postCart(req,res,next){
        const now = new Date();
        const cart = {
            timestamp: now,
            products: req.body.products
        };
        res.json(await cartServiceFs.save(cart));
    }

    async deleteCart(req,res,next){
        let id = parseInt(req.params.id);
        res.json(await cartServiceFs.deleteById(id));
    }

    async getProductsFromCartById(req,res,next){
        const id = parseInt(req.params.id);
        res.send(await cartServiceFs.getProductsById(id));
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
        res.json(await cartServiceFs.addProductToCartById(id,product));
    }
    //Eliminar product del cart por id
    async deleteProductFromCart(req,res,next){
        let id = parseInt(req.params.id);
        let id_prod = parseInt(req.params.id_prod);
        res.json(await cartServiceFs.deleteProductFromCartById(id,id_prod));
    }
}

module.exports = new cartFs();