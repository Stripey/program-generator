import React, { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";

import { parseText } from "../utilities/praseText";
import { ProgramContext } from "../state/ProgramContext";

export const DropFile: React.FC = () => {
  const { loadProgram } = useContext(ProgramContext);

  // This causes a lot of re-renderings I dont know how to fix
  // This might be caused fron useContext making loadProgram a new function
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file: any) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          const data: string = reader.result as string;
          const stringArray: string[] = data
            .split("\n")
            .filter((string) => string !== "")
            .map((string) => string.trim());
          // console.log(typeof data);
          // stringArray.forEach((string) => console.log(string));

          // console.log(parseText(stringArray))
          loadProgram(parseText(stringArray));
        };
        reader.readAsText(file);
        // console.log(reader);
      });
    },
    [loadProgram]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      className="flex justify-center bg-white px-4 py-5 border-b border-gray-200 sm:px-6"
      {...getRootProps()}
    >
      <div className="text-lg leading-6 font-medium text-gray-900">
        <input {...getInputProps()} />
        <p className="self-center">Drag and drop program files here, or click to select files</p>
      </div>
    </div>
  );
};
