const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
  if (!email) {
    return 'Email is required.';
  }
  if (!emailPattern.test(email)) {
    return 'Please enter a valid email address.';
  }
  return '';
};

const validatePassword = (password) => {
  if (!password) {
    return 'Password is required.';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters long.';
  }
  const hasLettersAndNumbers = /[a-zA-Z]/.test(password) && /\d/.test(password);
  if (!hasLettersAndNumbers) {
    return 'Password must contain both letters and numbers.';
  }
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  if (!hasSpecialChar) {
    return 'Password must contain at least one special character.';
  }
  return '';
};

const validateUsername = (username) => {
  if (!username) {
    return 'Username is required.';
  }
  if (username.length < 3 || username.length > 20) {
    return 'Username must be between 3 and 20 characters.';
  }
  const usernamePattern = /^[a-zA-Z0-9]+$/;
  if (!usernamePattern.test(username)) {
    return 'Username must only contain letters and numbers.';
  }
  return '';
};


export  { validateEmail, validatePassword, validateUsername };
