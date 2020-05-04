var express = require('express');
var router = express.Router();

var User = require("../core/models/models")

/* GET search listing. */
router.get('/', function (req, res) {
    var queryDict = {};
    const query = req.query.q ? req.query.q : '';
    if (query !== "") {
        queryDict = {
            $or: [{ "attacker_king": query }, { "defender_king": query },
            { "location": query }, { "region": query }]
        }
    }
    User.find(queryDict).then((results) => {
        res.json({ "count": results.length, "results": results, "status": 1 })
    }).catch((error) => {
        console.log(error)
        res.status(400).json({ "status": 0, "error": "Internal server error" })
    })
});

module.exports = router;
