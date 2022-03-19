const mongoose = require("mongoose");
const {Config} = require('./index');

let connection;
(async ()=>{
    try {
        connection = mongoose.connect(Config.mongoAtlasURI, {useNewUrlParser:true,useUnifiedTopology: true });
        console.log("---------------------------------------------");
        console.log("Conexión establecida!");
    } catch (error) {
        console.log(error);
    }
})();

module.exports = {connection, mongoose}