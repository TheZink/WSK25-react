import { useState } from "react";
import LoginForm from "../components/loginform";
import RegisterForm from "../components/RegisterForm";

const Login = () => {
  const [formToggle, setFormToggle] = useState(true);

  const clickHandler = () => {
    setFormToggle(!formToggle);
  };

  return (
    <>
    {formToggle ? 
      <LoginForm/> :
      <RegisterForm/>
    }
      <button onClick={clickHandler}>{formToggle ? 'Register' : 'Login'}</button>
    </>
  );
};

export default Login;