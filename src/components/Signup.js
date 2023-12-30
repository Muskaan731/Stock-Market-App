import React, { useState } from 'react';
import '../styles/Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Clear password error message when the user types in the password or confirm password field
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
      setSuccessMessage('Signed up successfully! Now SignIn');
      /*console.log('Form data submitted:', formData);*/
      // If signup is successful, show the login form
      setShowLoginForm(true);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    /*console.log('Login data submitted:', formData);*/
    
  };

  return (
    <>
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        {passwordError && <p className="error-message">{passwordError}</p>}
        <button type="submit">Sign Up</button>
        <div className="signin-link">
          <p>
            Already have an account? <a href="#" onClick={() => setShowLoginForm(true)}>Sign In</a>
          </p>
        </div>
      </form>
</div>
<div className="signup-container">
      {showLoginForm && (
        <div className="login-container">
          <form className="login-form" onSubmit={handleLogin}>
            {/* Your login form fields go here */}
            <h2>Login</h2>
            <div className="form-group">
              <label htmlFor="login-username">Username:</label>
              <input
                type="text"
                id="login-username"
                name="login-username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="login-password">Password:</label>
              <input
                type="password"
                id="login-password"
                name="login-password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
    </>
  );
};

export default Signup;
