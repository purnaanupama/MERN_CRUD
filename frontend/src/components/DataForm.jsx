
import React, { useState, useEffect } from 'react';
import '../App.css';
import CustomerTable from './CustomerTable';
import ContactTable from './ContactTable';
import { toast } from 'react-toastify';
import '../css/custom_toast.css';
import { MdAddCircle } from "react-icons/md";
import TemporaryContactDataDisplay from './TemporaryContactDataDisplay';


const DataForm = () => {
    const [period, setPeriod] = useState("");
    const [periodType, setPeriodType] = useState("");
    const [periodTypeDB, setPeriodTypeDB] = useState("");
    const [data,setData]=useState({})
    const [customerData, setCustomerData] = useState({cus_id:'',name:'',nic:'',gender:'Male',website:'',email:'',mobile: '',eligible_for_credit: false,credit_amount: '',credit_period: '',customer:false,discount_rate:'', type:'Regular'});
    const [customers, setCustomers] = useState([]);
    const [errors, setErrors] = useState({});
    const [dropdownType,setDropdrownType] = useState([])

    const getContact =()=>{
      setData(customerData)
    }
    useEffect(() => {
      fetchCustomers();
      fetchDropDrownType();
      fetchPeriodType();
    },[]);
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/customer');
        const data = await response.json();
        setCustomers(data.customers);
        console.log(data.customers);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };


    const fetchDropDrownType = async() =>{
      try {
        const response = await fetch('http://localhost:3000/api/dropdown');
        const data = await response.json();
        setDropdrownType(data.type)
        console.log(data.type);
      } catch (error) {
        console.log(error); 
      }
    }

    const fetchPeriodType = async() =>{
      try {
        const response = await fetch('http://localhost:3000/api/dropdown/period');
        const data = await response.json();
        setPeriodTypeDB(data.type)
        console.log(data.type);
      } catch (error) {
        console.log(error); 
      }
    }
    const handleChange = (e) => {
      const { name, value } = e.target;
      setCustomerData((prevData) => ({
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
      if (!customerData.email) newErrors.email = 'Email required';
      if (!customerData.website) newErrors.website = 'Website required';
      if (!customerData.mobile) {newErrors.mobile = 'Mobile number required';}
      if (customerData.mobile && !mobileRegex.test(customerData.mobile)) {
        newErrors.mobile = 'Mobile number must be exactly 10 digits';
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;
      const requestBody = {
        name: customerData.name,
        nic: customerData.nic,
        gender: customerData.gender,
        email: customerData.email,
        website: customerData.website,
        mobile: customerData.mobile,
        type: customerData.type,
        eligible_for_credit: customerData.eligible_for_credit,
        credit_amount: customerData.eligible_for_credit ? customerData.credit_amount : null,
        credit_period: `${period} ${periodType}`,
        premium_customer: customerData.premium_customer,
        discount_rate: customerData.premium_customer ? customerData.discount_rate : null,
      };
      setData(requestBody);
      console.log(requestBody);
      
      const method = customerData.cus_id ? 'PUT' : 'POST';
      const url = customerData.cus_id
        ? `http://localhost:3000/api/customer/${customerData.cus_id}`
        : 'http://localhost:3000/api/customer';
  
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
        clearForm();
        setData({})
        setErrors({});
        if(method === 'PUT'){
          toast.success("Customer updated successfully", { className: 'custom-toast' });
          return
        }
        toast.success("Customer added successfully", { className: 'custom-toast' });
      } catch (error) {
        console.error('Error:', error.message);
        toast.error(error.message, { className: 'custom-toast' });
      }
    };
  
    const handleDelete = async (cus_id) => {
      try {
        await fetch(`http://localhost:3000/api/customer/${cus_id}`, {
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
      const contact = customer.contact[0] || {}; // Get the first contact or an empty object
      setCustomerData({
        cus_id: customer.cus_id,
        name: customer.name,
        nic: customer.nic,
        gender: customer.gender,
        email: contact.email || '', // Use the first email or an empty string
        website: contact.website || '', // Use the first website or an empty string
        mobile: contact.mobile || '', // Use the first mobile or an empty string
        eligible_for_credit: customer.eligible_for_credit,
        credit_amount: customer.eligible_for_credit ? customer.credit_amount : '',
        credit_period: customer.credit_period,
        premium_customer: customer.premium_customer,
        discount_rate: customer.premium_customer ? customer.discount_rate : '',
        type: customer.type,
      });
      console.log(customerData);
    };

    const clearForm =()=>{
        setCustomerData({cus_id: '',name: '',nic: '',gender: 'Male',website:'',email:'',mobile: '',eligible_for_credit: false,credit_amount: '',credit_period: '',customer: false,discount_rate: '', type: 'Regular'}); 
    }
  return (
    <div className="App">
    <div style={{ display: 'flex',border:'1px solid #ccc',padding:20 }}>
      <form onSubmit={handleSubmit} className="customer-form">
        <h3>Add Customer</h3>
        <div style={{display:'flex', gap:25, flexDirection:'column'}}>
        <input type="text" name="name" style={{fontFamily:"Poppins"}} placeholder=" Enter Name" value={customerData.name} onChange={handleChange}/>
        {errors.name && <p className="error">{errors.name}</p>}

        <input type="text" name="nic" placeholder="Enter National Identity Card Number (NIC)" style={{fontFamily:"Poppins"}} value={customerData.nic} onChange={handleChange}/>
        {errors.nic && <p className="error">{errors.nic}</p>}
        </div>
      
        <div style={{display:'flex', alignItems:'center', gap:20}}>
          <p style={{fontSize:16}}>Select Gender</p>
          <label style={{ marginRight: '12px' }}>
            <input type="radio" name="gender" value="Male" checked={customerData.gender === 'Male'} onChange={handleChange} />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female" checked={customerData.gender === 'Female'} onChange={handleChange} />
            Female
          </label> </div>

        <div style={{display:'flex', alignItems:'center', gap:20}}>
           <p>Eligible for Credit</p> 
            <input type="checkbox" name="eligible_for_credit" checked={customerData.eligible_for_credit} onChange={handleCheckboxChange}
            />
        </div>

        {customerData.eligible_for_credit && (
          <div style={{ display: 'flex', gap: 10,flexDirection:'column' }}>
            <label>
              Credit Amount&nbsp;&nbsp;&nbsp;
              <input type="number" style={{fontFamily:"Poppins"}} name="credit_amount" placeholder="Credit Amount" value={customerData.credit_amount} onChange={handleChange}/>
            </label>
            <label style={{display:'flex',backgroundColor:'white', width:400}}>
              Credit Period&nbsp;&nbsp;&nbsp;
              <select name="periodType" style={{fontFamily:"Poppins"}} value={periodType} onChange={(e) => setPeriodType(e.target.value)}>
                {periodTypeDB && periodTypeDB.map((item)=>
                   <option value={item.period_type}>{item.period_type}</option>
                )}
              </select>
              <input style={{ width: 50, marginLeft: 10, fontFamily:"Poppins" }} type="number" name="period" value={period} onChange={(e) => setPeriod(e.target.value)}
              />
            </label>
          </div>
        )}

        <div style={{display:'flex', alignItems:'center', gap:20}}>
           <p>Premium Customer</p>
            <input type="checkbox" name="premium_customer" checked={customerData.premium_customer} onChange={handleCheckboxChange} />
        </div>
        {customerData.premium_customer && (
          <label>
            Discount Rate &nbsp;&nbsp;&nbsp; 
            <input style={{fontFamily:"Poppins",marginBottom:20}} type="number" name="discount_rate" placeholder="Discount Rate" value={customerData.discount_rate} onChange={handleChange} />
          </label>
        )}
        <div>
          <label style={{fontSize:16}}>
            Customer Type&nbsp;&nbsp;&nbsp; 
            <select name="type" style={{fontFamily:"Poppins"}} value={customerData.type} onChange={handleChange} >
            {dropdownType && dropdownType.map((item)=>
               <option value={item.type}>{item.type}</option>
            )}
            </select>
          </label>
        </div>
        <div style={{display:'flex',width:'100%',justifyContent:'right'}}>
        <button type="submit" className='btn_function'>Save Customer</button>
        <button type="button" className='btn_function' onClick={clearForm}>Clear Form</button>
        </div>
      </form>
      {/*contact form*/}
      <form className="customer-form2">
        <h3>Add Customer Contact</h3>
        <div style={{ display: 'flex',flexDirection:'column', gap: 20}}>
            <input type="text" name="mobile" placeholder='Enter mobile number' style={{fontFamily:"Poppins",width:'100%'}} value={customerData.mobile} onChange={handleChange}/>
            {errors.mobile && <p className="error">{errors.mobile}</p>}
            <input type="text" name="email" placeholder='Enter email address' style={{fontFamily:"Poppins",width:'100%'}} value={customerData.email} onChange={handleChange}/>
            {errors.mobile && <p className="error">{errors.email}</p>}
            <input type="text" name="website" placeholder='Enter website' style={{fontFamily:"Poppins",width:'100%'}} value={customerData.website} onChange={handleChange}/>
            {errors.mobile && <p className="error">{errors.website}</p>}
        </div>
        <MdAddCircle onClick={getContact} style={{ fontSize: '30px', cursor: 'pointer' }} />
        <TemporaryContactDataDisplay data={data} getData={getContact}/>
      </form>
    </div>
    <CustomerTable customers={customers} onEdit={handleEdit} onDelete={handleDelete} errors={errors}/>
    <ContactTable customers={customers}/>
  </div>
  )
}

export default DataForm

