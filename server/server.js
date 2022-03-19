let express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const MongoStore = require('connect-mongo');
let ejs = require('ejs');
let cors = require("cors");
require('dotenv').config();

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.app.engine("ejs", ejs.engine())
        this.app.set("views", "views/ejs")
        this.app.set('view engine', 'ejs')
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(cors("*"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(flash())
        this.app.use(express.static('public'));

        this.app.use(session({
            secret: process.env.SESSION_SECRET,
            store: MongoStore.create({
                mongoUrl:'mongodb+srv://root:coderhouse@cursonode.o3yqn.mongodb.net/proyecto?retryWrites=true&w=majority',
                mongoOptions: {useNewUrlParser:true,useUnifiedTopology:true}
            }),
            cookie:{
                httpOnly:false,
                secure: false,
                maxAge: 1000*60*20
            },
            resave: false,
            saveUninitialized: false
        }))
    }

    routes(){
        this.app.use(this.serverRouter,require("../routes/index"))
    }

    listen(){
        this.server.listen(this.PORT, ()=>{
            console.log(`Conectado a http://localhost:${PORT}`);
        });
    }
}

module.exports = Server
