export const validateLogin = (username, password, email) => {
  const validMail = email
    ? /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)
    : null;

  const validPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
    password
  );

  const validUser = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(
    username
  );
  if (email && !validMail) {
    return "Please enter a valid e-mail";
  } else if (!validPass) {
    return "Password must be in proper format";
  } else if (!validUser) {
    return "Username not valid.";
  }
};
