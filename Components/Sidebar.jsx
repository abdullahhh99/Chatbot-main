"use client";
import { setApi } from "@/GlobalRedux/ReducerFeatures/ModelSlice";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Chats from "./Chats";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [swap, setSwap] = useState(false);
  const dispatch = useDispatch();

  const changeFunc = () => {
    setSwap(!swap);

    dispatch(setApi({ api: !swap ? "convoai" : "zukijourney" }));
  };

  return (
    <aside>
      <button
        className={`btn btn-ghost btn-circle ${isOpen && "hidden"}`}
        onClick={() => setIsOpen(true)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4 6h16M4 12h16M4 18h7'
          />
        </svg>
      </button>
      <div
        className={`fixed top-0 left-0 w-1/2 md:w-1/4 ${
          isOpen ? "translate-x-0" : "translate-x-[-100%]"
        } h-full bg-primary-content/100 overflow-hidden transition-all z-20`}
      >
        <article className='relative mx-4'>
          <div className='flex justify-end my-3'>
            <button
              className='btn btn-ghost btn-circle '
              onClick={() => setIsOpen(false)}
            >
              {/* #a6adbb */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='25'
                width='18'
                viewBox='0 0 384 512'
              >
                <path
                  fill='#ce4048'
                  d='M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z'
                />
              </svg>
            </button>
          </div>
          <div>
            <Link href='/'>
              <h1 className='btn  font-bold text-left'>Home</h1>
            </Link>
          </div>
          <Chats />
          <Link href='/chatbot/custom-chat' className='btn btn-secondary mt-4 '>
            Custom Chat
          </Link>
        </article>
        {/* <label className='swap swap-flip absolute bottom-[2%] right-4'>
          <input type='checkbox' checked={swap} onChange={changeFunc} />
          <div className='swap-on btn'>ConvoAI</div>
          <div className='swap-off btn'>Zuki Journey</div>
        </label> */}
      </div>
    </aside>
  );
};

export default Sidebar;
