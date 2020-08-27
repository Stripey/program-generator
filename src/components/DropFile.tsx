import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

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
          .map((string) => string.trimStart());
        // console.log(typeof data);
        stringArray.forEach((string) => console.log(string));
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
