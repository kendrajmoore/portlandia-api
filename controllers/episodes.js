const express = require("express");
const router = express.Router();
const Post = require("../models/episodes.js");
// const User = require("../models/user.js");
//index;
router.get("/", (req, res) => {
    // const currentUser = req.user;
    // if (currentUser === null) {
    //     return res.redirect("/user/login");
    // }
    Episode.find({})
        .then(episode => {
            res.send("indexpost", { episode });
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
    Episode.findById(req.params.id)
        // .populate("comments")
        .then(episode => {
            res.send("show", {
                post
            }).catch(err => {
                console.log(err.message);
            });
        });
});

//Edit
router.get("/:id/edit", (req, res) => {
    Episode.findById(req.params.id, (err, episode) => {
        res.send("edit", {
            post
        });
    });
});

router.put("/:id", (req, res) => {
    Episode.findByIdAndUpdate(req.params.id, req.body, (err, episode) => {
        console.log(err);
        res.redirect("/");
    });
});
//delete
router.delete("/:id", (req, res) => {
    Episode.findByIdAndRemove(req.params.id, (err, episode) => {
        res.redirect("/");
    });
});

module.exports = router;
