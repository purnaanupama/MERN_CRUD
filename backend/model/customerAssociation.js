// associations.js
import Customer from './customerDetails.js';
import CustomerMobile from './customerMobile.js';

export const defineAssociations = () => {
  Customer.hasMany(CustomerMobile, {
    foreignKey: 'customer_id',
    as: 'mobiles',
  });

  CustomerMobile.belongsTo(Customer, {
    foreignKey: 'customer_id',
    as: 'customer',
  });
};
