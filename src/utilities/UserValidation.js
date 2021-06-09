function validateUser(data) {
  const registeredEmail = JSON.parse(localStorage.getItem("emailid"));
  const registeredPassword = JSON.parse(localStorage.getItem("password"));

  let formisValid = false;
  if (
    registeredEmail === data.emailId &&
    registeredPassword === data.password
  ) {
    formisValid = true;
  }

  return formisValid;
}

export default validateUser;
