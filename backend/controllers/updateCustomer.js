import Customer from '../model/customerDetails.js';
import CustomerContact from '../model/customerContact.js';

const updateCustomer = async (req, res) => {
  const { id } = req.params; 
  const { name, nic, gender, mobile, email, website, type, eligible_for_credit, credit_amount, credit_period, premium_customer, discount_rate } = req.body;

  const transaction = await Customer.sequelize.transaction();

  try {
    // Find the customer by ID
    const customer = await Customer.findByPk(id, { transaction });
    if (!customer) {
      return res.status(404).json({
        message: 'Customer not found',
      });
    }
    // Update customer details
     await customer.update(
      { name, nic, gender, type, eligible_for_credit, credit_amount, credit_period, premium_customer, discount_rate },{ transaction });

    // First, delete existing contact data
    await CustomerContact.destroy({
      where: { customer_id: customer.cus_id },
      transaction,
    });
   //add contact data
    const contact = await CustomerContact.create(
        { customer_id: customer.cus_id, mobile: mobile, website: website, email:email },{ transaction } )

    await transaction.commit();

    res.status(200).json({
      message: 'Customer and mobile numbers updated successfully',
      customer,
      contact 
    });
  } catch (error) {
    // Rollback the transaction 
    await transaction.rollback();
    res.status(500).json({
      message: 'Error updating customer',
      error: error.message,
    });
  }
};

export default updateCustomer;
