var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { readFileSync } = require("fs");

const leaked_passwords = () => {
  const contents = readFileSync("top-password.txt", "utf-8");
  const arr = contents.split(/\r?\n/);
  return arr;
};

const weak_password = leaked_passwords();

// Validation rules.
// Validation Array
var loginValidate = [
  // Check Username
  check("username", "Username").trim().escape(),
  // Check Password
  check("password")
    .isLength({ min: 10 })
    .withMessage("Password Must Be at Least 10 Characters")
    .matches("[\x00-\x7F]")
    .withMessage("Password Must Contain be ASCII")
    .trim()
    .escape(),
];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("login", { title: "Question" });
});

router.get("/welcome", function (req, res, next) {
  res.render("welcome", { title: "Question" });
});

router.post("/login", loginValidate, function (req, res, next) {
  const errors = validationResult(req);
  let username = req.body.username;
  let password = req.body.password;
  if (weak_password.includes(password)) {
    console.log("Password Weak");
    return res.redirect("/");
  }
  if (!errors.isEmpty()) {
    console.log(errors.array().map((x) => x.msg));
    return res.redirect("/");
  }
  return res.render("welcome", { title: "Sample App", message: password });
});

module.exports = router;
