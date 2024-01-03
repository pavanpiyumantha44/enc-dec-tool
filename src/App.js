import React, { useState } from 'react'
import './App.css'
import CryptoJS from 'crypto-js';

const SECRET_KEY = "GkRyXF4fW5t2W$d#";

const App = () => {
  const [screen,setScreen] = useState("encrypt");
  const [text,setText] = useState("");

  const [errorMessage,setErrorMessage] = useState("");
  const [encryptedData,setEncryptedData] = useState("");
  const [decryptedData,setDecryptedData] = useState("");

  const switchScreen = (type)=>{
    setScreen(type);
    setText("");
    setEncryptedData("");
    setDecryptedData("");
    setErrorMessage("");
  }

  const encryptData = ()=>{
    try{
      const data = CryptoJS.AES.encrypt(
        JSON.stringify(text),SECRET_KEY).toString();
        setEncryptedData(data);
        setErrorMessage("");
    }catch(error){
      setErrorMessage("Encryption Failed!!");
    }
  }
  const decryptData = ()=>{
    try {
      const bytes = CryptoJS.AES.decrypt(text,SECRET_KEY);
      const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      setDecryptedData(data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Decryption Failed!!");
    }
  }

  const handleClick = ()=>{
    if(text){
      if(screen === "encrypt"){
        encryptData();
      }
      else{
        decryptData();
      }
    }
    else{
      setErrorMessage("Please Enter Text");
    }
  }
  return (
    <div className='container'>
      <div>
        <button className={`btn btn-left ${screen==="encrypt"?"active":""}`} onClick={()=>{switchScreen("encrypt")}}>Encrypt</button>
        <button className={`btn btn-right ${screen==="decrypt"?"active":""}`} onClick={()=>{switchScreen("decrypt")}}>Decrypt</button>
      </div>
      <div className='card'>
        <textarea value={text} onChange={({target})=> setText(target.value)} placeholder={screen === "encrypt"?"Enter Your Text":"Enter Encrypted Text"}/>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <button className={`btn submit-btn ${screen === "encrypt"? "encrypt-btn":"decrypt-btn"}`} onClick={handleClick}>
        {screen === "encrypt"?"Encrypt":"Decrypt"}
        </button>
      </div>
      {encryptedData||decryptedData?(
        <div className='content'>
          <label>{screen==="encrypt"?"ENCRYPT":"DECRYPT"}</label>
          <p>{screen==="encrypt"?encryptedData:decryptedData}</p>
        </div>
      ):null};
    </div>
  )
}

export default App