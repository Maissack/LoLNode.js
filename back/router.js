const express = require('express');
const championRoutes = require('./routes/ChampionRoutes.js');

const router = express.Router();

router.use('/champions', championRoutes);

module.exports = router;
