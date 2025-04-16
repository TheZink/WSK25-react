import { useState } from 'react';

const useForm = (callback, initState) => {
     const [inputs, setInputs] = useState(initState);

     const handleSubmit = (event) => {
         if (event) {
             event.preventDefault();
             console.log()
         }
         callback(); 
     };

     const handleInputChange = (event) => {
         event.persist();
         console.log(event.target.name, event.target.value);
         setInputs((inputs) => ({
             ...inputs,
             [event.target.name]: event.target.value,
         }));
     };

     const handleFileChange = (evt) => {
    if (evt.target.files) {
        console.log(evt.target.files[0]);
        // TODO: set the file to state
    }
};

     return {
         handleSubmit,
         handleInputChange,
         handleFileChange,
         inputs,
     };
};

export default useForm;