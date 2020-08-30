import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { parseText } from "../utilities/praseText";

export const DropFile: React.FC = () => {
  const onDrop = useCallback((acceptedFiles) => {
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

        console.log(parseText(stringArray))
      };
      reader.readAsText(file);
      // console.log(reader);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag and drop program files here, or click to select files</p>
    </div>
  );
};
