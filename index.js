let express = require("express");
let cors = require("cors");
require('dotenv').config();

const { serverRouter } = require("./routes");
const app = express();
const PORT = process.env.PORT;

//Middlewares
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routes
serverRouter(app);

app.listen(PORT, ()=>{
    console.log(`Conectado a http://localhost:${PORT}`);
});



