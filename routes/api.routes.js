const express = require('express');
const router = express.Router();

const ruletaRouter = require('./ruleta.routes');

router.use('/ruleta', ruletaRouter);

module.exports = router;