interface RegisterFormProps {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    password: string;
    rePassword: string;
    errorFirstName: boolean;
    errorLastName: boolean;
    errorEmail: boolean;
    errorMobileNumber: boolean;
    errorPassword: boolean;
    errorRePassword: boolean;
    handleFirstNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleLastNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleMobileNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  }