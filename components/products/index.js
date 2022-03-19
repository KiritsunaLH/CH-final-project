const { Router }  = require("express");
//
const productMongo = require('./controllers/productControllerMdb');

const productsApi = app =>{
    const routerMdb = new Router();

    app.use("/api/productsMdb", routerMdb);
    routerMdb.get("/",productMongo.getProducts);
    routerMdb.get("/:id", productMongo.getProductById);
    routerMdb.post("/", productMongo.postProduct);
    routerMdb.put("/:id", productMongo.updateProduct);
    routerMdb.delete("/:id", productMongo.deleteProduct);    
}

module.exports = {
    productsApi
}