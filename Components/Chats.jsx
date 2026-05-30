import Link from "next/link";
import { getArryIds } from "@/utils/db.actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setArrayId } from "@/GlobalRedux/ReducerFeatures/PromptSlice";
import { useSelector } from "react-redux";
import "../CSS/scrollbar.css";

const Chats = () => {
  const { dbUpdate } = useSelector((state) => state.prompt);
  const [chats, setChats] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getChats() {
      const chatsFetched = await getArryIds();
      setChats(chatsFetched);
    }
    getChats();
  }, [dbUpdate]);

  return (
    <>
      <div>
        <h1 className='text-xl mt-2 font-bold'>Chats</h1>
        <ul>
          <Link
            className='btn px-3 grid grid-cols-2 rounded cursor-pointer mt-3 truncate w-[90%]'
            href={`/chatbot`}
          >
            <span
              className='justify-self-start'
              onClick={() => dispatch(setArrayId({ id: "" }))}
            >
              New Chat
            </span>
            <span className='justify-self-end pr-3'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='14'
                width='12.25'
                viewBox='0 0 448 512'
              >
                <path
                  fill='#a6adbb'
                  d='M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z'
                />
              </svg>
            </span>
          </Link>
          <div className='h-[20rem] overflow-auto mt-4 scrollbar-container '>
            {chats.map((chat) => (
              <Link
                href={`/chatbot/${chat.id}`}
                key={chat.id}
                // className='truncate'
              >
                <div className='btn justify-start px-3 rounded cursor-pointer mt-3 w-[90%]'>
                  <p className='truncate'>{chat.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </ul>
      </div>
    </>
  );
};

export default Chats;
