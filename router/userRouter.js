const express = require('express');
const router = express.Router();
const userControlller = require("../controllers/userController");

router.use(express.static('public'));

router.get("/" , userControlller.getLoginPage);

router.post("/signup", userControlller.postUserSignUp);

module.exports = router;