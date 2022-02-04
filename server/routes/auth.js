import express from 'express'
import User from '../models/user.js'
import argon2, { verify } from 'argon2'
import { default as jwt } from 'jsonwebtoken'
import dotenv from 'dotenv'
import verifyToken from '../middleware/auth.js'

const router = express.Router()

dotenv.config()

/**
 * @route POST api/auth/register
 * @desc Register a user
 * @access public
 */
router.post('/register', async (req, res) => {
    const { username, password } = req.body

    // simple validation
    if (!username || !password) {
        return res
            .status(404)
            .json({ success: false, message: 'Missing username or password' })
    }
    try {
        //check for existing users
        const user = await User.findOne({ username: username })
        if (user) {
            return res.status(400).json({ success: false, message: 'Username already taken' })
        }

        //All good
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({
            username: username,
            password: hashedPassword
        })
        await newUser.save();

        // return token
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)
        // console.log(accessToken);
        return res.json({
            success: true,
            message: "User created successfully",
            accessToken: accessToken
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
})

/**
 * @route POST api/auth/login
 * @desc Login a user
 * @access public
 */
router.post('/login', async (req, res) => {
    const { username, password } = req.body

    // simple validation
    if (!username || !password) {
        return res
            .status(404)
            .json({ success: false, message: 'Missing username or password' })
    }

    try {
        // check username
        const user = await User.findOne({ username: username })
        if (!user) {
            return res.status(400).json({ success: false, message: 'Incorrect username or password' })
        }

        // check password
        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid) {
            return res.status(400).json({ success: false, message: 'Incorrect password or password' })
        }

        // all good
        // return token
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)
        console.log(accessToken);
        return res.json({
            success: true,
            message: "User login successfully",
            accessToken: accessToken
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
})

/**
 * @route GET api/auth
 * @desc Check if user is logged in
 * @access public
 */
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user) {
            return res.status(400).json({
                sccess: false,
                message: 'User not found'
            })
        }
        res.json({
            success: true,
            user: user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
})

export default router;