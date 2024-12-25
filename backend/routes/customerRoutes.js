import express from 'express';
import  addCustomer  from '../controllers/addCustomer.js';
import updateCustomer from '../controllers/updateCustomer.js';
import getAllCustomers from '../controllers/getCustomers.js';
import deleteCustomer from '../controllers/deleteCustomer.js';



const router = express.Router();

router.post('/customer',addCustomer);
router.put('/customer/:id',updateCustomer);
router.get('/customer',getAllCustomers);
router.delete('/customer/:id',deleteCustomer);
export default router;