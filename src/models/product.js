module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      productName: {
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
      gender: {
        type: DataTypes.ENUM("male", "female"),
        allowNull: false,
      },
      img1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      img2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      img3: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sizeS: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      sizeM: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      sizeL: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      underscored: true,
    }
  );

  Product.associate = (models) => {
    Product.hasOne(models.CartItem, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Product.hasMany(models.OrderItem, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Product;
};
