import React, { createContext, useReducer } from "react";
import { Program } from "../types/program";
import { initalState } from "./initalState";
import { reducer, ActionTypes } from "./Reducer";

interface ContextInterface {
  state: Program;
  loadProgram: (loadedProgram: Program) => void
}
export const ProgramContext = createContext<ContextInterface>({
  state: initalState,
  loadProgram: (program: Program) => null
});

interface props {
  children: React.ReactNode;
}
// Provider stuff
export const ProgramProvider: React.FC<props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  const loadProgram = (loadedProgram: Program) => {
    dispatch({
      type: ActionTypes.loadProgram,
      payload: loadedProgram,
    });
  };

  const value = { state, loadProgram };

  return (
    <ProgramContext.Provider value={value}>{children}</ProgramContext.Provider>
  );
};
