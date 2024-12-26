import PeriodType from "../../model/DropDownDataModel/periodType.js";




const getPeriodType =async(req,res)=>{
  try {
    const type = await PeriodType.findAll()
    res.status(201).json({
        message: 'Type retrieved successfully',
        type
      });
  } catch (error) {
    res.status(500).json({
        message: 'Error getting types',
        error: error.message,
      });
  }

}

export default getPeriodType;