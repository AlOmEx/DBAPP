module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      photo: {
        type: DataTypes.BLOB('long'),
        allowNull: true, // Change this based on your requirements
      },
      shipping: {
        type: DataTypes.BOOLEAN,
        allowNull: true, // Change this based on your requirements
      },
    });
  
    Product.associate = (models) => {
      Product.belongsTo(models.Category, {
        foreignKey: 'category_id',
        onDelete: 'CASCADE',
      });
    };
  
    return Product;
  };