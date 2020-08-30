import React from "react";
import { DropFile } from "./DropFile";
import { ProgramProvider } from "../state/ProgramContext";

function App() {
  return (
    <ProgramProvider>
      <DropFile />
    </ProgramProvider>
  );
}

export default App;
