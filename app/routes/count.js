var express = require('express');
var router = express.Router();

var User = require("../core/models/models")

/* GET users listing. */
router.get('/', function (req, res, next) {
    User.count().then((count) => {
        res.json({ "count": count, "status": 1 })
    }).catch((error) => {
        console.log(error)
        res.status(400).json({ "msg": "Internal server error", "status": 0 })
    })
});

module.exports = router;
