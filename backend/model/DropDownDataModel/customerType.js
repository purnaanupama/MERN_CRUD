import sequelize from '../../config/dbConfig.js'
import { DataTypes } from 'sequelize'


const CustomerType = sequelize.define('CustomerType',{
    type_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    type:{
        type:DataTypes.STRING,
        allowNull:false
    }
});
export default CustomerType;