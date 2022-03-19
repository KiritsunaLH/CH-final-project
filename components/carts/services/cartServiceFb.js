let {db:firebaseDB} = require('../../../utils/firebase');

class cartFs{
    async save(data){
        try {
            let cart = firebaseDB.collection("cart");
            return await cart.doc().set(data);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id){
        try {
            let dataFirebase = [];
            let cart = firebaseDB.collection("cart");
            res.forEach(elem =>{
                dataFirebase.push({id: elem.id, ...elem.data()})
            });
            //DELEEEEEETE
            dataFirebase.forEach(async elem =>{
                if(elem.id === id){
                    return await cart.doc(elem.id).delete();
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    async getProductsById(id){
        try {
            let dataFirebase = [];
            let cart = firebaseDB.collection("cart");
            let res = await cart.get();
            res.forEach(elem =>{
                dataFirebase.push({id: elem.id, ...elem.data()})
            });
            //We filter the product by its ID
            let filtered = dataFirebase.filter(elem=>elem.id===id);
            return filtered[0].products;
        } catch (error) {
            console.log(error);
        }
    }

    async addProductTocartById(id,data){
        try {
            let dataFirebase = [];
            let cart = firebaseDB.collection("cart");
            let res = await cart.get();
            res.forEach(elem =>{
                dataFirebase.push({id: elem.id, ...elem.data()})
            });
            let filtered = dataFirebase.filter(elem=>elem.id===id);
            let productsArray = filtered[0].products;
            //We add new product
            productsArray.push(data);
            //update
            dataFirebase.forEach(async elem =>{
                if(elem.id === id){
                    return await cart.doc(elem.id).update({products:productsArray});
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductFromCartById(id, id_prod){
        try {
            let dataFirebase = [];
            let cart = firebaseDB.collection("cart");
            let res = await cart.get();
            res.forEach(elem =>{
                dataFirebase.push({id: elem.id, ...elem.data()})
            });
            let filtered = dataFirebase.filter(elem=>elem.id===id);
            let productsArray = filtered[0].products;
            //Delete product
            productsArray = productsArray.filter(elem => elem.id!==id_prod);
            //Update
            dataFirebase.forEach(async elem =>{
                if(elem.id === id){
                    return await cart.doc(elem.id).update({products:productsArray});
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new cartFs();