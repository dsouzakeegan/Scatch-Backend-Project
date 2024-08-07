const userModel = require("../models/user-model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {generateToken} = require('../utils/generateToken');
const productModel = require('../models/product-model');

module.exports.registerUser = async function(req, res) {
    try {
        let { fullname, email, password } = req.body;

        let user = await userModel.findOne({email: email});
        if (user) {
            req.flash("error", "You already have an account, please login.");
            return res.redirect("/");
        }
    
        bcrypt.genSalt(10, function (err, salt){
            bcrypt.hash(password, salt, async function (err, hash){
                if(err) return res.send(err.message);
                else {
                let user = await userModel.create({
                    email,
                    fullname,
                    password: hash
                });
                
                let token = generateToken(user);
                //save token in browser
                res.cookie("token", token)
                res.send("User created Successfully");
                //res.send(hash);
            }
            });
        });

        
    } catch (error) {
        res.send(error.message)
    }
};

module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body;

    //if(!(email && password)) return res.send("incorrect username and password");

    let user = await userModel.findOne({ email: email });
    if (!user) {
        req.flash("error", "Invalid Email");
        return res.redirect("/");
    }

    bcrypt.compare(password, user.password, async function (err, result) {
        //res.send(result);
        if (result) {
            let token = generateToken(user);
            res.cookie("token", token);
            let products = await productModel.find();
            let success = req.flash("success");
            res.render("shop", { products, success });
        }
        else {
            req.flash("error", "Invalid Password");
            return res.redirect("/");
        }
    })
};

module.exports.logout = function (req, res) {
    res.cookie("token", "");
    res.redirect("/");
}