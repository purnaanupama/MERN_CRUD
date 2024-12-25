import Customer from '../model/customerDetails.js';
import CustomerMobile from '../model/customerMobile.js';

const updateCustomer = async (req, res) => {
  const { id } = req.params; // Assuming the customer ID is passed in the URL
  const {
    name,
    nic,
    gender,
    mobile, 
    type,
    eligible_for_credit,
    credit_amount,
    credit_period,
    premium_customer,
    discount_rate,
  } = req.body;

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
      {
        name,
        nic,
        gender,
        type,
        eligible_for_credit,
        credit_amount,
        credit_period,
        premium_customer,
        discount_rate,
      },
      { transaction }
    );

    // Update or add mobile numbers
    const mobiles = Array.isArray(mobile) ? mobile : [mobile];

    // First, delete existing mobiles for this customer
    await CustomerMobile.destroy({
      where: { customer_id: customer.cus_id },
      transaction,
    });

    // Then, add the new mobiles
    for (const number of mobiles) {
      await CustomerMobile.create(
        {
          customer_id: customer.cus_id,
          mobile: number,
        },
        { transaction }
      );
    }

    // Commit the transaction
    await transaction.commit();

    res.status(200).json({
      message: 'Customer and mobile numbers updated successfully',
      customer,
    });
  } catch (error) {
    // Rollback the transaction if something goes wrong
    await transaction.rollback();
    res.status(500).json({
      message: 'Error updating customer',
      error: error.message,
    });
  }
};

export default updateCustomer;
