let {db:firebaseDB} = require('../../../utils/firebase');

class ProductFb{
    async getAll(){
        try {
            //Declare empty array
            let firebaseData = [];
            //We select the product collction and get the data
            let product = firebaseDB.collection("product");
            let res = await product.get();
            //Save the product
            res.forEach(elem =>{
                firebaseData.push({id: elem.id, ...elem.data()})
            });
            return firebaseData;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id){
        try {
            //Declare empty array -> select collection and get data -> save in array
            let firebaseData = [];
            let products = firebaseDB.collection("products");
            let res = await products.get();
            res.forEach(elem =>{
                firebaseData.push({id: elem.id, ...elem.data()})
            });
            //We filter the product we want to show
            let product = firebaseData.filter(product=>product.id===id);
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async save(data){
        try {
            let product = firebaseDB.collection("product");
            return await product.doc().set(data);
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(id,data){
        try {
            //Declare empty array -> select collection and get data -> save in array -> update the array
            let firebaseData = [];
            let product = firebaseDB.collection("product");
            let res = await product.get();
            res.forEach(elem =>{
                firebaseData.push({id: elem.id, ...elem.data()})
            });

            firebaseData.forEach(async product =>{
                if(product.id === id){
                    return await product.doc(product.id).update({
                        timestamp: data.timestamp,
                        name: data.name,
                        desc: data.desc,
                        code: data.code,
                        img: data.img,
                        price: data.price,
                        stock: data.stock
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id){
        try {
            //Declare empty array -> select collection and get data -> save in array 
            let firebaseData = [];
            let product = firebaseDB.collection("product");
            let res = await product.get();
            res.forEach(elem =>{
                firebaseData.push({id: elem.id, ...elem.data()})
            });
            //DELEEEEEEEETE
            firebaseData.forEach(async product =>{
                if(product.id === id){
                    return await product.doc(product.id).delete();
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new ProductFb();