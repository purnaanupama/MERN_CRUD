import CustomerType from "../../model/DropDownDataModel/customerType.js";


const getCustomerType =async(req,res)=>{

  try {
    const type = await CustomerType.findAll()
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

export default getCustomerType;