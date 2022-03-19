const userService  = require("../services/userService");
const bcrypt = require('bcryptjs');

class User{
    //Registrar user
    async postUser(req,res,next){
        const now = new Date();
        const user = {
            timestamp: now,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,10),
            name: req.body.name,
            address: req.body.address,
            age: req.body.age,
            phone: req.body.phone,
            avatar: req.body.avatar
        };
        res.json(await userService.save(user));
    }
    //Login de user
    async postLogin(req,res,next){
        const userLogin = {
            email: req.body.email,
            password: req.body.password
        };
        let loging = await userService.login(userLogin);
        console.log(loging);
        if(loging != null){
            if(loging == 0){
                console.log("The user doesn't exist");
                res.status(404).send({idMessage: "0", message:"This user doesn't exist"});
                //res.render("../noExisteuser", {});
            }else if(loging==1){
                console.log("Wrong password");
                res.status(400).send({idMessage:"1", message:"Wrong Password"});
                //res.render("../credencialesNoSonCorrectas", {});
            }else{
                console.log("loging correcto");
                req.session.iduser = loging._id;
                req.session.name = loging.name;
                req.session.email = loging.email;
                req.session.phone = loging.phone;
                req.session.avatar = loging.avatar;
                //console.log("---------------------F--------------------");
                //console.log(req.session.name);
                res.status(300).send({idMessage:"2", data:loging});
                //res.render("../index", {data:await contenedor.getAll(),name:user.name, correo:user.email});
            }
        }else{
            console.log("Server internal error");
            res.status(500).send({idMessage:"3", message:"Internal error from the server"});
        }
    }

    async logoutGet(req,res,next){
        let username = req.session.name;
        req.session.destroy(err=>{
            if(err) res.send(JSON.stringify(err));
            res.status(200).send({message:`${username} has logged out`});
            //res.render("../logout",{name:nameuser});
        });
    }
}

module.exports = new User();