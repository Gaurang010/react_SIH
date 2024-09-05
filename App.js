import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [keystrokes, setKeystrokes] = useState([]);
  const [mouseMovements, setMouseMovements] = useState([]);
  const [verificationStatus, setVerificationStatus] = useState('Not verified');
  const [captchaVerified, setCaptchaVerified] = useState(false);

  // Capture keystrokes and mouse movements
  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeystrokes((prev) => [...prev, { key: e.key, time: Date.now() }]);
    };
    const handleMouseMove = (e) => {
      setMouseMovements((prev) => [
        ...prev,
        { x: e.clientX, y: e.clientY, time: Date.now() },
      ]);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleVerification = () => {
    // Simulate a verification logic (you can extend it with local API)
    if (keystrokes.length > 0 && mouseMovements.length > 0) {
      setVerificationStatus('Verified');
      setCaptchaVerified(true);
    } else {
      setVerificationStatus('Verification failed. Please refresh the page.');
      setCaptchaVerified(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (captchaVerified) {
      // Here you would typically send the form and captured data to a server
      alert('Form submitted');
    } else {
      alert('Please complete the CAPTCHA verification');
    }
  };

  return (
    <div className="captcha-container">
      <h1>Experience Passive CAPTCHA</h1>
      <p>
        This CAPTCHA silently verifies users by analyzing various factors such
        as mouse movements, keystrokes, and more.
      </p>
      <form onSubmit={handleSubmit} className="captcha-form">
        <div className="form-group">
          <label htmlFor="name">Test Name *</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Start typing. See the difference."
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Test Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Anti-Robot Verification</label>
          <button
            type="button"
            onClick={handleVerification}
            className="verify-btn"
          >
            Click to start verification
          </button>
          <p>{verificationStatus}</p>
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
