const express = require("express");
const router = express.Router();
const {obtainEmail, sendMail, homePage} = require("../controllers/index");

// router.get("/",obtainEmail);
router.get("/:id",obtainEmail).get("/",homePage);
router.route("/motivate/send").get(sendMail);
// router.route("/send").get(sendMail);

module.exports = router;