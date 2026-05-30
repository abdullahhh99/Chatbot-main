"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark as dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  setArray,
  setArrayId,
} from "@/GlobalRedux/ReducerFeatures/PromptSlice";
import "../CSS/scrollbar.css";

const ChatArea = ({ chatArray, chatId }) => {
  const dispatch = useDispatch();
  const prompt = useSelector((state) => state.prompt);
  useEffect(() => {
    dispatch(setArray(chatArray));
    if (chatId) {
      dispatch(setArrayId({ id: chatId }));
    }
  }, []);

  return (
    <div className='border-[1px] border-gray-500 sm:h-[30rem] h-[37rem] rounded-md overflow-auto scrollbar-container z-10 '>
      <div className='chatResponses mt-2 mb-4'>
        {prompt.messageArray.map((p) => {
          if (!p.isUserPrompt) {
            return (
              <>
                <div className='chat chat-start ml-2 my-1' key={p.id}>
                  <div className='chat-image avatar'>
                    <div className='w-10 rounded-full'>
                      <img alt='bot-img' src='/bot-img.png' />
                    </div>
                  </div>
                  <div className='chat-bubble h-max prose max-w-[90%]'>
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code(props) {
                          const { children, className, node, ...rest } = props;
                          const match = /language-(\w+)/.exec(className || "");
                          return match ? (
                            <SyntaxHighlighter
                              PreTag='div'
                              children={String(children).replace(/\n$/, "")}
                              language={match[1]}
                              style={dark}
                              wrapLines={true}
                              wrapLongLines={true}
                            />
                          ) : (
                            <code {...rest} className={className}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {p.message}
                    </Markdown>
                  </div>
                </div>
              </>
            );
          } else
            return (
              <>
                <div className='chat chat-end mr-2 my-1' key={p.id}>
                  <div className='chat-bubble h-max'>{p.message}</div>
                </div>
              </>
            );
        })}
      </div>
    </div>
  );
};

export default ChatArea;
