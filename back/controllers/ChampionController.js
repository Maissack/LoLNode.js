const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getChampions = async (req, res) => {
    try {
        const champions = await prisma.champion.findMany();
        res.json(champions);
    } catch (error) {
        res.json(error);
    }
};

const getChampion = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const champion = await prisma.champion.findUnique({
            where: {
                id: id
            }
        });
        res.json(champion);
    } catch (error) {
        res.json(error);
    }
};

const createChampion = async (req, res) => {
    try {
        const champion = req.body;
        const createdChampion = await prisma.champion.create({
            data: {
                name: champion.name,
                type: champion.type
            }
        });
        res.json(createdChampion);
    } catch (error) {
        res.json(error);
    }
};

const updateChampion = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const champion = req.body;
        const updatedChampion = await prisma.champion.update({
            where: {
                id: id
            },
            data: {
                name: champion.name,
                type: champion.type
            }
        });
        res.json(updatedChampion);
    } catch (error) {
        res.json(error);
    }
};

const deleteChampion = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const deletedChampion = await prisma.champion.delete({
            where: {
                id: id
            }
        });
        res.json(deletedChampion);
    } catch (error) {
        res.json(error);
    }
};

// Fonction pour semer (seed) les champions depuis un fichier JSON
const seedChampions = async (req, res) => {
    try {
        const championsData = require('../path/to/champions.json'); // Remplacez le chemin par le bon chemin de votre fichier JSON
        const createdChampions = await prisma.champion.createMany({
            data: championsData
        });
        res.json(createdChampions);
    } catch (error) {
        res.json(error);
    }
};

module.exports = {
    getChampions,
    getChampion,
    createChampion,
    updateChampion,
    deleteChampion,
    seedChampions // Ajout de la fonction seedChampions
};
