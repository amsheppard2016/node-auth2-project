const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/user-model");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department,
    };

    const options = {
        expiresIn: "2h",
    };
    return jwt.sign(payload, secrets.jwtSecret, options);
}

router.post("/register", async (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    try {
        const savedUser = await Users.add(user);
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log({ username });
        const user = await Users.findBy({ username }).first();
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({ message: `welcome${username}`, token });
        } else {
            res.status(401).json({ message: "invalid creds" });
        }
    } catch (err) {
        res.status(500).json({ message: "you shall not pass" });
    }
});

module.exports = router;
