import Customer from '../model/customerDetails.js';
import CustomerContact from '../model/customerContact.js';

const deleteCustomer = async (req, res) => {
  const { id } = req.params; 

  try {
    const transaction = await Customer.sequelize.transaction();
    try {
      const customer = await Customer.findOne({
        where: { cus_id: id },
        include: {
          model: CustomerContact,
          as: 'contact', 
        },
        transaction, 
      });
      if (!customer) {
        return res.status(404).json({
          message: 'Customer not found',
        });
      }
      await CustomerContact.destroy({
        where: { customer_id: customer.cus_id },
        transaction, 
      });

      await customer.destroy({ transaction });
      await transaction.commit();

      res.status(200).json({
        message: 'Customer and associated mobile numbers deleted successfully',
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting customer',
      error: error.message,
    });
  }
};

export default deleteCustomer;
