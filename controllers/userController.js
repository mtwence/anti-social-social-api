const { User, Thought } = require("../models");

// Get a single user by id
const getUser = (req, res) => {
  User.findOne({ _id: req.params._id })
    .populate("thoughts")
    .populate("friends")
    .select("-__v")
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
};

// Get all users
const getTotalUsers = (req, res) => {
  User.find({})
    .select("-__v")
    .sort({ _id: -1 })
    .then((users) => {
      console.log(users);
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

// Create a new user
const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
};

// Update a user by id
const updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params._id },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "There is no user with this id" });
      } else {
        res.json(user);
      }
    })
    .catch((err) => res.status(500).json(err));
};

// Delete user by id and delete associated thoughts
const deleteUser = (req, res) => {
  User.findOneAndDelete({ _id: req.params._id })
    .then((user) => {
      !user
        ? res.status(404).json({ message: "There is no user with that id" })
        : Thoughts.deleteMany({
            _id: { $in: user.thoughts },
          });
      res.status(200).json({ message: "User has been sucessfully deleted" });
    })
    .catch((err) => res.status(500).json(err));
};

// Add friend to user by id
const addFriend = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params._id },
    { $push: { friends: req.params.friendsId } },
    { runValidators: true, new: true }
  )
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "There is no user with this id" });
      } else {
        res.json(user);
      }
    })
    .catch((err) => res.status(500).json(err));
};

// Delete friend by id and remove from user
const deleteFriend = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params._id },
    { $pull: { friends: req.params.friendsId } },
    { new: true }
  )
    .then((user) => {
      if (user) {
        res.json({ message: "A friend has been successfully deleted" });
      } else {
        return res.status(404).json({ message: "There is no user with that id" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports = {
  getUser,
  getTotalUsers,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
};
