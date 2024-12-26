import { Sequelize } from "sequelize";

// Create a Sequelize instance
const sequelize = new Sequelize('customer', 'root', 'pass', {
  host: 'localhost',
  dialect: 'mysql', 
  logging: false,   
});

export default sequelize; 