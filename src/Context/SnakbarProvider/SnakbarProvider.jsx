import { createContext, useReducer, useContext } from "react";
import { reducer } from "./reducer";
const Snakbarcontext = createContext();

const intialSnakbar = { isShow: false, alertType: "", msg: "" };

export const SnakbarProvider = ({ children }) => {
  const [snakbarStatus, snakbarDispatch] = useReducer(reducer, intialSnakbar);

  return (
    <Snakbarcontext.Provider
      value={{
        snakbarStatus,
        snakbarDispatch,
      }}>
      {children}
    </Snakbarcontext.Provider>
  );
};
export const useSnakbar = () => {
  return useContext(Snakbarcontext);
};
