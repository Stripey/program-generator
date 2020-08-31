import React from "react";
import { DropFile } from "./DropFile";
import { ProgramProvider } from "../state/ProgramContext";
import { CreateSheet } from "./CreateSheet";

function App() {
  return (
    <ProgramProvider>
      <DropFile />
      <CreateSheet/>
    </ProgramProvider>
  );
}

export default App;
