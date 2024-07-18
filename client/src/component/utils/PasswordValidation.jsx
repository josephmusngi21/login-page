export const isPasswordValid = (password) => {
    // Check if password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      alert("Password must contain at least one uppercase letter!");
      return false;
    }
    // Check if password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      alert("Password must contain at least one lowercase letter!");
      return false;
    }
    // Check if password contains at least one digit
    if (!/\d/.test(password)) {
      alert("Password must contain at least one digit!");
      return false;
    }
    // Check if password contains at least one special character
    if (!/[^\w\s]/.test(password)) {
      alert("Password must contain at least one special character!");
      return false;
    }
    return true;
  };
  