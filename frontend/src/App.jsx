import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import ContactTable from './components/ContactTable';
import ContactTable2 from './components/ContactTable2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdAddCircle } from "react-icons/md";
import TemporaryContactDataDisplay from './components/TemporaryContactDataDisplay';


function App() {
  const [period, setPeriod] = useState("");
  const [periodType, setPeriodType] = useState("");
  const [data,setData]=useState({})
  const [customerData, setCustomerData] = useState({
    cus_id: '',
    name: '',
    nic: '',
    gender: 'Male',
    mobile: ['', ''],
    eligible_for_credit: false,
    credit_amount: '',
    credit_period: '',
    premium_customer: false,
    discount_rate: '',
    type: 'Regular',
  });
  const [customers, setCustomers] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/customer-data/customer');
      const data = await response.json();
      setCustomers(data.customers);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const setTableContactData =()=>{
     
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: checked,
      ...(name === 'eligible_for_credit' && !checked ? { credit_amount: '' } : {}),
      ...(name === 'premium_customer' && !checked ? { discount_rate: '' } : {}),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const mobileRegex = /^\d{10}$/;

    if (!customerData.name) newErrors.name = 'Name is required';
    if (!customerData.nic) newErrors.nic = 'NIC is required';
    if (!customerData.mobile[0]) {
      newErrors.mobile1 = 'Mobile 1 is required';
    } else if (!mobileRegex.test(customerData.mobile[0])) {
      newErrors.mobile1 = 'Mobile 1 must be exactly 10 digits';
    }
    if (customerData.mobile[1] && !mobileRegex.test(customerData.mobile[1])) {
      newErrors.mobile2 = 'Mobile 2 must be exactly 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const mobiles = Array.isArray(customerData.mobile) ? customerData.mobile : [customerData.mobile];
    const requestBody = {
      name: customerData.name,
      nic: customerData.nic,
      gender: customerData.gender,
      mobile: mobiles,
      type: customerData.type,
      eligible_for_credit: customerData.eligible_for_credit,
      credit_amount: customerData.eligible_for_credit ? customerData.credit_amount : null,
      credit_period: `${period} ${periodType}`,
      premium_customer: customerData.premium_customer,
      discount_rate: customerData.premium_customer ? customerData.discount_rate : null,
    };
    setData(requestBody);

    const method = customerData.cus_id ? 'PUT' : 'POST';
    const url = customerData.cus_id
      ? `http://localhost:3000/api/customer-data/customer/${customerData.cus_id}`
      : 'http://localhost:3000/api/customer-data/customer';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      const result = await response.json();
      fetchCustomers();

      if (result.status === 'error') {
        toast.error(result.message, { className: 'custom-toast' });
        return;
      }

      setCustomerData({
        cus_id: '',
        name: '',
        nic: '',
        gender: 'Male',
        mobile: ['', ''],
        eligible_for_credit: false,
        credit_amount: '',
        credit_period: '',
        premium_customer: false,
        discount_rate: '',
        type: 'Regular',
      });
      setErrors({});
      toast.success("Customer added successfully", { className: 'custom-toast' });
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleDelete = async (cus_id) => {
    try {
      await fetch(`http://localhost:3000/api/customer-data/customer/${cus_id}`, {
        method: 'DELETE',
      });
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleEdit = (customer) => {
    const [creditPeriod, creditType] = customer.credit_period.split(' ');
    setPeriod(creditPeriod);
    setPeriodType(creditType);
    setCustomerData({
      cus_id: customer.cus_id,
      name: customer.name,
      nic: customer.nic,
      gender: customer.gender,
      mobile: customer.mobiles ? customer.mobiles.map((mobile) => mobile.mobile) : ['', ''],
      eligible_for_credit: customer.eligible_for_credit,
      credit_amount: customer.eligible_for_credit ? customer.credit_amount : '',
      credit_period: customer.credit_period,
      premium_customer: customer.premium_customer,
      discount_rate: customer.premium_customer ? customer.discount_rate : '',
      type: customer.type,
    });
  };

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="App">
        <div style={{ display: 'flex' }}>
          <form onSubmit={handleSubmit} className="customer-form">
            <h3>Add Customer</h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={customerData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}

            <div>
              <p>Select Gender</p>
              <label style={{ marginRight: '12px' }}>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={customerData.gender === 'Male'}
                  onChange={handleChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={customerData.gender === 'Female'}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>

            <div>
              <label>
                Eligible for Credit
                <input
                  type="checkbox"
                  name="eligible_for_credit"
                  checked={customerData.eligible_for_credit}
                  onChange={handleCheckboxChange}
                />
              </label>
            </div>

            {customerData.eligible_for_credit && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <label>
                  Credit Amount
                  <input
                    type="number"
                    name="credit_amount"
                    placeholder="Credit Amount"
                    value={customerData.credit_amount}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Credit Period
                  <select
                    name="periodType"
                    value={periodType}
                    onChange={(e) => setPeriodType(e.target.value)}
                  >
                    <option value="Years">Years</option>
                    <option value="Months">Months</option>
                    <option value="Days">Days</option>
                  </select>
                  <input
                    style={{ width: 50, marginLeft: 10 }}
                    type="number"
                    name="period"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                  />
                </label>
              </div>
            )}

            <div>
              <label>
                Premium Customer
                <input
                  type="checkbox"
                  name="premium_customer"
                  checked={customerData.premium_customer}
                  onChange={handleCheckboxChange}
                />
              </label>
            </div>

            {customerData.premium_customer && (
              <label>
                Discount Rate
                <input
                  type="number"
                  name="discount_rate"
                  placeholder="Discount Rate"
                  value={customerData.discount_rate}
                  onChange={handleChange}
                />
              </label>
            )}

            <div>
              <label>
                Customer Type
                <select
                  name="type"
                  value={customerData.type}
                  onChange={handleChange}
                >
                  <option value="Regular">Regular</option>
                  <option value="Premium">Premium</option>
                </select>
              </label>
            </div>
            <button type="submit">Save Customer</button>
          </form>

          <form className="customer-form2">
            <h3>Add Customer Contact</h3>
            <input
              type="text"
              name="nic"
              placeholder="NIC"
              value={customerData.nic}
              onChange={handleChange}
            />
            {errors.nic && <p className="error">{errors.nic}</p>}

            <div style={{ display: 'flex', gap: 10 }}>
              <label>
                Mobile 1
                <input
                  type="text"
                  name="mobile1"
                  value={customerData.mobile[0]}
                  onChange={(e) => {
                    const newMobile = [...customerData.mobile];
                    newMobile[0] = e.target.value;
                    setCustomerData({ ...customerData, mobile: newMobile });
                  }}
                />
                {errors.mobile1 && <p className="error">{errors.mobile1}</p>}
              </label>

              <label>
                Mobile 2
                <input
                  type="text"
                  name="mobile2"
                  value={customerData.mobile[1]}
                  onChange={(e) => {
                    const newMobile = [...customerData.mobile];
                    newMobile[1] = e.target.value;
                    setCustomerData({ ...customerData, mobile: newMobile });
                  }}
                />
              </label>
              {errors.mobile2 && <p className="error">{errors.mobile2}</p>}
            </div>
            <MdAddCircle onClick={setTableContactData} style={{ fontSize: '30px', cursor: 'pointer' }} />
            <TemporaryContactDataDisplay data={customerData}/>
          </form>
        </div>
        <ContactTable customers={customers} onEdit={handleEdit} onDelete={handleDelete} />
        <ContactTable2 customers={customers} />
      </div>
    </div>
  );
}

export default App;
