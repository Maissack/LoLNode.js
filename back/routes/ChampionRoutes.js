const express = require('express');
const {
  getChampions,
  getChampion,
  createChampion,
  updateChampion,
  deleteChampion
} = require('../Controllers/ChampionController.js');

const router = express.Router();

router.get('/', getChampions);
router.get('/:id', getChampion);
router.post('/', createChampion);
router.put('/:id', updateChampion);
router.delete('/:id', deleteChampion);

module.exports = router;
