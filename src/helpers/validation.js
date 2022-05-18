const validation = (values, type) => {
  let errors = {};
  if (!values.email) errors.email = "Email is required!";
  if (!values.fname && type === "Sign Up")
    errors.fname = "first name is required";
  if (!values.lname && type === "Sign Up")
    errors.lname = "last name is required";
  if (!values.password) errors.password = "password is required";
  if (!values.confirmPass && type === "Sign Up")
    errors.confirmPass = "password is required";
  else if (values.confirmPass !== values.password && type === "Sign Up")
    errors.confirmPass = "password must match";

  return errors;
};

export default validation;
