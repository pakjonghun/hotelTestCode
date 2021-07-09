const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('main');
});

router.get('/review', (req, res) => {
    res.render('postreview');
});


module.exports = router;