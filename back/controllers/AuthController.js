const bcrypt = require("bcrypt");
const { PrismaClient } = require('@prisma/client');
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();


const signUp = async (req, res) => {
    const { email, pseudo, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    prisma.user.create({
        data: {
            email,
            pseudo,
            password: hashedPassword
        }
    })
    .then((user) => {
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "2h" });

        res.json(token);
    })
    .catch((error) => {
        res.json(error);
    });
}

const logIn = async (req, res) => {
    
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        res.json({ message: "User not found" });
    }
console.log(user.password, password)
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        return res.json({ error: "Password not valid" })
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "2h" });

    res.json(token);

}

module.exports = { signUp, 
    logIn };
