import { Router } from "express";
import userSchema from "../models/userModel.js";
import nedb from 'nedb-promises';

const usersDB = new nedb({ filename: '../databases/users.db', autoload: true });
const router = Router();

// logga in
router.post('/login', async (req, res) => {
    try {
        console.log('Login attempt:', req.body);
        const { error } = userSchema.validate(req.body);
        if (error) {
            console.log('Validation error:', error.details[0].message);
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        const { username, password } = req.body;
        const user = await usersDB.findOne({ username, password });

        if (user) {
            console.log('User found:', user);
            global.currentUser = user;
            return res.json({ success: true, message: 'Login successful', user });
        } else {
            console.log('Invalid credentials');
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ success: false, message: 'Server error', error });
    }
});

// Registera
router.post('/register', async (req, res) => {
    try {
        console.log('Registration attempt:', req.body);
        const { error } = userSchema.validate(req.body);
        if (error) {
            console.log('Validation error:', error.details[0].message);
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        const { username, password } = req.body;
        const existingUser = await usersDB.findOne({ username });

        if (existingUser) {
            console.log('User already exists:', existingUser);
            return res.status(400).json({ success: false, message: 'User already exists' });
        } else {
            await usersDB.insert({ username, password });
            console.log('User registered:', { username, password });
            return res.json({ success: true, message: 'Registration successful' });
        }
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ success: false, message: 'Server error', error });
    }
});

export default router;