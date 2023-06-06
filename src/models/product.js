module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      discountPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imgUrl1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imgUrl2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imgUrl3: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
    }
  );

  Product.associate = (models) => {
    Product.hasMany(models.Cart, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Product.belongsTo(models.Size, {
      foreignKey: {
        name: "sizeId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Product.hasOne(models.OrderItem, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Product;
};
