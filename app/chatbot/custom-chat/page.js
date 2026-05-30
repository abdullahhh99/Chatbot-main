import ChatArea from "@/Components/ChatArea";
import Modal from "@/Components/Modal";

const customChat = () => {
  return (
    <>
      <ChatArea chatArray={[]} chatId={""} />
      <Modal />
    </>
  );
};

export default customChat;
