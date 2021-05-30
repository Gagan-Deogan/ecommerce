export const initial = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  signUpError: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_EMAIL":
      return { ...state, email: action.payload.email };
    case "CHANGE_NAME":
      return { ...state, name: action.payload.name };
    case "CHANGE_PASSWORD":
      return { ...state, password: action.payload.password };
    case "CHANGE_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload.confirmPassword };
    case "SHOW_SIGNUP_ERROR":
      return { ...state, signUpError: action.payload.error };
    default:
      return state;
  }
};
