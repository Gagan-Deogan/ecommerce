export const initialState = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
  status: "IDLE",
  error: "",
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
    case "SET_STATUS":
      return {
        ...state,
        status: action.payload,
      };
    case "SET_STATUS_ERROR":
      return {
        ...state,
        status: "ERROR",
        error: action.payload,
      };
    default:
      return state;
  }
};
