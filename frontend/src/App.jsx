
import React from 'react';
import './App.css';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import './css/custom_toast.css';
import DataForm from './components/DataForm';


function App() {
  
  return (
    <div>
      <ToastContainer/>
      <Header/>
      <DataForm/>
    </div>
  );
}

export default App;
