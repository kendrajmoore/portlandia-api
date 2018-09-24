const express = require("express");
const router = express.Router();
const Character = require("../models/character.js");

//index;
router.get("/", (req, res) => {
    Post.find({})
        .then(post => {
            res.render("posts/index.hbs", { post, currentUser });
        })
        .catch(err => {
            console.log(err.message);
        });
});

//new
router.get("/new", (req, res) => {
    res.render("posts/new.hbs");
});

//create
// CREATE
  app.post('/', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    var post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  });

};
//show
router.get("/:id", (req, res) => {
    const currentUser = req.user;
    Post.findById(req.params.id)
        .populate("comments")
        .then(post => {
            res.render("posts/show.hbs", {
                post: post,
                currentUser: currentUser
            }).catch(err => {
                console.log(err.message);
            });
        });
});

//Edit
router.get("/:id/edit", (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        res.render("posts/edit.hbs", {
            post: post
        });
    });
});

router.put("/:id", (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
        console.log(err);
        res.redirect("/post");
    });
});
//delete
router.delete("/:id", (req, res) => {
    Post.findByIdAndRemove(req.params.id, (err, post) => {
        res.redirect("/post");
    });
});

module.exports = router;
