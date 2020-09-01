import React, { useContext } from "react";
import { ProgramContext } from "../state/ProgramContext";
import { exportToSpreadsheet } from "../utilities/createSpreadsheet";

// interface CreateSheetProps {

// }

export const CreateSheet: React.FC = () => {
  const { state } = useContext(ProgramContext);

  return (
    <button onClick={() => exportToSpreadsheet(state)}>
      Create Sheet
    </button>
  );
};
