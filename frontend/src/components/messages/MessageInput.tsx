import { Send } from "lucide-react";
import useSendMessage from "../../hooks/useSendMessage";
import { useState } from "react";

const MessageInput = () => {
	const [message, setMessage] = useState('');
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("handleSubmit")
		console.log(message)
		if (!message.trim()) return;
		await sendMessage(message);
		setMessage('');
	}


	return (
		<form className='px-4 mb-3 ' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{ loading ? (
						<span className="loading loading-spinner"/>
					) : (
						<Send className='w-6 h-6 text-white' />
					)}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;
