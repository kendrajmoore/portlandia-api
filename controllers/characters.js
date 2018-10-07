const express = require("express");
const router = express.Router();
const Character = require("../models/characters");
const User = require("../models/users");
//index;
router.get("/", (req, res) => {
    const currentUser = req.user;
    if (currentUser === null) {
        return res.redirect("/portlandia/user/login");
    }
    Character.find({})
        .then(character => {
            res.status(200).json({ character, message: "Get all characters" });
        })
        .catch(err => {
            console.log(err.message);
        });
});

//new
router.get("/new", (req, res) => {
    res.status(200).render("characters/new.hbs");
});

//create

router.post("/", (req, res) => {
    Character.create(req.body, (err, character) => {
        res.status(200)
            .json({
                episode,
                message: "You have submitted a new character"
            })
            .catch(err => {
                console.log(err.message);
            });
    });
});
//show
router.get("/:id", (req, res) => {
    // const currentUser = req.user;
    Character.findById(req.params.id)
        // .populate("comments")
        .then(character => {
            res.staus(200)
                .json({
                    character,
                    message: "Here is the character you selected"
                })
                .catch(err => {
                    console.log(err.message);
                });
        });
});

//Edit
router.get("/:id/edit", (req, res) => {
    Character.findById(req.params.id, (err, character) => {
        res.render("character/edit.hbs", {
            character
        }).catch(err => {
            console.log(err.message);
        });
    });
});

router.put("/:id", (req, res) => {
    Character.findByIdAndUpdate(req.params.id, req.body, (err, character) => {
        res.status(200).redirect("/");
    }).catch(err => {
        console.log(err.message);
    });
});
//delete
router.delete("/:id", (req, res) => {
    Character.findByIdAndRemove(req.params.id, (err, character) => {
        res.status(200).redirect("/");
    }).catch(err => {
        console.log(err.message);
    });
});

module.exports = router;
