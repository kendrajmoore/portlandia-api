const express = require("express");
const router = express.Router();
const Episode = require("../models/episodes");
// const User = require("../models/users.js");
//index;
router.get("/", (req, res) => {
    const currentUser = req.user;
    if (currentUser === null) {
        return res.redirect("/portlandia/user/login");
    }
    Episode.find({})
        .then(episode => {
            res.status(200).json({ episode, message: "Get all episodes" });
        })
        .catch(err => {
            console.log(err.message);
        });
});
//new
router.get("/new", (req, res) => {
    const currentUser = req.user;
    if (currentUser === null) {
        return res.redirect("/portlandia/user/login");
    }
    res.status(200).render("episodes/new.hbs");
});

//create

router.post("/", (req, res) => {
    const episode = new Episode(req.body);
    episode.save();
    res.status(200).json({
        episode,
        message: "You have submitted a new episode"
    });
});
//     Episode.create(req.body, (err, episode) => {
//         res.status(200)
//             .json({
//                 episode,
//                 message: "You have submitted a new episode"
//             })
//             .catch(err => {
//                 console.log(err.message);
//             });
//     });
// });

//show
router.get("/:id", (req, res) => {
    const currentUser = req.user;
    if (currentUser === null) {
        return res.redirect("/portlandia/user/login");
    }
    Episode.findById(req.params.id).then(episode => {
        res.status(200)
            .json({
                episode,
                message: "Here is the episode that you selected"
            })
            .catch(err => {
                console.log(err.message);
            });
    });
});

//Edit
router.get("/:id/edit", (req, res) => {
    Episode.findById(req.params.id, (err, episode) => {
        res.render("episodes/edit.hbs", { episode });
    });
});

router.put("/:id", (req, res) => {
    const currentUser = req.user;
    if (currentUser === null) {
        return res.redirect("/portlandia/user/login");
    }
    Episode.findByIdAndUpdate(req.params.id, req.body, (err, episode) => {
        res.status(200).redirect("/");
    }).catch(err => {
        console.log(err.message);
    });
});
//delete
router.delete("/:id", (req, res) => {
    const currentUser = req.user;
    if (currentUser === null) {
        return res.redirect("/portlandia/user/login");
    }
    Episode.findByIdAndRemove(req.params.id, (err, episode) => {
        res.status(200).redirect("/");
    }).catch(err => {
        console.log(err.message);
    });
});

module.exports = router;
