module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      size: {
        type: DataTypes.ENUM("S", "M", "L"),
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Product, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    CartItem.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return CartItem;
};
