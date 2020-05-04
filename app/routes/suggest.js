var express = require('express');
var router = express.Router();

var User = require("../core/models/models")

function formatResults(results) {
    var finalResults = [];
    var temp = [];
    if (results.length > 0) {
        results.map((item) => {
            if (!temp.includes(item.location)) {
                finalResults.push({ 'label': item.location });
                temp.push(item.location);
            }
            if (!temp.includes(item.defender_king)) {
                finalResults.push({ 'label': item.defender_king });
                temp.push(item.defender_king);
            }
            if (!temp.includes(item.attacker_king)) {
                finalResults.push({ 'label': item.attacker_king });
                temp.push(item.attacker_king);
            }
        })
    }
    return finalResults;
}

/* GET users listing. */
router.get('/', function (req, res, next) {
    var query = {};
    const q = req.query.q ? req.query.q : '';
    if (q !== "") {
        query = { $text: { "$search": q } }
    }
    User.find(query).then((results) => {
        results = formatResults(results)
        res.json({ "count": results.length, "results": results, "status": 1 })
    }).catch((error) => {
        console.log(error)
        res.status(400).json({ "status": 0, "error": "Internal server error" })
    })
});

module.exports = router;
