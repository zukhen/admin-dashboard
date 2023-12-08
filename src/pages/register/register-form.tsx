// RegisterForm.tsx
import React from 'react';
// import './register.scss'


const RegisterForm: React.FC<RegisterFormProps> = ({
  firstName,
  lastName,
  email,
  mobileNumber,
  password,
  rePassword,
  errorFirstName,
  errorLastName,
  errorEmail,
  errorMobileNumber,
  errorPassword,
  errorRePassword,
  handleFirstNameChange,
  handleLastNameChange,
  handleEmailChange,
  handleMobileNumberChange,
  handlePasswordChange,
  handleRePasswordChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="fullName">
        <label className="name">
          First name:
          <input type="text" name="firstName" value={firstName} onChange={handleFirstNameChange} />
          {errorFirstName && <span className="error">First name is required!</span>}
        </label>
        <label className="name">
          Last name:
          <input type="text" name="lastName" value={lastName} onChange={handleLastNameChange} />
          {errorLastName && <span className="error">Last name is required!</span>}
        </label>
      </div>
      <label>
       <div className='text-input'> Email:
        <input type="email" name="email" value={email} onChange={handleEmailChange} />
        {errorEmail && <span className="error">Email is required!</span>}</div>
      </label>
      <label>
      <div className='text-input'> Mobile number:
        <input type="tel" name="mobileNumber" value={mobileNumber} onChange={handleMobileNumberChange} />
        {errorMobileNumber && <span className="error">Mobile number is required!</span>}</div>
      </label>
      <label>
        <div className='text-input'>
        Password:
        <input type="password" name="password" value={password} onChange={handlePasswordChange} />
        {errorPassword && <span className="error">Password is required!</span>}</div>
      </label>
      <label>
        <div className='text-input'>
        Re-Password:
        <input type="password" name="password" value={rePassword} onChange={handleRePasswordChange} />
        {errorRePassword && <span className="error">Re-Password is not correct!</span>}</div>
      </label>
      <button type="submit">Sign up</button>
    </form>
  );
};

export default RegisterForm;
