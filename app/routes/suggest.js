var express = require('express');
var router = express.Router();

var User = require("../core/models/models")

function formatResults(results) {
    return results
}

/* GET users listing. */
router.get('/', function (req, res, next) {
    var query = {};
    const q = req.query.q ? req.query.q : '';
    if (q !== "") {
        query = { $or: [{ "attacker_king": q }, { "defender_king": q }] }
    }
    User.find(query).then((results) => {
        console.log(results);
        res.json({ "count": results.length, "results": results, "status": 1 })
    }).catch((error) => {
        console.log(error)
        res.status(400).json({ "status": 0, "error": "Internal server error" })
    })
});

module.exports = router;
