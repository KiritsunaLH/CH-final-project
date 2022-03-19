const productServiceFs  = require("../services/productServiceFs");
//change to false for non-admin
const administrator = true;

class productFile{
    async getProducts(req,res,next){
        res.send(await productServiceFs.getAll());
    }

    async getProductById(req,res,next){
        const id = parseInt(req.params.id);
        res.send(await productServiceFs.getById(id));
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
            res.json(await productServiceFs.save(product));
        }else{
            const route = req.baseUrl + req.path;
            res.json({"error": -1, "desc":`Route ${route} is unauthorized`});
        }
    }

    async updateProduct(req,res,next){
        if(administrator){
            const now = new Date();
            const id = parseInt(req.params.id);
            const product = {
                timestamp: now,
                name: req.body.name,
                desc: req.body.desc,
                code: req.body.code,
                img: req.body.img,
                price: req.body.price,
                stock: req.body.stock
            };
            res.json(await productServiceFs.updateById(id,product));
        }else{
            const route = req.baseUrl + req.path;
            res.json({"error": -1, "desc":`Route ${route} is unauthorized`});
        }
    }

    async deleteProduct(req,res,next){
        if(administrator){
            let id = parseInt(req.params.id);
            res.json(await productServiceFs.deleteById(id));
        }else{
            const route = req.baseUrl + req.path;
            res.json({"error": -1, "desc":`route ${route} no autorizada`});
        }
    }
}

module.exports = new productFile();