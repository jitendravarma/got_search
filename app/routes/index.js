var express = require('express');
const path = require('path');

var router = express.Router();

const DIST_DIR = path.join(__dirname, '../views');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
});

module.exports = router;
