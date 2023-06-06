const { sequelize } = require("../models");

// sequelize.sync({});
sequelize.sync({ force: true });
