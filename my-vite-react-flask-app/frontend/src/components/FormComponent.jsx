import React, { useState } from 'react';
import './styles.css'; // Import the CSS file

const FormComponent = () => {
  const [formData, setFormData] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Process the form data or perform any necessary actions here

    // Show the popup
    setShowPopup(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Form Data:
          <input type="text" value={formData} onChange={(e) => setFormData(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>Submission Successful!</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormComponent;

