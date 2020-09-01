import React, { useContext } from "react";
import { ProgramContext } from "../state/ProgramContext";
import { exportToSpreadsheet } from "../utilities/createSpreadsheet";

// interface CreateSheetProps {

// }

export const CreateSheet: React.FC = () => {
  const { state } = useContext(ProgramContext);

  return (
    <span className="inline-flex rounded-md shadow-sm">
      <button
        className="inline-flex items-center px-6 py-3 border border-gray-300 text-base leading-6 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
        onClick={() => exportToSpreadsheet(state)}
      >
        Create Spreadsheet
      </button>
    </span>
  );
};
