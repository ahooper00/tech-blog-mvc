const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts in descending order of date (earliest post first)
router.get('/', async (req, res) => {
    // Find all posts
    try {
        const getPosts = await Post.findAll(
            {
                attributes: ['id',
                    'title',
                    'content',
                    'created_at'
                ],
                order: [
                    ['created_at', 'DESC']
                ],
                include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
                ]
            });
        res.status(200).json(getPosts.reverse)
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get one single post
router.get('/:id', async (req, res) => {
    // Find one post by its 'id'
    try {
        const findOnePost = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id',
                'content',
                'title',
                'created_at'
            ],
            include: [{
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
            ]
        });
        if (!findOnePost) {
            res.status(400).json({ message: 'No post found with that id' })
            return
        }
        res.status(200).json(findOnePost)
    } catch (err) {
        res.status(500).json(err)
    }
});

// Create new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update a post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatePost = await Post.update({
            title: req.body.title,
            content: req.body.content,
        },
            {
                where: {
                    id: req.params.id,
                },
            });

        if (!updatePost) {
            res.status(400).json({ message: 'No post found with that id' })
            return
        }
        res.status(200).json(updatePost);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;