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
    Payment.hasOne(models.Order, {
      foreignKey: {
        name: "paymentId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Payment;
};
