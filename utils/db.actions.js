"use server";

import { db } from "@/db";
import { messageArray } from "@/db/schema";
import { nanoid } from "@reduxjs/toolkit";
import { messageObj as MessageTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

// create the message array in the DB
export const createMessageArray = async () => {
  const id = nanoid();

  await db.insert(messageArray).values({
    id: id,
    title: "newArray",
  });

  return {
    id,
  };
};

export const updateArrayTitle = async (t) => {
  const res = await db
    .update(messageArray)
    .set({ title: t })
    .where(eq(messageArray.title, "newArray"))
    .returning({ id: messageArray.id });
  return res;
};
export const getArryIds = async () => {
  return await db
    .select({ id: messageArray.id, title: messageArray.title })
    .from(messageArray)
    .orderBy(desc(messageArray.createdAt))
    .all();
};

// export const getArryIds = async () => {
//   return await getChats();
// };

// create a single message in the DB
export const createSingleMessage = async (messageObj) => {
  let user = messageObj.isUserPrompt ? 1 : 0;

  await db.insert(MessageTable).values({
    id: messageObj.id,
    message: messageObj.message,
    isUserPrompt: user,
    mood: messageObj.mood,
    messageArrayId: messageObj.arrayId,
  });
};

// get the message array from the DB
export const getMessages = async () => {
  return await db.select().from(messageArray).orderBy("createdAt");
};
