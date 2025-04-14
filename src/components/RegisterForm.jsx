import useForm from "../hooks/formHooks";
import { useUser } from '../hooks/apiHooks.js';

const RegisterForm = () => {
    const { postUser } = useUser();

    const initValues = {
        username: '',
        password: '',
        email: ''
    };

    const doRegister = async () => {
    console.log("Register funktiota kutsuttu")
    console.log(inputs);
    const userResult = await postUser(inputs);
    console.log(userResult)
    };

const {inputs, handleInputChange, handleSubmit} = useForm(doRegister , initValues);

console.log(inputs);

     return (
         <>
             <h1>Login</h1>
             <form onSubmit={handleSubmit}>
                  <div>
                      <label htmlFor="Registeruser">Username</label>
                     <input
                         name="username"
                         type="text"
                         id="registeruser"
                         onChange={handleInputChange}
                         autoComplete="username"
                     />
                 </div>
                 <div>
                     <label htmlFor="registerPassword">Password</label>
                      <input
                         name="password"
                         type="password"
                         id="registerpassword"
                         onChange={handleInputChange}
                         autoComplete="current-password"
                     />
                 </div>
                  <div>
                     <label htmlFor="registerEmail">Email</label>
                      <input
                         name="email"
                         type="email"
                         id="registerEmail"
                         onChange={handleInputChange}
                         autoComplete="email"
                     />
                 </div>
                 <button type="submit">Login</button>
             </form>
         </>
     );
};

export default RegisterForm;