import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

const Login = () => {
  const [step, setStep] = useState(1); // 1 = Email/Password, 2 = MFA
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Array for 6-digit OTP
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sessionId, setSessionId] = useState(null);

  const navigate = useNavigate(); // React Router hook for navigation

  // Simulate API response
  const mockApiResponse = (data) => {
    if (step === 1) {
      return { valid: true, session_id: 'abc123' }; // Email validation response
    }
    if (step === 2) {
      return { valid: true, message: 'Login successful!' }; // OTP validation response
    }
    return { valid: false };
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Simulate backend call
    const response = mockApiResponse({ email, password });
    if (response.valid) {
      setMessage('Email validated. Please enter your MFA code.');
      setSessionId(response.session_id);
      setStep(2); // Move to MFA step
    } else {
      setError('Invalid email or password.');
    }
  };

  const handleMfaSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Combine OTP into a single string
    const otpCode = otp.join('');

    // Simulate backend call
    const response = mockApiResponse({ sessionId, otp: otpCode });
    if (response.valid) {
      setMessage(response.message); // Success message
      navigate('/'); // Redirect after successful login
    } else {
      setError('Invalid MFA code. Please try again.');
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    // Ensure only numbers are entered
    if (!/^\d*$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Auto-focus to the next box if a digit is entered
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Auto-focus to the previous box on backspace
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  return (
    <div className="login-page">
      <div className="overlay"></div>
      <div className="login-container d-flex align-items-center justify-content-center">
        <div className="login-box">
          <div className="text-center mb-4">
            <img src="/logo.png" alt="Logo" className="logo-img" />
            <h2 className="mt-2">Welcome Back</h2>
          </div>

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          {step === 1 && (
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleMfaSubmit}>
              <div className="mb-3 text-center">
                <label className="form-label">Enter 6-digit MFA Code</label>
                <div className="otp-inputs d-flex justify-content-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      className="otp-box"
                      value={digit}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      maxLength={1}
                    />
                  ))}
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100">Verify</button>
            </form>
          )}
        </div>
      </div>

      <footer className="footer text-center text-white">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
