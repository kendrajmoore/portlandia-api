const express = require("express");
const router = express.Router();
const Character = require("../models/character.js");

//index;
router.get("/", (req, res) => {
    Character.find({})
        .then(character => {
            res.send("index route", { character });
        })
        .catch(err => {
            console.log(err.message);
        });
});

//new
router.get("/new", (req, res) => {
    res.send("character new");
});

// CREATE
router.post("/", (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    let character = new Character(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    character.save((err, character) => {
        // REDIRECT TO THE ROOT
        return res.redirect(`/character`);
    });
});
//show
router.get("/:id", (req, res) => {
    Character.findById(req.params.id, (err, character) => {
        res.send("show page", {
            character
        }).catch(err => {
            console.log(err.message);
        });
    });
});

//Edit
router.get("/:id", (req, res) => {
    Character.findById(req.params.id, (err, character) => {
        res.send("edit get route", {
            character
        }).catch(err => {
            console.log(err.message);
        });
    });
});

router.put("/:id", (req, res) => {
    Character.findByIdAndUpdate(req.params.id, req.body, (err, character) => {
        console.log(err);
        res.redirect("/character");
    });
});
//delete
router.delete("/:id", (req, res) => {
    Character.findByIdAndRemove(req.params.id, (err, character) => {
        res.redirect("/character");
    });
});

module.exports = router;
