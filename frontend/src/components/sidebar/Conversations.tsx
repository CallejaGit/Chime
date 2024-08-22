import useGetConversations from "../../hooks/useGetConversation";
import Conversation from "./Conversation";

const Conversations = () => {

	const { conversations, loading } = useGetConversations();

	const transformedConversations = conversations.map((conversation) => {
		console.log("Conversation")
		console.log(conversation)
		const participant = conversation.participants[0];
		console.log("Participant:")
		console.log(participant)
		
		return {
			id: conversation.id,
			conversationName: participant.fullName,
			conversationProfilePic: participant.profilePic,
			participants: conversation.participants
		} 
	})

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{transformedConversations.map((conversation) =>  (
				<Conversation key={conversation.id} conversation={conversation} />
			))}
			{loading ? (
				<span className="loading loading-spinner mx-auto"/>
			):null}
		</div>
	);

};
export default Conversations;
