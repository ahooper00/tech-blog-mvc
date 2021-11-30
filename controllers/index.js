const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
// const homeRoutes = require('./homeRoutes');

// router.use('/', homeRoutes);
router.get("/homepage", (req, res) => {
  res.render("homepage");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.use("/api", apiRoutes);

module.exports = router;