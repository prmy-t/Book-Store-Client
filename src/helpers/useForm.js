import { useState } from "react";

const useForm = (validate, type) => {
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values, type));
    return Object.keys(errors).length > 0 ? true : false;
  };

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
