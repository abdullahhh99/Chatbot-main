import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const messageObj = sqliteTable("Message", {
  id: text("id").primaryKey(),
  message: text("message"),
  isUserPrompt: integer("isUserPrompt", { mode: "boolean" }),
  mood: text("mood"),
  messageArrayId: text("messageArrayId")
    .notNull()
    .references(() => messageArray.id),
});

export const messageArray = sqliteTable("MessageArray", {
  id: text("id").primaryKey(),
  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
  title: text("title"),
});

// export const arrayRelations = relations(messageArray, ({ many }) => ({
//   messageObjects: many(messageObj, {
//     fields: [messageObj.messageArrayId],
//     references: [messageArray.id],
//   }),
// }));

// export const messageObjRelations = relations(messageObj, ({ one }) => ({
//   messageArrayCont: one(messageArray, {
//     fields: [messageObj.messageArrayId],
//   }),
// }));
