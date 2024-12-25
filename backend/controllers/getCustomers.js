import Customer from '../model/customerDetails.js';
import CustomerContact from '../model/customerContact.js';

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      include: [
        {
          model: CustomerContact,
          as: 'contact', 
          attributes: ['mobile','email','website'], 
        },
      ],
    });

    if (!customers || customers.length === 0) {
      return res.status(404).json({
        message: 'No customers found',
      });
    }

    res.status(200).json({
      message: 'Customers retrieved successfully',
      customers,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving customers',
      error: error.message,
    });
  }
};

export default getAllCustomers;
