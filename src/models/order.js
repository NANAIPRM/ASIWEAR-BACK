module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      orderStatus: {
        type: DataTypes.ENUM("PENDING", "SUCCESS"),
        allowNull: false,
        defaultValue: "PENDING",
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
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

    Order.belongsTo(models.Address, {
      foreignKey: {
        name: "addressId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Order.hasOne(models.ShippingMethod, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Order.hasOne(models.Payment, {
      foreignKey: {
        name: "orderId",
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
  };
  return Order;
};
