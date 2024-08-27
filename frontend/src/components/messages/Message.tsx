import { useAuthContext } from "../../context/AuthContext";
import useConversation , { MessageType } from "../../zustand/useConversation";

function formatDateBasedOnCurrentDate(utcTimestamp: string) {
    const utcDate = new Date(utcTimestamp);
    const localDate = new Date(); // Current local date

    // Extract year, month, and day
    const isSameDay = utcDate.getFullYear() === localDate.getFullYear() &&
                      utcDate.getMonth() === localDate.getMonth() &&
                      utcDate.getDate() === localDate.getDate();

    if (isSameDay) {
        // If the day is the same, output only the time (hours and minutes)
        return utcDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
        // If the day is different, output the full date and time without seconds
        return utcDate.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    }
}


const Message = ({ message }: { message: MessageType }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();

	const fromMe = message.senderId == authUser?.id;
	const chatClass = fromMe ? "chat-end" : "chat-start";

	const img = fromMe
		? authUser?.profilePic
		: selectedConversation?.conversationProfilePic;

	const bubbleBg = fromMe ? "bg-blue-500" : "";


	const isOnline = fromMe
		? true
		: selectedConversation?.participants[0].onlineStatus == 'online';
	console.log("Message.tsx: participants", selectedConversation?.participants[0])
	console.log("Message.tsx: isOnline", selectedConversation?.participants[0].username, isOnline)

	return (
		<div className={`chat ${chatClass}`}>
			<div className={`hidden md:block chat-image avatar ${isOnline ? "online" : ""}`}>
				<div className='w-6 md:w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={img} />
				</div>
			</div>
			<p className={`chat-bubble text-white ${bubbleBg} text-sm md:text-md`}>{message.body}</p>
			<span className='chat-footer opacity-50 text-xs flex gap-1 items-center text-white'>{formatDateBasedOnCurrentDate(message.createdAt)}</span>
		</div>
	);
};
export default Message;
