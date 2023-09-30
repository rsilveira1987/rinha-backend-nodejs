const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.status(200).send({
        success: 'true',
        message: 'Welcome to Node.js Rinha Backend 2023 API',
        version: '1.0.0'
    });
});

module.exports = router;