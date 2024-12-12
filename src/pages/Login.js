import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import authService from '../services/authService';
import { useAuth } from '../contexts/AuthProvider';

const Login = () => {
  const [step, setStep] = useState(1); // 1 = Email/Password, 2 = MFA
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Array for 6-digit OTP
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [mfaToken, setMfaToken] = useState(null);
  const {login} = useAuth();

  const navigate = useNavigate(); // React Router hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    const response = await authService.login({ email, password });
    if (response.valid) {
      setMessage(response.message);
      setMfaToken(response.mfa_token);
      setStep(2);
    } else {
      setError(response.error);
    }
  };

  const handleMfaSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Combine OTP into a single string
    const otpCode = otp.join('');

    const response = await authService.verifyMfa({mfa_token : mfaToken, mfa_code: otpCode});
    if (response.valid) {
      login(response);

      setMessage(response.message); // Success message
      navigate('/'); // Redirect after successful login
    } else {
      setError(response.error);
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
        <p>&copy; 2024 Stellar Financial Group. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
