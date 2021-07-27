export const reducer = (state, action) => {
  switch (action.type) {
    case "INITAIL":
      return { isShow: false, type: "", message: "" };
    case "ERROR":
      return { isShow: true, type: "ERROR", message: action.payload };
    case "SUCCESS":
      return { isShow: true, type: "SUCCESS", message: action.payload };
    default:
      return state;
  }
};
