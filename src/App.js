import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

import { Web3 } from 'web3';

//import the contract address and ABI
const ADDRESS = '0x81f31C0b7450F5C1e56077ec75F99d3DdBb1fa0f';
const ABI = [{ "inputs": [{ "internalType": "uint256", "name": "startingPoint", "type": "uint256" }, { "internalType": "string", "name": "_startingMessage", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "decreaseNumber", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getNumber", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "increaseNumber", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "message", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "newMessage", "type": "string" }], "name": "setMessage", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

function App() {
  const [number, setNumber] = useState('none');
  const [currentMessage, setCurrentMessage] = useState('none');
  const [newMessage, setNewMessage] = useState('')

  //Initialize the web3 object
  const web3 = new Web3(window.ethereum);

  //initialize the contract ABI and ADDRESS
  const myContract = new web3.eth.Contract(ABI, ADDRESS);

  //reading functions
  //number
  async function getNumber() {
    const result = await myContract.methods.getNumber().call();

    setNumber(result.toString())
  }
  //message
  async function getMessage() {
    const result = await myContract.methods.message().call();

    setCurrentMessage(result)
  }


  //writing functions
  //number
  //increase 
  async function increaseNumber() {
    //connecting the account i.e the wallet
    const accountsConnected = await web3.eth.requestAccounts();

    const tx = await myContract.methods.increaseNumber().send({ from: accountsConnected[0] });

    getNumber();
  }

  //decrease 
  async function decreaseNumber() {
    //connecting the account i.e the wallet
    const accountsConnected = await web3.eth.requestAccounts();

    const tx = await myContract.methods.decreaseNumber().send({ from: accountsConnected[0] });

    getNumber();
  }

  //message
  //update
  async function updateMessage() {
    const accountsConnected = await web3.eth.requestAccounts();

    const tx = await myContract.methods.setMessage(newMessage).send({ from: accountsConnected[0] })

    getMessage();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Number: {number}</p>
        <button onClick={getNumber}>Get Number</button>
        <br />
        <button onClick={increaseNumber}>Increase Number</button>
        <br />
        <button onClick={decreaseNumber}>Decrease Number</button>
        <br />
        <p>Message: {currentMessage}</p>
        <br />
        <button onClick={getMessage}>Get Message</button>
        <br />
        <input 
          placeholder='Enter a New Message'
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <br />
        <button onClick={updateMessage}>Update Message </button>
        <br />
      </header>
    </div>
  );
}

export default App;
