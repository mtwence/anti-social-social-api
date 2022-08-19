const router = require("express").Router();

const {
  getUser,
  getTotalUsers,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require("../../controllers/userController");

router.route("/").get(getTotalUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

router.route("/:id/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
