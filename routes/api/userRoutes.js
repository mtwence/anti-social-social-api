const router = require("express").Router();

const {
  getUser,
  getTotalUsers,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

router.route("/").post(createUser).get(getTotalUsers);

router.route("/:id").get(getUser).put(updateUser);

router.route("/:id").get(getOneUser).put(updateUser).delete(deleteUser);

router.route("/:id/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
