import CustomerType from "../../model/DropDownDataModel/customerType.js";


const addCustomerType =async(req,res)=>{
 const {type} = req.body;
 if(type){
  try {
    const dropdown = await CustomerType.create({type})
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

export default addCustomerType;