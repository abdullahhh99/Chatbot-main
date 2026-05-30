"use client";

import { OpenAIStream, StreamingTextResponse } from "ai";
import { prompts } from "./prompts";
import { createSingleMessage as setMessage } from "./db.actions";
import { nanoid } from "@reduxjs/toolkit";

export const runtime = "edge";

let fileCont = "";
const parseMessage = (messageArray, mood) => {
  const outboundMessages = messageArray.map((msg) => ({
    role: msg.isUserPrompt ? "user" : "system",
    content: msg.message,
  }));
  // case statements to switch prompts to mood

  let systemPrompt;
  switch (mood) {
    case "Normal":
      systemPrompt = prompts[0];
      break;
    case "Descriptive":
      systemPrompt = prompts[1];
      break;
    case "Concise":
      systemPrompt = prompts[2];
      break;
    case "Angry":
      systemPrompt = prompts[3];
      break;
    default:
      systemPrompt = prompts[0];
      break;
  }

  outboundMessages.unshift({
    role: "system",
    content: systemPrompt,
  });

  if (fileCont) {
    outboundMessages.unshift({
      role: "system",
      content: prompts[4] + "\n" + fileCont,
    });
  } else {
    console.log("No file contents in outbound message array");
  }

  return outboundMessages;
};

export const streamApi = async (messageArray, mood, modelN, api, arrayId) => {
  let baseUrl = "https://zukijourney.xyzbot.net";
  let API_KEY = "zu-d96fc5be3f1bad0f451ddd7cb12aef9c"; //  --- zu-b64a0b56e65f232458224d40c30322d4
  console.log(arrayId);

  if (api == "convoai") {
    baseUrl = "https://api.convoai.tech";
    API_KEY = "sk-rHk5AcwxQ6OLMkoJVzXjZYDTjYZRZSxWtpu3BhFkxmog28HL";
  }

  const outboundMessages = parseMessage(messageArray, mood);

  try {
    if (!arrayId) {
      throw new Error("No Message Chat array found");
    }

    const res = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: modelN,
        messages: outboundMessages,
        temperature: 0.4,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 500,
        stream: true,
        n: 1,
      }),
    });

    const stream = OpenAIStream(res, {
      onStart: async () => {
        const newMessage = {
          id: nanoid(5),
          message: messageArray[messageArray.length - 1].message,
          isUserPrompt: true,
          mood: mood,
          arrayId: arrayId,
        };

        await setMessage(newMessage);
      },
      onToken: async () => {},
      onCompletion: async (completion) => {
        const newMessage = {
          id: nanoid(4),
          message: completion,
          isUserPrompt: false,
          mood: mood,
          arrayId: arrayId,
        };

        await setMessage(newMessage);
      },
    });
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const setFileContents = (cont) => {
  fileCont = cont;
};
