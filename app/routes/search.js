var express = require('express');
var router = express.Router();

var User = require("../core/models/models")

/* GET users listing. */
router.get('/', function (req, res, next) {
    var query = {};
    const king = req.query.king ? req.query.king : '';
    const type = req.query.type ? req.query.type : '';
    const location = req.query.location ? req.query.location : '';
    if (king !== "") {
        query = { $or: [{ "attacker_king": king }, { "defender_king": king }] }
    }
    if (location !== "") {
        query.location = location;
    }
    if (type !== "") {
        query.battle_type = type;
    }
    console.log(query)
    User.find(query).then((results) => {
        res.json({ "count": results.length, "results": results, "status": 1 })
    }).catch((error) => {
        console.log(error)
        res.status(400).json({ "status": 0, "error": "Internal server error" })
    })
});

module.exports = router;
