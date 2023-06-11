module.exports = (sequelize, DataTypes) => {
  const ShippingMethod = sequelize.define(
    "ShippingMethod",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
  ShippingMethod.associate = (models) => {
    ShippingMethod.belongsTo(models.Order, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return ShippingMethod;
};
