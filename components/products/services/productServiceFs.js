const fs = require("fs");

class ProductFs{
    constructor(url){
        this.url = url;
        this.productArray = [];
    }
    
    async loadArray(){
        //Read the file
        if(fs.existsSync(this.url)){
            const content = await fs.promises.readFile(this.url,'utf-8');
            //Save in array
            this.productArray=(JSON.parse(content));
        }
    }
    
    async getAll(){
        try {
            //Load and print all products
            await this.loadArray();
            return this.productArray;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id){
        try {
            //Load the products and show the one with the chosen ID
            await this.loadArray();
            const selectedProd = this.productArray.filter((product)=>{
                return product.id === id;
            });
            if(!selectedProd.length){
                selectedProd.push({"error":"We couldn't find a product"});
            } 

            return selectedProd;
        } catch (error) {
            console.log(error);
        }
    }
    //Add product
    async save(data){
        try {
            await this.loadArray();
            const arrayLength = this.productArray.length;
            //If a product exist we get the last ID + 1 otherwise the id is 1, then we add and save
            this.productArray.length?data.id = (this.productArray[arrayLength-1].id)+1:data.id = 1;
            this.productArray = [...this.productArray,data]
            await fs.promises.writeFile(this.url,JSON.stringify(this.productArray,"",2));

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(id,data){
        try {
            await this.loadArray();

            const updatedProdId = this.productArray.map((product)=>{
                if(product.id === id){
                    product.timestamp = data.timestamp;
                    product.name = data.name;
                    product.desc = data.desc;
                    product.code = data.code;
                    product.img = data.img;
                    product.price = data.price;
                    product.stock = data.stock;
                }
                return product;
            });

            await fs.promises.writeFile(this.url,JSON.stringify(updatedProdId,"",2));
            //Get product by id
            const selectedProd = updatedProdId.filter(product => product.id === id);

            if(!selectedProd.length){
                selectedProd.push({"error":"We couldn't find the product"});
            } 
            //return updated product
            return selectedProd;
        } catch (error) {
            console.log(error);
        }
    }
    //Eliminar un product según Id
    async deleteById(id){
        try {
            await this.loadArray();
            //Get base quantity
            let baseQnty = this.productArray.length;
            //Get new array without the deleted product 
            this.productArray = this.productArray.filter((product)=>{
                return product.id !== id;
            });
            let finalQnty = this.productArray.length;
            let res;
            if(finalQnty===baseQnty){
                res = {"error":"We couldn't find the product"};
            }else{
                //Save updated array
                await fs.promises.writeFile(this.url,JSON.stringify(this.productArray,"",2));
                res = {"message":"Product deleted"};
            }
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll(){
        try {
            await fs.promises.unlink(this.url);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new ProductFs("./files/products.txt");