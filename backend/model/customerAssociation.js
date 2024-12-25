// associations.js
import Customer from './customerDetails.js';
import CustomerContact from './customerContact.js';

export const defineAssociations = () => {
  Customer.hasMany(CustomerContact, {
    foreignKey: 'customer_id',
    as: 'contact',
  });

  CustomerContact.belongsTo(Customer, {
    foreignKey: 'customer_id',
    as: 'customer',
  });
};
