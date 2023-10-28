const express = require("express");
const router = express.Router();

const testDao = require("../modules/test-dao.js");

router.get("/", async function(req, res) {

     res.render("home");
});

router.get("/password", async function(req, res) {

     res.render("password");
});



module.exports = router;