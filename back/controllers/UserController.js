const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const getProfile = (req, res) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.json({ error: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.json({ error: "Unauthorized" });
        }

        prisma.user.findUnique({
            where: {
                email: decoded.email
            },
            include: {
                champion: true
            }
        })
        .then((user) => {
            res.json(user);
        })
        .catch((error) => {
            res.json(error);
        });
    });
};

const favoriteChampion = (req, res) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.json({ error: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.json({ error: "Unauthorized" });
        }

        const { championId } = req.body;

        prisma.user.update({
            where: {
                email: decoded.email
            },
            data: {
               championId: Number(req.body.championId)
            }
        })
        .then((user) => {
            res.json(user);
        })
        .catch((error) => {
            res.json(error);
        });
    }); 
}

module.exports = { getProfile, 
    favoriteChampion };

