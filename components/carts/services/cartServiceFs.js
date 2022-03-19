const fs = require("fs");

class cartFile{
    constructor(url){
        this.url = url;
        this.cartArray = [];
    }
    async loadArray(){
        if(fs.existsSync(this.url)){
            const content = await fs.promises.readFile(this.url,'utf-8');
            this.cartArray=(JSON.parse(content));
        }
    }

    async save(data){
        try {
            await this.loadArray();
            const arrayLength = this.cartArray.length;
            this.cartArray.length?data.id = (this.cartArray[arrayLength-1].id)+1:data.id = 1;
            //add object to the array
            this.cartArray = [...this.cartArray,data]
            await fs.promises.writeFile(this.url,JSON.stringify(this.cartArray,"",2));
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCartById(id){
        try {
            await this.loadArray();
            let baseQnty = this.cartArray.length;
            //New array without the sent object
            this.cartArray = this.cartArray.filter((cart)=>{
                return cart.id !== id;
            });
            let finalQnty = this.cartArray.length;
            //We compare finalQty and baseQnty
            let response;
            if(finalQnty===baseQnty){
                response = {"error":"We couldn't find a cart"};
            }else{
                //We save the updated array
                await fs.promises.writeFile(this.url,JSON.stringify(this.cartArray,"",2));
                response = {"msg":"registry deleted"};
            }
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getProductsById(id){
        try {
            await this.loadArray();
            //Get object by ID
            const selectedCart = this.cartArray.filter((cart)=>{
                return cart.id === id;
            });
            if(!selectedCart.length){
                selectedCart.push({"error":"We couldn't find a product"});
                return selectedCart;
            } else{
                return selectedCart[0].products;
            }
        } catch (error) {
            console.log(error);
        }
    }
    //Agregar product a un cart por id
    async addProductToCartById(id,data){
        try {
            //Cargamos la información del arreglo
            await this.loadArray();
            //Añadimos el product al cart según el Id
            const updatedCarts = this.cartArray.map((cart)=>{
                if(cart.id === id){
                    cart.products.push(data);
                }
                return cart;
            });
            //Guardamos el arreglo actualizado en el archivo
            await fs.promises.writeFile(this.url,JSON.stringify(updatedCarts,"",2));
            //Obtenemos el objeto según el ID
            const selectedCart = updatedCarts.filter(cart => cart.id === id);
            //
            if(!selectedCart.length){
                selectedCart.push({"error":"We couldn't find a cart"});
            } 
            //Devolvemos el objeto con la información actualizada
            return selectedCart;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductFromCartById(id, id_prod){
        try {
            let cartFlag = 0;
            let productFlag = 0;
            await this.loadArray();
            //Update cart by ID
            const updatedCarts = this.cartArray.map((cart)=>{
                if(cart.id === id){
                    cartFlag = 1;
                    const productsArray = cart.products;
                    //return new array
                    const updatedProducts = productsArray.filter((product)=>{
                        return product.id !== id_prod;
                    });
                    cart.products = updatedProducts;
                    if(updatedProducts.length<productsArray.length) productFlag=1;
                }
                return cart;
            });

            let response;
            if(cartFlag===0){
                response = {"error":"We couldn't find a cart"};
            }else if(productFlag===0){
                response = {"error":"We couldn't find a product"};
            }else{
                //We update the array found in the file
                await fs.promises.writeFile(this.url,JSON.stringify(updatedCarts,"",2));
                response = {"msg":"The product was deleted"};
            }
            return response;
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = new cartFile('./files/cart.txt');