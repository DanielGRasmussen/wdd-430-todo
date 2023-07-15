const express = require("express");
const { join } = require("path");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, _) {
	res.sendFile(join(__dirname, "dist/todo/index.html"));
});

module.exports = router;
