export const initialState = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
  showSpinner: false,
  oldPasswordError: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_OLD_PASSWORD":
      return { ...state, oldPassword: action.payload.oldPassword };
    case "CHANGE_NEW_PASSWORD":
      return { ...state, newPassword: action.payload.newPassword };
    case "CHANGE_CONFIRM_NEW_PASSWORD":
      return {
        ...state,
        confirmNewPassword: action.payload.confirmNewPassword,
      };
    case "TOOGLE_SPINNER":
      return {
        ...state,
        showSpinner: !state.showSpinner,
      };
    case "CHANGE_OLD_PASSWORD_ERROR":
      return {
        ...state,
        oldPassword: "",
        oldPasswordError: action.payload.error,
      };
    default:
      return state;
  }
};
