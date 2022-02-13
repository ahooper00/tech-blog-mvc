const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all comments for a particular post
router.get('/', async (req, res) => {
    // Find all comments
    try {
        const getComments = await Comment.findAll({
            include: {
                model: User,
                attributes: ['username']
            }
        });
        res.status(200).json(getComments)
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get one single comment
router.get('/:id', async (req, res) => {
    // Find one comment by its 'id'
    try {
        const findOneComment = await Comment.findByPk(req.params.id, {
            include: [{ model: User }]
        });
        if (!findOneComment) {
            res.status(400).json({ message: 'No comment found with that id' })
            return
        }
        res.status(200).json(findOneComment)
    } catch (err) {
        res.status(500).json(err)
    }
});

// Post a new comment
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            description: req.body.description,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update a comment
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updateComment = await Comment.update({
            description: req.body.description,
        },
            {
                where: {
                    id: req.params.id,
                },
            });

        if (!updateComment) {
            res.status(400).json({ message: 'No comment found with that id' })
            return
        }
        res.status(200).json(updateComment);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;