const { sequelize } = require("../models/");

// sequelize.sync({});
sequelize.sync({ alter: true });
