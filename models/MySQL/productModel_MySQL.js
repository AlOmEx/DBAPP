import { DataTypes } from 'sequelize';
import CategoryModel from './categoryModel_MySQL.js';
const ProductModel = (sequelize) => {
  const Product = sequelize.define('Product', {
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
      allowNull: true,
    },
  }, {
    indexes: [
      {
        name: 'idx_price',
        fields: ['price'],
      },
      {
        name: 'idx_createdAt',
        fields: ['createdAt'],
      },
      {
        name: 'idx_categoryId',
        fields: ['category_id'],
      },
    ],
  });
  const Category = CategoryModel(sequelize);


  Product.associate = () => {
    Product.belongsTo(Category, {
      foreignKey: 'category_id',
      onDelete: 'CASCADE',
    });
  };

  return Product;
};

export default ProductModel;