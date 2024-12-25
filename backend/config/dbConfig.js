import { Sequelize } from "sequelize";

// Create a Sequelize instance
const sequelize = new Sequelize('customer', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', 
  logging: false,   
});

export default sequelize; 