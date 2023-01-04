import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
  
    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)
  
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  const onUserChangedText = (event) => {
  console.log(event.target.value);
  setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>VC Oracle GPT-3 | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>The VC Oracle of Truth</h1>
          </div>
          <div className="header-subtitle">
            <h2>How can I be of help?</h2>
          </div>
        </div>
        {/* Add this code here*/}

      <div className="output-container">
       <div className="promtp">
        <div className="prompt-container">
        <textarea
          placeholder="write your oracle query here"
          className="prompt-box"
          value={userInput}
          onChange={onUserChangedText}
        />
       <div className="prompt-buttons">
        <a
          className={isGenerating ? 'generate-button loading' : 'generate-button'}
          onClick={callGenerateEndpoint}
        >
          <div className="generate">
          {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
          </div>
        </a>
       </div>
      </div>
        {/* New code I added here */}
        {apiOutput && (
        <div className="output">
          <div className="output-header-container">
            <div className="output-header">
              <h3>The oracle has spoken</h3>
            </div>
          </div>
          <div className="output-content">
            <p>{apiOutput}</p>
          </div>
        </div>        
      )}
      </div>
      </div>
      </div>
    </div>
  );
};

export default Home;
