const productServiceFb  = require("../services/productServiceFb");
//change to false for non-admin
const administrator = true;

class productFirebase{
    async getProducts(req,res,next){
        res.send(await productServiceFb.getAll());
    }

    async getProductById(req,res,next){
        const {params: {id}} = req;
        res.send(await productServiceFb.getById(id));
    }

    async postProduct(req,res,next){
        if(administrator){
            const now = new Date();
            const product = {
                timestamp: now,
                name: req.body.name,
                desc: req.body.desc,
                code: req.body.code,
                img: req.body.img,
                price: req.body.price,
                stock: req.body.stock
            };
            res.json(await productServiceFb.save(product));
        }else{
            const route = req.baseUrl + req.path;
            res.json({"error": -1, "desc":`Route ${route} is unauthorized`});
        }
    }

    async updateProduct(req,res,next){
        if(administrator){
            const now = new Date();
            const {params: {id}} = req;
            const product = {
                timestamp: now,
                name: req.body.name,
                desc: req.body.desc,
                code: req.body.code,
                img: req.body.img,
                price: req.body.price,
                stock: req.body.stock
            };
            res.json(await productServiceFb.updateById(id,product));
        }else{
            const route = req.baseUrl + req.path;
            res.json({"error": -1, "desc":`Route ${route} is unauthorized`});
        }
    }

    async deleteProduct(req,res,next){
        if(administrator){
            const {params: {id}} = req;
            res.json(await productServiceFb.deleteById(id));
        }else{
            const route = req.baseUrl + req.path;
            res.json({"error": -1, "desc":`Route ${route} is unauthorized`});
        }
    }
}

module.exports = new productFirebase();