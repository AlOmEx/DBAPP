import { DataTypes } from 'sequelize';
import UserModel from './userModel_MySQL';
import ProductModel from './productModel_MySQL';
const OrderModel = (sequelize) => {
  const Order = sequelize.define('Order', {
    // You can define the properties of your Order here
    // For example, you might want to include a reference to the user who placed the order
    userId: {
      type: DataTypes.INTEGER, // Change the data type accordingly
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Accepted', 'Rejected'), // Define possible order statuses
      defaultValue: 'Pending',
      allowNull: false,
    },
  });

  const User = UserModel(sequelize);
  const Product = ProductModel(sequelize);
  // Define associations with other models if necessary
  Order.associate = (models) => {
    // Example: An order belongs to a user
    Order.belongsTo(User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    // Example: An order can have multiple products
    Order.belongsToMany(Product, {
      through: 'OrderProducts', // Create a junction table if needed
      foreignKey: 'orderId',
    });
  };

  return Order;
};

export default OrderModel;