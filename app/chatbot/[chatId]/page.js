import ChatArea from "@/Components/ChatArea";
import { db } from "@/db";
import { messageObj } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function ChatPage({ params }) {
  console.log(params.chatId);
  const chatArray = await db
    .select()
    .from(messageObj)
    .where(eq(messageObj.messageArrayId, params.chatId));

  return (
    <>
      <ChatArea chatArray={chatArray} chatId={params.chatId} />
    </>
  );
}
