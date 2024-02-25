const express = require('express');
const championRoutes = require('./routes/ChampionRoutes.js');
const authRoutes = require('./routes/AuthRoutes.js');
const userRoutes = require('./routes/UserRoutes.js');

const router = express.Router();

router.use('/champions', championRoutes);
router.use('/auth' , authRoutes);
router.use('/user' , userRoutes);

module.exports = router;
