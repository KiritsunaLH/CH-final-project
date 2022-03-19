const { Router }  = require("express");
//
const user  = require("./controller/userControllerMdb");

const usersApi = app =>{
    const router = new Router();
    app.use("/api/user", router);
    router.post("/", user.userPost);
    router.post("/login", user.loginPost);
    router.get("/logout", user.logoutGet);
}

module.exports = {
    usersApi
}