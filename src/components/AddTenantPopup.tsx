import React from 'react';
import TenantDetails from '../components/TenantDetails'



const AddTenantPopup = ({onClose}) => {
  // Implement the content and functionality of the popup here

  return (
    // Render the popup content
    <div className="popup">
      <h2>Create New Tenant</h2>
      {<TenantDetails />}
      {/* Handle form submission and other logic */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AddTenantPopup;
