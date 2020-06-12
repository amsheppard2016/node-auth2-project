const router = require("express").Router();
const restricted = require("../auth/restricted-middleware");
const Users = require("./user-model.js");

router.get("/", restricted, (req, res) => {
    Users.find()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => res.send(500).json({ message: "you shall not pass" }));
});

module.exports = router;
