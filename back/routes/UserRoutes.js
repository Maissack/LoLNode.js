const express = require('express');
const { getProfile, favoriteChampion } = require('../controllers/UserController.js');

const router = express.Router();

router.get('/profile', getProfile);
router.post('/favorite', favoriteChampion);

module.exports = router;
