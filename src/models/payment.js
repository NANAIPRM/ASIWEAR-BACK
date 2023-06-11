module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      url: DataTypes.STRING,
      status: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      underscored: true,
    }
  );

  Payment.associate = (models) => {
    Payment.belongsTo(models.Order, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Payment;
};
