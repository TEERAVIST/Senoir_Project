
import React, { useState } from 'react';
import axios from 'axios';
import './TerminalApp.css';


const TerminalApp = () => {
  const [selectedModel, setSelectedModel] = useState('logistic_regression_model.pkl'); // Default model
  const [selectedCommand, setSelectedCommand] = useState('/proc/filesystems');
  const [argumentsValue, setArgumentsValue] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  
 const clearOutput = () => {
    setOutput('');
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

 const handleCommandChange = (event) => {
    setSelectedCommand(event.target.value);
  };

  const handleArgumentsChange = (event) => {
    setArgumentsValue(event.target.value);
  };

  const getData = () => {
    setLoading(true);
    setOutput('');

    const commandWithArguments = argumentsValue ? `${selectedCommand} ${argumentsValue}` : selectedCommand;

    axios.get(`http://localhost:5000/get_data?command=${encodeURIComponent(commandWithArguments)}`)
      .then(response => setOutput(response.data))
      .catch(error => setOutput(`Error occurred: ${error.message}`))
      .finally(() => setLoading(false));
  ;}

  const postData = () => {
    console.log(selectedModel);
    setLoading(true);
    setOutput('');

  //Send a request to the FastAPI endpoint
    axios.post('http://127.0.0.1:8000', { "duration": 0,"protocol_type": 1,"service": 49,"flag": 5,"src_bytes": 0,"dst_bytes": 0,"land": 0,"wrong_fragment": 0, "urgent": 0,
 "hot": 0,"num_failed_logins": 0,"logged_in": 0,"num_compromised": 0,"root_shell": 0, "su_attempted": 0,"num_root": 0,"num_file_creations": 0, "num_shells": 0,
"num_access_files": 0,"num_outbound_cmds": 0, "is_host_login": 0,"is_guest_login": 0,
"count": 229,"srv_count": 10,"serror_rate": 0.00,"srv_serror_rate": 0.00, "rerror_rate": 1.00, "srv_rerror_rate": 1.00,"same_srv_rate": 0.04, "diff_srv_rate": 0.06,"srv_diff_host_rate": 0.00,"dst_host_count": 255,"dst_host_srv_count": 10,"dst_host_same_srv_rate": 0.04,"dst_host_diff_srv_rate": 0.06,"dst_host_same_src_port_rate": 0.00,"dst_host_srv_diff_host_rate": 0.00, "dst_host_serror_rate": 0.00,"dst_host_srv_serror_rate": 0.00, "dst_host_rerror_rate": 1.00, "dst_host_srv_rerror_rate": 1.00, }, {
    params: {
        model: selectedModel,
    }
})
     .then((response) => setOutput(response.data.prediction))
     .catch((error) => setOutput(`Error occurred: ${error.message}`))
     .finally(() => setLoading(false));
  };

  return (
    <div>
      <h1>Terminal Data Retrieval (React)</h1>
      <label htmlFor="commands">Select Command:</label>
      <select id="commands" onChange={handleCommandChange} value={selectedCommand}>
        <option value="/proc/filesystems">cat /proc/filesystems</option>
        <option value="uname -a">uname -a</option>
        <option value="lsof -i">lsof -i</option>
        <option value="sudo netstat -anp">netstat (old)</option>
        <option value="sudo ss -tanup">ss (new)</option>
        <option value="traceroute">traceroute</option>
        {/* Add more options as needed */}
      </select>

      <div>
        <label htmlFor="model">Select Model:</label>
        <select id="model" onChange={handleModelChange} value={selectedModel}>
          <option value="logistic_regression_model.pkl">Logistic Regression Model</option>
          <option value="knn_model.pkl">KNN Model</option>
          <option value="random_forest_model.pkl">Random Forest Model</option>
          {/* Add more options as needed */}
        </select>
      </div>

      {selectedCommand === 'traceroute' && (
        <div>
          <label htmlFor="arguments">Arguments:</label>
          <input
            type="text"
            id="arguments"
            placeholder="Enter arguments for the command"
            value={argumentsValue}
            onChange={handleArgumentsChange}
          />
        </div>
      )}

      <button onClick={getData} disabled={loading}>
        {loading ? 'Loading...' : 'Get Data'}
      </button>

      <button onClick={postData} disabled={loading}>
        {loading ? 'Loading...' : 'Get Prediction '}
      </button>

      <button onClick={clearOutput}>Clear Output</button>

      <div className="output-container">
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default TerminalApp;
