const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
    res.send("Users Router")
})

module.exports = router;