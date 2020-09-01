import React from "react";
import { DropFile } from "./DropFile";
import { ProgramProvider } from "../state/ProgramContext";
import { CreateSheet } from "./CreateSheet";
import "../assets/tailwind.css";

function App() {
  return (
    <ProgramProvider>
      <DropFile />

      <div className="flex justify-evenly mt-10">
        <CreateSheet />
      </div>
    </ProgramProvider>
  );
}

export default App;
