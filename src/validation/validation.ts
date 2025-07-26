export const getRequiredMessage = (fieldName: string) =>
  `${fieldName} is required`;

export const getValidationRules = () => ({
    email: {
    required: getRequiredMessage("Email"),
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  },
   password: {
    required: getRequiredMessage("Password"),
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters long",
    },
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    },
  },
})