const {ObjectId} = require('mongodb');
let {connection, mongoose} = require("../../../config/database");
let {Schema, model} = mongoose;
let {usersSchema} = require("../../../models/schemas/user");
let usersSchemaModel = new Schema(usersSchema);
let UserModel = new model('products', usersSchemaModel);
const bcrypt = require('bcrypt');

class User{
    //User registration
    async save(data){
        try {
            let new_user = new UserModel(data);
            new_user.save();
            //Enviamos la notification
            notification.sendMail("New Register",`
            <h1>Created User</h1>
                <table border='1'>
                    <tr>
                        <th>name</th>
                        <th>E-mail</th>
                        <th>Phone</th>
                    </tr>
                    <tr>
                        <td>${new_user.name}</td>
                        <td>${new_user.email}</td>
                        <td>${new_user.phone}</td>
                    </tr>
                </table>`);
            return new_user;
        } catch (error) {
            console.log(error);
        }
    }

    async login(data){
        try {
            let user = await UserModel.findOne({"email":data.email});
            //return user;
            if(!user){
                return 0;
            }else if(user && bcrypt.compareSync(data.password,user.password)){
                let user_resp = {
                    "_id": ObjectId(user._id),
                    email: user.email,
                    name: user.name,
                    phone: user.phone,
                    avatar: user.avatar
                }
                return user_resp;
            }else{
                return 1;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new User();