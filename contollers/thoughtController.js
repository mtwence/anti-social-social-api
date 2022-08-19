const { Thoughts, User } = require("../models");

// Get a single thought by id 
const getThought = (req, res) => {
    Thoughts.findOne({ _id: req.params._id })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  };

//   Get all thoughts 
const getTotalThoughts = (req, res) => {
    Thoughts.find({})
    .populate("reactions")
    .select("-__v")
    .sort({ _id: -1 })
    .then((thoughts) => {
      console.log(thoughts);
      res.status(200).json(thoughts);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

// Create a new thought 
const createThought = (req, res) => {
  Thoughts.create(req.body)
    .then(({_id}) => {
      return User.findOneAndUpdate(
        { _id: req.body._id },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
    })
    .then((user) => {
      if (user) {
        res.json({ message: "A thought has been successfully created" });
      } else {
        res.status(404).json({ message: "There is no user with that id" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

// Delete a thought by id and pull from user
const deleteThought = (req, res) => {
  Thoughts.findOneAndDelete({ _id: req.params._id }).then((thought) => {
    if (!thought) {
      res.status(404).json({ message: "There is no thought with this id" });
    }
    return User.findOneAndUpdate(
      { _id: req.params._id },
      { $pull: { thoughts: req.params._id } },
      { new: true }
    )
      .then((user) => {
        if (user) {
          res.json({ message: "A thought has been successfully deleted" });
        } else {
          return res.status(404).json({ message: "There is no user with that id" });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
};

// Update thought by id 
const updateThought = (req, res) => {
  Thoughts.findOneAndUpdate(
    { _id: req.params._id },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((thought) => {
      if (thought) {
        res.json(thought);
      } else {
        return res.status(404).json({
          message: "There is no thought with this id"
        });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

// Create a new reaction for to a thought 
const createReaction = (req, res) => {
  Thoughts.findOneAndUpdate(
    { _id: req.params._id },
    {
      $push: {
        reactions: req.body,
      },
    },
    { runValidators: true, new: true }
  )
    .then((thought) => {
      if (thought) {
        res.json(thought);
      } else {
        res.status(404).json({ message: "There is no thought with this id" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

// Delete a reaction by id and pull from thought
const deleteReaction = (req, res) => {
  Thoughts.findOneAndUpdate(
    { _id: req.params._id },
    { $pull: { reactions: { reactionId: req.params.reactionId } } },
    {
      runValidators: true,
      new: true,
    }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "There is no thought with this id"})
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
};

module.exports = {
  getThought,
  getTotalThoughts,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction, 
};
