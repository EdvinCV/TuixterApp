const express = require('express');
const userRouter = express.Router();
// Express Validator
const {body} = require('express-validator');
// Controllers
const {getUsersController, registerUserController} = require('./userController');

userRouter
    .get('/', getUsersController)
    .post('/register', [
            body('name').not().isEmpty(),
            body('username').not().isEmpty(),
            body('email').isEmail(),
            body('password').not().isEmpty()
        ],
        registerUserController);

module.exports = userRouter;