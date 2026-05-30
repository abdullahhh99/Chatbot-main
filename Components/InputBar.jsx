"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPrompt,
  resetMsg,
  pushinArray,
  setStreaminArray,
  setArrayId,
  setdbUpdate,
} from "@/GlobalRedux/ReducerFeatures/PromptSlice";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "@reduxjs/toolkit";
import ErrorComp from "./ErrorComp";
import { createMessageArray, updateArrayTitle } from "@/utils/db.actions";
import { streamApi } from "@/utils/streamingResponse";

const InputBar = () => {
  const [inpPrompt, setInpPrompt] = useState("");
  const [inpMood, setInpMood] = useState("normal");
  const [dbUploading, setdbUploading] = useState(false);
  const dispatch = useDispatch();
  const { model, api } = useSelector((state) => state.modelName);
  const { messageArray, arrayId } = useSelector((state) => state.prompt);

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["chatbot"],
    mutationFn: (mood) => {
      return streamApi(messageArray, mood, model, api, arrayId);
    },
    onSuccess: async (stream) => {
      console.log("done");

      if (!stream.body) {
        console.log("Stream body is Null!");
        // return;
      }
      const messageObj = {
        id: nanoid(),
        message: "",
        isUserPrompt: false,
        mood: inpMood,
      };
      dispatch(pushinArray(messageObj));

      const reader = stream.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();

        const text = decoder.decode(value);

        dispatch(setStreaminArray({ text: text }));

        if (done) {
          console.log("finished streaming");
          break;
        }
      }
    },
    onError: (error) => {
      return error;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const messageObj = {
      id: "local",
      message: inpPrompt.trim(),
      isUserPrompt: true,
      mood: inpMood,
    };

    setInpPrompt("");

    // Creating a message array if it does not exist

    try {
      if (!arrayId) {
        setdbUploading(true);
        const messageArrId = await createMessageArray();
        setdbUploading(false);
        dispatch(setArrayId({ id: messageArrId.id }));
      }
    } catch (error) {
      alert("Error creating message array: " + error);
      return;
    }

    dispatch(
      setPrompt({
        messageArray: messageObj,
        messageObj,
      })
    );
    dispatch(resetMsg());

    mutate(messageObj.mood);

    try {
      const res = await updateArrayTitle(messageObj.message);
      if (res) dispatch(setdbUpdate());
    } catch (error) {
      console.log(error);
    }
  };
  if (error) {
    console.log(error);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='self-center mb-6 w-[100%] justify-self-center '
    >
      <label className='input input-bordered flex items-center gap-2 relative'>
        <input
          type='text'
          className={`input-ghost grow rounded placeholder:italic placeholder:text-sm w-full ${
            isPending && "opacity-50"
          }`}
          placeholder='Ask me Anything'
          name='prompt'
          value={inpPrompt}
          onChange={(e) => setInpPrompt(e.target.value)}
          autoComplete='off'
          spellCheck='true'
          disabled={isPending || dbUploading}
        />

        {isPending && (
          <span className='loading loading-bars loading-md absolute left-1/2 translate-x-[-50%]'></span>
        )}

        {/* Dropdown Mood Select */}
        <select
          className={`select border-none select-ghost md:w-max w-24 focus:none ${
            isPending && "opacity-50"
          }`}
          name='mood'
          value={inpMood}
          onChange={(e) => setInpMood(e.target.value)}
        >
          <option>Normal</option>
          <option>Descriptive</option>
          <option>Concise</option>
          <option>Angry</option>
        </select>
        {/* Submission */}
        <button type='submit' disabled={inpPrompt.trim() === ""}>
          {isPending || dbUploading ? (
            <span className='loading loading-ball loading-md'></span>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='25'
              width='16'
              className='cursor-pointer'
              viewBox='0 0 448 512'
            >
              <path
                fill='#B197FC'
                d='M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z'
              />
            </svg>
          )}
        </button>
      </label>
      {error && <ErrorComp message={error.message} />}
    </form>
  );
};

export default InputBar;
