import ChatArea from "@/Components/ChatArea";
import InputBar from "@/Components/InputBar";
import Navbar from "@/Components/Navbar";

export default function ChatPage({ children }) {
  return (
    <>
      <Navbar />
      <div className='grid grid-cols-1 h-full md:gap-3 gap-12 w-[90%] mx-auto max-w-screen-md'>
        {children}
        <InputBar />
      </div>
    </>
  );
}
