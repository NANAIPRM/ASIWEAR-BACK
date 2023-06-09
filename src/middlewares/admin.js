const createError = require("../utils/create-error");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw createError("Unauthorized", 401);
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      throw createError("Unauthorized", 401);
    }

    const payload = tokenService.verify(token);
    const user = await userService.getUserById(payload.id);
    if (!user || !user.isAdmin) {
      throw createError("Unauthorized", 401);
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
