import express from 'express';
import addCustomer  from '../controllers/addCustomer.js';
import updateCustomer from '../controllers/updateCustomer.js';
import getAllCustomers from '../controllers/getCustomers.js';
import deleteCustomer from '../controllers/deleteCustomer.js';



const router = express.Router();

router.post('/',addCustomer);
router.put('/:id',updateCustomer);
router.get('/',getAllCustomers);
router.delete('/:id',deleteCustomer);
export default router;