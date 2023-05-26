const db = require("../util/data/database")
const bcriptjs = require("bcryptjs");

class User{
    constructor(email, password, first_name, last_name, phone_number, shipping_address){
        this.email = email;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_number = phone_number;
        this.shipping_address = shipping_address;
    }

    init_with_req(req){
        this.email = req.body.email,
        this.password = req.body.password,
        this.first_name = req.body['first-name'],
        this.last_name = req.body['last-name'],
        this.phone_number = req.body['phone-number'],
        this.shipping_address = req.body['shipping-address']
    }

    async encrypt(){
        this.password = await bcriptjs.hash(this.password, 12);
    }

    async store_in_DB(){
        await db.getDB().collection("users").insertOne(this)
    }

    async is_occupied(){
        const existingUser = await db.getDB().collection("users").findOne({email: this.email});
        if(existingUser){
            return existingUser._id;
        } else{
            return false;
        }
    }

    async is_password_matching(){
        
    }

    async is_password_correct(){
        const existingUser = await db.getDB().collection("users").findOne({email: this.email});
        return bcriptjs.compare(this.password, existingUser.password);
    }
}

module.exports = User;