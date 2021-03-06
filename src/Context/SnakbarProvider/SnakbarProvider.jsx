import { createContext, useReducer, useContext } from "react";
import { reducer } from "./sankbar.reducer";
const Snakbarcontext = createContext();

const intialSnakbar = { isShow: false, type: "", message: "" };

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
