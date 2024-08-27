import useConversation from "../../zustand/useConversation";
import useOnlineStatus from "../../hooks/useOnlineStatus";

const Conversation = ({ conversation }: { conversation: ConversationType }) => {
	console.log("from ../sidebar/Conversation.tsx")
	console.log(conversation)

	const { setSelectedConversation, selectedConversation } = useConversation();
	const isSelected = selectedConversation?.id === conversation.id
	const participants = conversation.participants

	let isOnline = false;

	const onlineStatus = useOnlineStatus();
	if (participants.length == 1) {
		const otherUser = participants[0]
		if (otherUser.id in onlineStatus) {
			isOnline = onlineStatus[otherUser.id];
			isOnline ? otherUser.onlineStatus = 'online' : otherUser.onlineStatus = 'offline'
			console.log('conversation.tsx isOnline:', otherUser.id, isOnline)
		} else {
			otherUser.onlineStatus = 'offline'
		}
	}


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
