// import "./register.scss"
import React, { useState } from 'react';
import close from '/zgulV2zGm8t.png'
import { validateFirstName, validateLastName, validateMobileNumber, validatePassword, validateRePassword, validateUsername } from "@/utils/auth-utils";
import RegisterForm from "./register-form";
import { handleRegister } from "@/api/auth";
interface RegisterProps {
  onClose: () => void;
}

const Register: React.FC<RegisterProps> = ({ onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorMobileNumber, setErrorMobileNumber] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorRePassword, setErrorRePassword] = useState(false);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
    setErrorFirstName(validateFirstName(value));
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
    setErrorLastName(validateLastName(value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrorEmail(validateUsername(value));
  };

  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMobileNumber(value);
    setErrorMobileNumber(validateMobileNumber(value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setErrorPassword(validatePassword(value));

    setErrorRePassword(validateRePassword(value, rePassword));
  };

  const handleRePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRePassword(value);
    setErrorRePassword(validateRePassword(password, value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateFirstName(firstName)) {
      setErrorFirstName(true)
      return;
    }

    if (validateLastName(lastName)) {
      setErrorLastName(true)
      return;
    }

    if (validateUsername(email)) {
      setErrorEmail(true)
      return;
    }

    if (validateMobileNumber(mobileNumber)) {
      setErrorMobileNumber(true)
      return;
    }

    if (validatePassword(password)) {
      setErrorPassword(true)
      return;
    }
    // submit form ở đây
    try {
      const response = await handleRegister(email, password, firstName, lastName, mobileNumber);
      if (response?.status === 200) {
        console.log(response.data);

      }

    } catch (e: any) {

    }

    onClose();
  };

  return (
    <div className="register">
      <div className="containerRegister">
        <div className="titleHeader">
          <div className="rowContainer">
            <h1 className="titleRegister">Sign up</h1>
            <img src={close} alt="close" onClick={onClose} width={30} height={30} />
          </div>
          <p>It's quick and easy.</p>
        </div>
        <RegisterForm
          firstName={firstName}
          lastName={lastName}
          email={email}
          rePassword={rePassword}
          mobileNumber={mobileNumber}
          password={password}
          errorFirstName={errorFirstName}
          errorLastName={errorLastName}
          errorEmail={errorEmail}
          errorMobileNumber={errorMobileNumber}
          errorPassword={errorPassword}
          errorRePassword={errorRePassword}
          handleRePasswordChange={handleRePasswordChange}
          handleFirstNameChange={handleFirstNameChange}
          handleLastNameChange={handleLastNameChange}
          handleEmailChange={handleEmailChange}
          handleMobileNumberChange={handleMobileNumberChange}
          handlePasswordChange={handlePasswordChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Register;