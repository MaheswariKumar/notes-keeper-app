const User = require("../model/User");
const crypto = require("crypto");
const util = require("util");

const scrypt = util.promisify(crypto.scrypt);

const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                message : "Need to update Required fields for Signup"
            })
        }

        const {username, email, password} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message : "Need to update username, email, password to signup"
            })
        }

        const userInfo = await User.findOne({$or : [{userName : username}, {email : email}]});

        if (userInfo) {
            if (userInfo.userName === username) {
                return res.status(400).json({
                    message : "Username is already in use"
                })
            }

            if (userInfo.email === email) {
                return res.status(400).json({
                    message : "email is already in use"
                })
            }
        }

        const {hashpassword, salt} = await encryptPassword(password);

        const newUser = await User.create({
            userName : username,
            email : email,
            password : hashpassword.toString("hex"),
            salt : salt
        })

        const token = await makeToken(newUser._id);

        return res.status(201).json({
            message : "New User Signed Up Successfully",
            newuser : newUser,
            token : token
        })
    }
    catch(err) {
        console.log(err);
        return res.status(501).json({
            message : "Internal Server Error"
        })
    }
}

async function encryptPassword(password) {
    const salt = crypto.randomBytes(9).toString("hex");

    const hashpassword = await scrypt(password, salt, 64);

    return {hashpassword, salt};
}

async function makeToken(id) {
    try {
        return jwt.sign({id:id}, process.env.JWT_SECRET);
    }
    catch(err) {
        return err
    }
}

const login = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                message : "Fields are required to login"
            })
        }

        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message : "Email & Password are required"
            })
        }

        const userInfo = await User.findOne({email : email});

        if (!userInfo) {
            return res.status(404).json({
                message : "User is not found with a given email ID"
            })
        }

        const pass = await checkpassword(password, userInfo.salt, userInfo.password);

        if (!pass) {
            return res.status(401).json({
                message : "Password is incorrect"
            })
        }

        const token = await makeToken(userInfo._id);

        return res.status(200).json({
            message : "Logged in Successfully",
            userInfo : userInfo,
            token : token
        })
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}

async function checkpassword(password, salt, hashpassword) {
    const generateNewPassword = await scrypt(password, salt, 64);

    return generateNewPassword.toString("hex")===hashpassword;
}

module.exports = {
    signUp,
    login
}