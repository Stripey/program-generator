import { Program } from "../types/program";

// Reducer stuff
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum ActionTypes {
  loadProgram,
}

type programPayload = {
  [ActionTypes.loadProgram]: {
    program: Program;
  };
};
export type ProductActions = ActionMap<programPayload>[keyof ActionMap<
  programPayload
>];

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case ActionTypes.loadProgram:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
