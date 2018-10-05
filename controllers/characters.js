const express = require("express");
const router = express.Router();
const Character = require("../models/characters.js");
// const User = require("../models/user.js");
//index;
router.get("/", (req, res) => {
    // const currentUser = req.user;
    // if (currentUser === null) {
    //     return res.redirect("/user/login");
    // }
    Character.find({})
        .then(character => {
            res.send("indexpost", { character });
        })
        .catch(err => {
            console.log(err.message);
        });
});

//new
router.get("/new", (req, res) => {
    res.send("new");
});

//create

// router
//     .post("/", (req, res) => {
//         const episode = new Episode(req.body);
//         post.save();
//         res.redirect("/");
//     })
//     .catch(err => {
//         console.log(err.message);
//     });
//show
router.get("/:id", (req, res) => {
    // const currentUser = req.user;
    Character.findById(req.params.id)
        // .populate("comments")
        .then(character => {
            res.send("show", {
                character
            }).catch(err => {
                console.log(err.message);
            });
        });
});

//Edit
router.get("/:id/edit", (req, res) => {
    Character.findById(req.params.id, (err, character) => {
        res.send("edit", {
            character
        });
    });
});

router.put("/:id", (req, res) => {
    Character.findByIdAndUpdate(req.params.id, req.body, (err, character) => {
        console.log(err);
        res.redirect("/");
    });
});
//delete
router.delete("/:id", (req, res) => {
    Character.findByIdAndRemove(req.params.id, (err, character) => {
        res.redirect("/");
    });
});

module.exports = router;
