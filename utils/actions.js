"use server";
import { revalidateTag } from "next/cache";

// zu-b56d44c2d9a4a66112832e0467e81b1b ----------- Zuki Journey @ https://zukijourney.xyzbot.net/v1
// sk-rHk5AcwxQ6OLMkoJVzXjZYDTjYZRZSxWtpu3BhFkxmog28HL -------- ConvoAI @ https://api.convoai.tech
// messages: [
//           {
//             role: "user",
//             content: messageObj.message,
//           },
//         ],

// import { db } from "@/db";
// import { messageArray as Chat } from "@/db/schema";
// import { eq } from "drizzle-orm";
// import { OpenAIStream, StreamingTextResponse } from "ai";

// export const parseMessage = (messageArray, mood) => {
//   const outboundMessages = messageArray.map((msg) => ({
//     role: msg.isUserPrompt ? "user" : "system",
//     content: msg.message,
//   }));
//   console.log(mood);

// case statements to switch prompts to mood

//   let systemPrompt;
//   switch (mood) {
//     case "Normal":
//       systemPrompt = prompts[0];
//       console.log("first");
//       break;
//     case "Descriptive":
//       systemPrompt = prompts[1];
//       break;
//     case "Concise":
//       systemPrompt = prompts[2];
//       break;
//     case "Angry":
//       systemPrompt = prompts[3];
//       break;
//     default:
//       systemPrompt = prompts[0];
//       break;
//   }

//   outboundMessages.unshift({
//     role: "system",
//     content: systemPrompt,
//   });

//   console.log(outboundMessages);
//   return outboundMessages;
// };

// API HANDLING

export default async function revalTag() {
  revalidateTag("get-title-of-message-array");
}

export const apiReq = async (messageArray, mood, modelN, api, arrayId) => {
  let baseUrl = "https://zukijourney.xyzbot.net";
  let API_KEY = "zu-b64a0b56e65f232458224d40c30322d4";

  if (api == "convoai") {
    baseUrl = "https://api.convoai.tech";
    API_KEY = "sk-rHk5AcwxQ6OLMkoJVzXjZYDTjYZRZSxWtpu3BhFkxmog28HL";
  }

  const outboundMessages = parseMessage(messageArray, mood);
  try {
    if (!arrayId) {
      throw new Error("No Message Chat array found");
    }

    // const msgArrayId = db
    //   .select({
    //     id: arrayId,
    //   })
    //   .from(Chat)
    //   .where(eq(Chat.id, arrayId));

    // if (!msgArrayId) {
    //   throw new Error("No Message Chat array ID found");
    // }
    const { data } = await axios.post(
      ` ${baseUrl}/v1/chat/completions`,
      {
        messages: outboundMessages,
        model: `${modelN}`,
        max_tokens: 300,
        temperature: 0.4,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        // stream: false,
        stream: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    // console.log("success");

    // return data.choices[0].message.content;
    const stream = OpenAIStream(data);
    return new StreamingTextResponse(stream);
  } catch (error) {
    // console.log(error.response.data.error.message);
    // switch (error.response.status) {
    //   case 401:
    //     throw new Error("Error: Invalid API key");
    //   case 402:
    //     throw new Error(`Error: ${error.response.data.error.message}`);
    //   case 404:
    //     throw new Error("Error: Model not found");
    //   case 429:
    //     throw new Error("Error: Wait a bit senpai!");
    //   default:
    //     throw new Error(
    //       `An Unknown Error Occured: ${error.response.data.error.message}`
    //     );
    // }
    console.log(error);
    return error;
  }
};
