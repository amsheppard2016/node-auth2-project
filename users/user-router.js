const router = require("express").Router();
const restricted = require("../auth/restricted-middleware");
const Users = require("./user-model.js");

router.get("/", restricted, async (req, res) => {
    try {
        const found = await Users.find();
        if (found) {
            res.status(200).json(found);
        } else {
            res.status(401).json("No User to Display");
        }
    } catch (err) {
        res.send(500).json({ message: "you shall not" });
    }
});

module.exports = router;
