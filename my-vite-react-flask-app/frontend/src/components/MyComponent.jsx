// Example React component (MyComponent.js)

import React, { useState } from 'react';

const MyComponent = () => {
  const [inputData, setInputData] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item: {
            "duration": 0,
            "protocol_type": 1,
            "service": 49,
            "flag": 5,
            "src_bytes": 0,
            "dst_bytes": 0,
            "land": 0,
            "wrong_fragment": 0,
            "urgent": 0,
            "hot": 0,
            "num_failed_logins": 0,
            "logged_in": 0,
            "num_compromised": 0,
            "root_shell": 0,
            "su_attempted": 0,
            "num_root": 0,
            "num_file_creations": 0,
            "num_shells": 0,
            "num_access_files": 0,
            "num_outbound_cmds": 0,
            "is_host_login": 0,
            "is_guest_login": 0,
            "count": 229,
            "srv_count": 10,
            "serror_rate": 0.00,
            "srv_serror_rate": 0.00,
            "rerror_rate": 1.00,
            "srv_rerror_rate": 1.00,
            "same_srv_rate": 0.04,
            "diff_srv_rate": 0.06,
            "srv_diff_host_rate": 0.00,
            "dst_host_count": 255,
            "dst_host_srv_count": 10,
            "dst_host_same_srv_rate": 0.04,
            "dst_host_diff_srv_rate": 0.06,
            "dst_host_same_src_port_rate": 0.00,
            "dst_host_srv_diff_host_rate": 0.00,
            "dst_host_serror_rate": 0.00,
            "dst_host_srv_serror_rate": 0.00,
            "dst_host_rerror_rate": 1.00,
            "dst_host_srv_rerror_rate": 1.00

          }

        }),
      });

      const result = await response.json();
      setResponseMessage(result.message);
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  return (
    <div>
      <h1>React App</h1>
      <label>
        Input Data:
        <input type="text" value={inputData} onChange={(e) => setInputData(e.target.value)} />
      </label>
      <button onClick={handleSubmit}>Submit</button>
      {responseMessage && <p>Response from FastAPI: {responseMessage}</p>}
    </div>
  );
};

export default MyComponent;

