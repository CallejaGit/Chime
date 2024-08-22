import { Search } from "lucide-react";
import { useState } from "react";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversation";
import toast from "react-hot-toast";


const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("search term must be at least 3 characters long");
		}


		const foundConversation = conversations.find((c: ConversationType) => 
			c.participants.some(participant =>
				participant.fullName.toLowerCase().includes(search.toLowerCase()) ||
				participant.username.toLowerCase().includes(search.toLowerCase())
			));

		console.log("/sidebar/SearchInput.tsx")

		console.log(conversations)

		if (foundConversation) {
			setSelectedConversation(foundConversation);
			setSearch("");
		} else toast.error("no such user found!")

	}

	return (
		<form className='flex items-center gap-2' onSubmit={handleSubmit}>
			<input
				type='text'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder='Search…'
				className='input-sm md:input input-bordered rounded-full sm:rounded-full w-full'
			/>
			<button type='submit' className='btn md:btn-md btn-sm btn-circle bg-sky-500 text-white  '>
				<Search className='w-4 h-4 md:w-6 md:h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;
