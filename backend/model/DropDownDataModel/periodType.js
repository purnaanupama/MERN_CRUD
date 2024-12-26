import sequelize from '../../config/dbConfig.js'
import { DataTypes } from 'sequelize'


const PeriodType = sequelize.define('PeriodType',{
    periodType_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    period_type:{
        type:DataTypes.STRING,
        allowNull:false
    }
});
export default PeriodType;