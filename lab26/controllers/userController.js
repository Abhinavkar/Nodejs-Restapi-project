const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  const { name, age } = req.body;
  let { password } = req.body;

  if (!name) {
    return res.status(400).json({
      err: "Name Required",
    });
  }

  if (!password) {
    return res.status(400).json({
      err: "Password Required",
    });
  }

  const x = await User.findOne({ name });

  if (x) {
    return res.status(400).json({
      err: "Name Already Exist",
    });
  }

  if (password.length < 5) {
    return res.status(400).json({
      err: "PW Should be atleast 5 Char",
    });
  }

  bcrypt.hash(password, 5).then((hash) => {
    password = hash;
    const user = new User({
      name,
      password,
      age,
    });
    user.save((err, data) => {
      if (err) {
        return res.status(400).json({
          err,
        });
      } else {
        res.status(200).json({
          message: "SuccessFully Signed In",
          name: data.name,
          age: data.age,
          id: data._id,
        });
      }
    });
  });
};

exports.login = async (req, res) => {
  const { name, password } = req.body;

  if (!name) {
    return res.status(400).json({
      err: "Name Required",
    });
  }

  if (!password) {
    return res.status(400).json({
      err: "Password Required",
    });
  }

  User.findOne({ name }, (err, data) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    } else if (!data) {
      return res.status(404).json({
        error: "user not found",
      });
    }

    bcrypt.compare(password, data.password).then(function (result) {
      // console.log(result);
      if (result) {
        return res.status(200).json({
          message: "SuccessFully Logged In",
          name: data.name,
          age: data.age,
          id: data._id,
          token: crypto.randomBytes(48).toString("hex"),
        });
      } else {
        return res.status(404).json({
          message: "Incorrect Password",
        });
      }
    });
  });
};

exports.editUser = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  User.findById(id, (err, data) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    } else if (!data) {
      return res.status(404).json({
        error: "user not found",
      });
    }

    bcrypt.compare(password, data.password).then((result) => {
      if (result) {
        req.body.password = data.password;
        User.findByIdAndUpdate(
          id,
          {
            $set: req.body,
          },
          (err, data) => {
            return res.status(200).json({
              status: "success",
              oldname: data.name,
              newname: req.body.name,
              oldage: data.age,
              newage: req.body.age,
            });
          }
        );
      } else {
        return res.status(400).json({
          message: "Incorrect Password",
        });
      }
    });
  });
};

exports.deleteUser = async (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      return res.status(400).send({ message: "No User found" });
    } else {
      res.status(200).json({
        status: "Deleted",
        name: data.name,
        age: data.age,
        id: data._id,
      });
    }
  });
};

exports.getAll = async (req, res) => {
  User.find((error, data) => {
    if (error) {
      return res.status(400).send({ message: "No User Found" });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};

exports.UserByid = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      return res.status(400).send({ message: "No User Found" });
    } else {
      data.password = undefined;
      res.status(200).json(data);
    }
  });
};

exports.deleteAllUser = async (req, res) => {
  console.log("suhaj");
  User.deleteMany((err, data) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "error while deleteing all employee" });
    } else {
      res.status(200).json({
        status: "success",
        data: data,
      });
    }
  });
};
