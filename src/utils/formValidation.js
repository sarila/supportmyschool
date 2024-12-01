export const validateField = (field, value) => {
  switch (field) {
    case "username":
      return value ? "" : "Username is required";
    case "email":
      if (!value) return "Email is required";
      if (!/\S+@\S+\.\S+/.test(value)) return "Email format is invalid";
      return "";
    case "password":
      if (!value) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters";
      if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
      if (!/\d/.test(value)) return "Password must contain at least one digit";
      if (!/[!@#$]/.test(value)) return "Password must contain at least one special character (@, #, $, !)";
      return "";
    case "confirmPassword":
      return value ? "" : "Please confirm your password";
    default:
      return "";
  }
};

export const validateForm = (formData) => {
  let errors = {};

  // Validate username
  if (!formData.username) {
    errors.username = "Username is required";
  }

  // Validate email
  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email format is invalid";
  }

  // Validate password
  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  } else if (!/[A-Z]/.test(formData.password)) {
    errors.password = "Password must contain at least one uppercase letter";
  } else if (!/\d/.test(formData.password)) {
    errors.password = "Password must contain at least one digit";
  } else if (!/[!@#$]/.test(formData.password)) {
    errors.password = "Password must contain at least one special character (@, #, $, !)";
  }

  // Validate confirm password
  if (!formData.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
