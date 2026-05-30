import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { setFileContents as setFile } from "@/utils/streamingResponse";

function MyDropzone({ setFileContents, fileContents }) {
  // const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const [reading, setReading] = useState(""); // "", "COMPLETED", "READING"

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]; // Assuming only one file is dropped
    const reader = new FileReader();

    reader.onloadstart = () => {
      setReading("READING");
    };

    reader.onload = () => {
      const fileCont = reader.result;
      setFileContents(fileCont);
      setReading("COMPLETED");
      // console.log(fileCont);

      if (fileCont) {
        // const messageObj = {
        //   id: nanoid(4),
        //   message: prompts[4] + "\n" + fileCont,
        //   isUserPrompt: false,
        //   mood: "normal",
        // };

        setFile(fileCont);
      } else {
        console.log("No File Contents Found");
      }
    };

    reader.onloadend = () => {
      setReading("");
    };

    reader.readAsText(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {fileContents == "" &&
        (isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p className='cursor-pointer'>
            Drag 'n' drop the file here, or click here
          </p>
        ))}
      {reading == "READING" && <p>Reading...</p>}
      {fileContents && (
        <div className='flex gap-2 align-middle mt-4'>
          {/* check icon */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='20'
            width='20'
            viewBox='0 0 512 512'
          >
            <path
              fill='#10da4d'
              d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z'
            />
          </svg>
          <span>File Uploaded!</span>
        </div>
      )}
    </div>
  );
}

export default MyDropzone;
