const express = require('express');
const {
  getChampions,
  getChampion,
  createChampion,
  updateChampion,
  deleteChampion,
  seedChampions 
} = require('../Controllers/ChampionController.js');

const router = express.Router();

router.get('/', getChampions);
router.get('/:id', getChampion);
router.post('/', createChampion);
router.put('/:id', updateChampion);
router.delete('/:id', deleteChampion);
router.post('/seed', seedChampions);

router.post('/seed', async (req, res) => {
    await seedChampions();
    res.json({ message: 'Champions seeded successfully!' });
  });

module.exports = router;
