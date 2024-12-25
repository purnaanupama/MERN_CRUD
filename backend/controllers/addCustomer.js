import Customer from '../model/customerDetails.js';
import CustomerMobile from '../model/customerMobile.js';
import errorHandler from '../utils/errorHandler.js'

const addCustomer = async (req, res, next) => {
  try {
    const {name, nic, gender, mobile, type, eligible_for_credit, credit_amount, credit_period, premium_customer, discount_rate} = req.body;
    const transaction = await Customer.sequelize.transaction();
    if(nic.length !== 10){
     return next(errorHandler(400,'The NIC number should be 10 digits'))
    }
    if(mobile[0]===mobile[1]){
      return next(errorHandler(400,'Mobile numbers should be different'))
    }
    if(mobile[0]==''||mobile[1]==''){
      return next(errorHandler(400,'Provide 2 mobile numbers'))
    }
    //Check if customer exist with same NIC
    if(nic){
      const customerWithNIC = await Customer.findOne({
        where:{
          nic:nic
        }
      })
      if(customerWithNIC){
        return next(errorHandler(400,'Customer already exist with this NIC'))
      }
    }


    try {
      const customer = await Customer.create(
        { name, nic, gender, type, eligible_for_credit, credit_amount, credit_period, premium_customer, discount_rate },{ transaction }
      );
      const mobiles = Array.isArray(mobile) ? mobile : [mobile];
      for (const number of mobiles) {
        await CustomerMobile.create(
          { customer_id: customer.cus_id, mobile: number },{ transaction }
        );
      }
      await transaction.commit();
      res.status(201).json({
        message: 'Customer and mobile numbers added successfully',
        customer,
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
    } catch (error) {
    res.status(500).json({
      message: 'Error adding customer',
      error: error.message,
    });
  }
};

export default addCustomer;