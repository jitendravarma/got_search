var express = require('express');
var router = express.Router();

var User = require("../core/models/models")

/* GET users listing. */
router.get('/', function (req, res, next) {
    User.distinct("location", { "location": { $ne: "" } }).then((users) => {
        res.json(users)
    }).catch((error) => {
        res.status(400).json("Error: " + err)
    })
});

module.exports = router;
