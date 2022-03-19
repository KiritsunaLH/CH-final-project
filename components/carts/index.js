const { Router }  = require("express");
//
const cartFs  = require("./controllers/cartControllerFs");
const cartMongo = require('./controllers/cartControllerMdb');
const cartFb = require('./controllers/cartControllerFb');

const cartApi = app =>{
    const routerFs = new Router();
    const routerMdb = new Router();
    const routerFb = new Router();
    
    //File
    app.use("/api/cartFs", routerFs);
    routerFs.post("/", cartFs.postCart);
    routerFs.delete("/:id", cartFs.deleteCart);
    routerFs.get("/:id/products", cartFs.getProductsFromCartById);
    routerFs.post("/:id/products", cartFs.postProductToCartById);
    routerFs.delete("/:id/products/:id_prod", cartFs.deleteProductFromCart);

    //MongoDB
    app.use("/api/cartMongo", routerMdb);
    routerMdb.post("/", cartMongo.postCart);
    routerMdb.delete("/:id", cartMongo.deleteCart);
    routerMdb.get("/:id/products", cartMongo.getProductsFromCartById);
    routerMdb.post("/:id/products", cartMongo.postProductToCartById);
    routerMdb.delete("/:id/products/:id_prod", cartMongo.deleteProductFromCart);

    //Firebase
    app.use("/api/cartFb", routerFb);
    routerFb.post("/", cartFb.postCart);
    routerFb.delete("/:id", cartFb.deleteCart);
    routerFb.get("/:id/products", cartFb.getProductsFromCartById);
    routerFb.post("/:id/products", cartFb.postProductToCartById);
    routerFb.delete("/:id/products/:id_prod", cartFb.deleteProductFromCart);
}

module.exports = {
    cartApi
}