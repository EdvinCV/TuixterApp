/*
    USER CONTROLLER: Here there are the functions to manage all the endpoints of the users, also
    the functions to manage the login and logout endpoints.
*/
// Models
const User = require('./UserModel');
const Profile = require('../profile/profileModel');
// Express validator
const {validationResult} = require('express-validator');
// Bcryptjs
const bcrypt = require('bcryptjs');
// JWT
const jwt = require('jsonwebtoken');

exports.getUsersController = async (req, res) => {
    const users = await User.findAll();
    console.log("USERS", users);
    res.status(200).json({
        ok: true
    });
}

exports.registerUserController = async (req, res) => {
    // If there are errors are returned
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }
    
    let {name, username, email, password, profilePhoto, coverPhoto, biography, location, birthday} = req.body;


    // Find if a username o email already exists
    const usernameFound = await User.findOne({where: {username}});
    const emailFound = await User.findOne({where: {email}});
    if(usernameFound){
        return res.status(400).json({
            ok: false,
            msg: "This username already exists"
        });
    } else if(emailFound){
        return res.status(400).json({
            ok: false,
            msg: "This email already exists"
        });
    }
    try {
        // Hash the password
        var salt = await bcrypt.genSalt(10);
        password = await bcrypt.hashSync(password, salt);
        // Create a profile
        birthday = new Date(birthday);
        const profile = await Profile.create({ profilePhoto, coverPhoto, biography, location, birthday });
        const user = await User.create({profile_id: profile.id, name, username, email, password});
        // Generate the access_token
        const access_token = jwt.sign({user: user.username, email: user.email}, process.env.JWT_SECRET, {});
        res.status(200).json({
            ok: true,
            msg: 'User created',
            data: {
                user,
                profile,
                access_token
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            message: "There was an error"
        });
    }
}

