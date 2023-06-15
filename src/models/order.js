module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      orderStatus: {
        type: DataTypes.ENUM("PENDING", "SUCCESS"),
        allowNull: false,
        defaultValue: "PENDING",
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      payment: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Order.hasMany(models.OrderItem, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Order.hasOne(models.Address, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return Order;
};
