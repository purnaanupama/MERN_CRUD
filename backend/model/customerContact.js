import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js'; // Your Sequelize instance
import Customer from './customerDetails.js'; // Import Customer model

const CustomerMobile = sequelize.define('CustomerContact', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Customer,
      key: 'cus_id',
    },
    allowNull: false,
  },
  mobile: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'customer_contact',
  timestamps: true, // Automatically add createdAt and updatedAt
});

export default CustomerMobile;