import axios from "axios";
// import { OPENAI_API_KEY } from "@/utils/env";

export const POST = async (req) => {
  const { messages } = await req.json();

  const outboundMessages = messages.map((msg) => ({
    role: msg.isUserPrompt ? "user" : "system",
    content: msg.message,
  }));

  outboundMessages.unshift({
    role: "system",
    content: "You are a helpful assistant",
  });

  const payload = {
    model: "gpt-3.5-turbo",
    messages: outboundMessages,
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 300,
    stream: false,
    n: 1,
  };

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    }
  );

  return response;
};
