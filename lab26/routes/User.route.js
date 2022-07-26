const express = require("express");

const router = express.Router();

const {
  signUp,
  login,
  editUser,
  deleteUser,
  getAll,
  UserByid,
  deleteAllUser,
} = require("../controllers/userController");

router.post("/signUp", signUp);
router.post("/login", login);
router.delete("/users", deleteAllUser);
router.get("/users", getAll);
router.get("/:id", UserByid);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

module.exports = router;
