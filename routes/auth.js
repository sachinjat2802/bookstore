import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { secretOrKey } from '../config/keys.js';
import { validateLoginInput, validateRegisterInput } from '../middleware/validation.js';

const router = express.Router();

router.post('/register',validateRegisterInput, async (req, res) => { 
    const { email, password } = req.body;
    const user = await User.findOne({
        email
    });
    if (user) {
        return res.status(400).json({
            email: 'Email already exists'
        });
    }
    const newUser = new User({
        email,
        password
    });
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            await newUser.save();
            res.json(newUser);
        });
    });

}   
);

router.post('/login',validateLoginInput, async (req, res) => {
    const { email, password } = req.body;
    const user

        = await User.findOne({
            
            email
        });
    if (!user) {
        return res.status(404).json({
            email: 'User not found'
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        const payload = {
            id: user.id,
            email: user.email
        };
        jwt.sign(payload, secretOrKey, {
            expiresIn: 3600
        }, (err, token) => {
            res.json({
                success: true,
                token: 'Bearer ' + token
            });
        });
    } else {
        return res.status(400).json({
            password: 'Password incorrect'
        });
    }
}
);




export default router; // Make sure to export the router
