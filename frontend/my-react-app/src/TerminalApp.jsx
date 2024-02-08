
import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './TerminalApp.css';


const TerminalApp = () => {
  const [inputData, setInputData] = useState(null);
  const [selectedModel, setSelectedModel] = useState('logistic_regression_model.pkl'); // Default model
  const [selectedCommand, setSelectedCommand] = useState('/proc/cpuinfo');
  const [argumentsValue, setArgumentsValue] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [popupOutput, setPopupOutput] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCollectData = () => {
    setLoading(true);
    setOutput('');

    // Fetch data from the Flask server when the button is clicked
    axios.get('http://127.0.0.1:5000/collect')
      .then(response => {
        setInputData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };
  
  const requestData = {
    ...inputData,
  };

  
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

   // Define the command with arguments
  let commandWithArguments = selectedCommand;

  if (selectedCommand === 'whois') {
    commandWithArguments = `whois ${argumentsValue}`;
  } else if (selectedCommand === 'traceroute') {
    commandWithArguments = `traceroute ${argumentsValue}`;
  }


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
    axios.post('http://127.0.0.1:8000',  requestData , {
    params: {
        model: selectedModel,
      }
    })
    .then((response) => {
      // Display a modal with the prediction
      setPopupOutput(response.data.prediction);
      openModal(true);
    })
    .catch((error) => {
      setOutput(`Error occurred: ${error.message}`);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <div children="font">
      {/* <div className='mainbox'> */}
      <h1 className='topic'>Predictive Model to Classify Network Security Attacks</h1>
      <div className='select-container'>
      <div>
      <label htmlFor="commands">Select Command:</label>
      <select id="commands" onChange={handleCommandChange} value={selectedCommand}>
        <option value="/proc/cpuinfo">Infomation CPU</option> {/* Update the default command here */}
        <option value="uname -a">System Information</option>
        <option value="lsof -i">Open Network Connections</option>
        <option value="whois">Whois </option>
        <option value="sudo ss -tanup">Investigate Sockets</option>
        <option value="traceroute">Traceroute</option>
        {/* Add more options as needed */}
      </select>
      </div>

      <div>
        <label htmlFor="model">Select Model:</label>
        <select id="model" onChange={handleModelChange} value={selectedModel}>
          <option value="logistic_regression_model.pkl">Logistic Regression Model</option>
          <option value="knn_model.pkl">KNN Model</option>
          <option value="random_forest_model.pkl">Random Forest Model</option>
          {/* Add more options as needed */}
        </select>
      </div>

      {selectedCommand === 'whois' && (
        <div>
          <label htmlFor="arguments">Arguments:</label>
          <input
            type="text"
            id="arguments"
            placeholder="Enter arguments for whois"
            value={argumentsValue}
            onChange={handleArgumentsChange}
          />
        </div>
      )}
      
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

      <button onClick={handleCollectData} disabled={loading}>
      {loading ? 'Loading...' : 'Collect Data'}
      </button>

      <button onClick={postData} disabled={loading}>
        {loading ? 'Loading...' : 'Get Prediction '}
      </button>

      <button onClick={clearOutput}>Clear Output</button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Prediction Modal"
        className="ReactModal__Overlay" // Apply overlay styles
        overlayClassName="ReactModal__Content" // Apply content styles
        
      >
        <div>
    <h2>Prediction</h2>
    <p>{popupOutput}</p>
    {popupOutput === 'U2R' && (
      <p style={{ color: '#b2102f' , fontWeight: 'bold' }}>
        This is a U2R and is considered dangerous, it can be buffer_overflow, loadmodule, perl, ps, rootkit, sqlattack, xterm. Please take immediate action.
      </p>
    )}
    {popupOutput === 'Probe' && (
      <p style={{ color: '#b2102f' , fontWeight: 'bold' }}>
        This is a Probe and is considered dangerous, it can be ipsweep, mscan, nmap, portsweep, saint, satan. Please take immediate action.
      </p>
    )}
    {popupOutput === 'R2L' && (
      <p style={{ color: '#b2102f' , fontWeight: 'bold' }}>
        This is a R2L and is considered dangerous, it can be ftp_write, guess_passwd, httptunnel, imap, multihop, named, phf,sendmail, snmpgetattack, snmpguess, spy, warezclient, warezmaster, xlock, xsnoop. Please take immediate action.
      </p>
    )}
    {popupOutput === 'Dos' && (
      <p style={{ color: '#b2102f' , fontWeight: 'bold' }}>
        This is a Dos and is considered dangerous, it can be apache2, back, land, neptune, mailbomb, pod, processtable, smurf, teardrop, udpstorm, worm. Please take immediate action.
      </p>
    )}
    {popupOutput === 'Normal' && (
      <p style={{ color: 'green' , fontWeight: 'bold' }}>
        This is a normal, you can feel safe from exploitation on your network.
      </p>
    )}
    <button onClick={() => setModalIsOpen(false)}>Close</button>
  </div>
</Modal>

      <div className="output-container">
        <pre>{output}</pre>
      </div>
      </div>
  );
};

export default TerminalApp;
