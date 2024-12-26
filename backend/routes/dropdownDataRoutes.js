import express from 'express';
import addCustomerType from '../controllers/DropDownController/addCustomerType.js';
import getCustomerType from '../controllers/DropDownController/getCustomerType.js';
import addPeriodType from '../controllers/DropDownController/addPeriodType.js';
import getPeriodType from '../controllers/DropDownController/getPeriodType.js';



const router = express.Router();

router.post('/',addCustomerType);
router.post('/period',addPeriodType);
router.get('/',getCustomerType);
router.get('/period',getPeriodType);
export default router;