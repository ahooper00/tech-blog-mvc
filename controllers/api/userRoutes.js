const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Get all users
router.get('/', async (req, res) => {
    // Find all users
    try {
        const getUser = await User.findAll(
            {
                include: [Post, Comment]
            },
            {
                attributes: {
                    exclude: ['password']
                },
            },
        );
        res.status(200).json(getUser)
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get one user
router.get('/:id', async (req, res) => {
    // Find one user by its 'id'
    try {
        const findOneUser = await User.findByPk(req.params.id,
            {
                include: [Post, Comment]
            },
            {
                attributes: {
                    exclude: ['password']
                },
                where: {
                    id: req.params.id
                },
                include:
                    [
                        {
                            model: Post,
                            attributes: [
                                'id',
                                'title',
                                'content',
                                'created_at'
                            ]
                        },

                        {
                            model: Comment,
                            attributes: ['id', 'comment_text', 'created_at'],
                            include: {
                                model: Post,
                                attributes: ['title']
                            },
                        },
                        {
                            model: Post,
                            attributes: ['title'],
                        },
                    ]
            },
        );
        if (!findOneUser) {
            res.status(400).json({ message: 'No user found with that id' })
            return
        }
        res.status(200).json(findOneUser)
    } catch (err) {
        res.status(500).json(err)
    }
});

// Create a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(
            {
                username: req.body.username,
                password: req.body.password,
            }
        );

        // Save user id and password
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err)
    }
});

// Login a current user
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        // If the user data (username) doesn't exist in database, throw error message
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, try again.' });
            return;
        }

        const userPassword = await userData.checkPassword(req.body.password);

        // If the user data (password) doesn't exist in database, throw error message
        if (!userPassword) {
            res.status(400).json({ message: 'Incorrect email or password, try again.' });
            return
        }

        // If user data matches what is saved in database, show success message
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;

            res.status(200).json({ message: "Successfully logged in!" })
        });
    } catch (err) {
        res.status(400).json(err)
    }
});

// Logout current user
router.post('/logout', async (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            req.status(204).end();
        })
    } else {
        req.status(404).end();
    }
});

module.exports = router;