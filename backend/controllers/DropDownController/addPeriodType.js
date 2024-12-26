import PeriodType from "../../model/DropDownDataModel/periodType.js";

const addPeriodType =async(req,res)=>{
    const {period_type} = req.body;
    if(period_type){
     try {
       const dropdown = await PeriodType.create({period_type})
       res.status(201).json({
           message: 'Type added successfully',
           dropdown 
         });
     } catch (error) {
       res.status(500).json({
           message: 'Error adding type',
           error: error.message,
         });
     }
     }else{
     console.log("No type provided");
    }
   }
   
   export default addPeriodType;