const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
    res.send("Products Router")
})

module.exports = router;