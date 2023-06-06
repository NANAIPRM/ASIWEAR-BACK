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
    ShippingMethod.hasOne(models.Order, {
      foreignKey: {
        name: "shippingMethodId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return ShippingMethod;
};
