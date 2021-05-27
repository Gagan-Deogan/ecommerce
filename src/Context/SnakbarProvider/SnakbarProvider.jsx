import { createContext, useReducer, useContext } from "react";
import { reducer } from "./reducer";
const SnakbarContext = createContext();

const intialSnakbar = { isShow: false, alertType: "", msg: "" };

export const SnakbarProvider = ({ children }) => {
  const [snakbarStatus, snakbarDispatch] = useReducer(reducer, intialSnakbar);

  return (
    <SnakbarContext.Provider
      value={{
        snakbarStatus,
        snakbarDispatch,
      }}>
      {children}
    </SnakbarContext.Provider>
  );
};
export const useSnakbar = () => {
  return useContext(SnakbarContext);
};
