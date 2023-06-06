module.exports = (sequelize, DataTypes) => {
  const Size = sequelize.define(
    "Size",
    {
      size: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      underscored: true,
    }
  );
  Size.associate = (models) => {
    Size.hasMany(models.Product, {
      foreignKey: {
        name: "sizeId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Size;
};
