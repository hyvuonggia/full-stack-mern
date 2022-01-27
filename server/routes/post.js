import express from 'express'
import Post from '../models/post.js'
import verifyToken from '../middleware/auth.js'

const router = express.Router()

/**
 * @route POST /api/posts
 * @desc Create post
 * @access private
 */
router.post('/', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;

    //simple validation
    if (!title) {
        return res.status(400).json({ success: false, message: 'Title is required' });
    }

    try {
        const newPost = new Post({
            title: title,
            description: description,
            url: (url.startsWith('https://')) ? url : `https://${url}`,
            status: status || "TO_LEARN",
            user: req.userId,
        })

        await newPost.save();

        res.json({ success: true, message: 'Happy learning', post: newPost });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
})

/**
 * @route GET /api/posts
 * @desc Read posts
 * @access private
 */
router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', ['username']);
        res.json({ success: true, posts: posts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
})

/**
 * @route PUT /api/posts/:id
 * @desc Update post
 * @access private
 */
router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;

    //simple validation
    if (!title) {
        return res.status(400).json({ success: false, message: 'Title is required' });
    }

    try {
        let updatedPost = {
            title: title,
            description: description || "",
            url: ((url.startsWith('https://')) ? url : `https://${url}`) || '',
            status: status || "TO_LEARN",
        }

        const postUpdateCondition = {
            _id: req.params.id,
            user: req.userId
        }

        updatedPost = await Post.findOneAndUpdate(postUpdateCondition, updatedPost, { new: true })

        //user not authorized to updated post or post not found
        if (!updatedPost) {
            return res.status(401).json({
                success: false,
                message: "Post not found or user not authorized"
            })
        }
        res.json({
            success: true,
            message: "Updated post",
            post: updatedPost
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
})

/**
 * @route DELETE /api/posts/:id
 * @desc Delete post
 * @access private
 */
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const postDeleteCondition = {
            _id: req.params.id,
            user: req.userId
        }
        const deletedPost = await Post.findByIdAndDelete(postDeleteCondition)

        //user not authorized to updated post or post not found
        if (!deletedPost) {
            return res.status(401).json({
                success: false,
                message: "Post not found or user not authorized"
            })
        }

        res.json({
            success: true,
            post: deletedPost
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
})

export default router