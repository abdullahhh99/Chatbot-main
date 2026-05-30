// let counter = 0;
// let accumulatedData = "";

// const encoder = new TextEncoder();
// const decoder = new TextDecoder();

// const reader = data.response.getReader();

// while (true) {
//   const chunk = await reader.read();
//   const { done, value } = chunk;

//   if (done) {
//     break;
//   }

//   console.log(value);
// }
// console.log(data);
// code to handle streaming responses

// const stream = new ReadableStream({
//   async start(controller) {
//     function onParse(event) {
//       if (event.type === "event") {
//         const data = event.data;
//         if (data.includes("[DONE]")) {
//           controller.close();
//           console.log("closed");
//           return;
//         }
//         try {
//           const json = JSON.parse(data);
//           const text = json.choices[0].delta?.content || "";
//           console.log(event);
//           // console.log(data);

//           if (counter < 2 && (text.match(/\n/) || []).length) {
//             return;
//           }

//           const queue = encoder.encode(text);
//           controller.enqueue(queue);

//           counter++;
//         } catch (err) {
//           controller.error(err);
//         }
//       } else {
//         console.log("not reached");
//       }
//     }
//     const parser = createParser(onParse);
//     for await (const chunk of data) {
//       accumulatedData += chunk;

//       // const buffer = new TextEncoder().encode(chunk);
//       // let test = decoder.decode(buffer);
//       // console.log(test);
//       // parser.feed(decoder.decode(buffer));

//       if (accumulatedData.endsWith("]") || chunk === "") {
//         const words = accumulatedData.split(" ");
//         for (const word of words) {
//           if (word) {
//             // Process only non-empty words
//             // console.log(word);
//             const buffer = new TextEncoder().encode(word);
//             // console.log(buffer);
//             const decodedString = decoder.decode(buffer);
//             if (decodedString.includes("[DONE]"))
//               // console.log(decodedString);

//               parser.feed(decodedString);
//           }
//         }
//         accumulatedData = "";
//       }
//     }
//   },
// });

// return data.choices[0].message.content;

//////////////////////////////////////

// const reader = stream.getReader();
// const decoder = new TextDecoder();

// let done = false;

// while (!done) {
//   const { value, done: doneReading } = await reader.read();
//   done = doneReading;
//   const chunkValue = decoder.decode(value);
//   console.log(chunkValue);
//   // reading done now displaying left!
//   console.log("fetching");
// }
