import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation }: { conversation: ConversationType }) => {
	console.log("from ../sidebar/Conversation.tsx")
	console.log(conversation)

	const { setSelectedConversation, selectedConversation } = useConversation();
	const isSelected = selectedConversation?.id === conversation.id

	const { isLoading, authUser } = useAuthContext();
	const { getSocket } = useSocketContext();

	const [isOnline, setIsOnline] = useState(false);

	useEffect(()=> {
		if (!isLoading && authUser) {
			const socket = getSocket();
			if (socket) {
				const participants = conversation.participants
				if (participants.length = 1) {
					const userId = participants[0].id
					socket.emit('check-user-status', userId, (isOnline: boolean) => {
						setIsOnline(isOnline)
					})
				}
				socket.on('online-status-update', (userId) => {
					console.log("participants: ", participants, userId)
					if (userId == participants[0].id) {
						setIsOnline(true)
					}
				})
				socket.on('disconnected-status-update', (userId) => {
					if (userId == participants[0].id) {
						setIsOnline(false)
					}
				})
			}
		}
		return () => {
			const socket = getSocket();
			if(socket){
				socket.off('online-status-update');
			}
		}

	}, [isLoading, authUser, isOnline])

	return (
		<>
			<div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected? 'bg-sky-500': ""}`
			}
			onClick={() => setSelectedConversation(conversation)}
			>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-8 md:w-12 rounded-full'>
						<img src={conversation.conversationProfilePic} alt='user avatar' />
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200 text-sm md:text-md'>{conversation.conversationName}</p>
						{/* <span className='text-xl hidden md:inline-block'>{conversation.emoji}</span> */}
					</div>
				</div>
			</div>

			<div className='divider my-0 py-0 h-1' />
		</>
	);
};
export default Conversation;
