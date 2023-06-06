const {
  validateRegister,
  validateLogin,
} = require("../validators/auth-validator");
const userService = require("../services/user-service");
const bcryptService = require("../services/bcrypt-service");
const tokenService = require("../services/token-service");
const createError = require("../utils/create-error");

exports.register = async (req, res, next) => {
  try {
    //Validate

    const value = validateRegister(req.body);
    const isUserExist = await userService.checkEmailExist(value.email);
    if (isUserExist) {
      createError("Email address already in use");
    }
    // hash password
    value.password = await bcryptService.hash(value.password);
    // insert to users table
    // Create user
    let user;
    if (value.email === "admin@mail.com") {
      user = await userService.createUser({
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        password: value.password,
        isAdmin: true,
      });
    } else {
      user = await userService.createUser({
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        password: value.password,
        isAdmin: false,
      });
    }
    // sign token and sent respone
    const accessToken = tokenService.sign({ id: user.id });
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);
    const user = await userService.getUserByEmail(value.email);
    if (!user) {
      createError("Invalid credential", 400);
    }
    const isCorrect = await bcryptService.compare(
      value.password,
      user.password
    );
    if (!isCorrect) {
      createError("Invalid credential", 400);
    }
    const accessToken = tokenService.sign({ id: user.id });
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};
