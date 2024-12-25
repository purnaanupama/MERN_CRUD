import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js'; // Your Sequelize instance

const Customer = sequelize.define('Customer', {
  cus_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nic: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING, // Use ENUM if you have predefined types
    allowNull: false,
  },
  eligible_for_credit: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  credit_amount: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
  credit_period: {
    type: DataTypes.STRING,
    defaultValue:10
  },
  premium_customer: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  discount_rate: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
}, {
  tableName: 'customer',
  timestamps: true, 
});

export default Customer;