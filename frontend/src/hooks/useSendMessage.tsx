import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessages = () => {
    const [ loading, setLoading ] = useState(false);
    const { setMessages, messages, selectedConversation } = useConversation();




    const sendMessage = async (messageBody: string) => {
        if (!selectedConversation) {
            return;
        }

        const participants = selectedConversation.participants;

        if (participants?.length === 1) {
            console.log(participants[0].id, messageBody)
            console.log(`/api/messages/send/${participants[0].id}`)
            setLoading(true)
            try {
                const res = await fetch(`/api/messages/send/${participants[0].id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: messageBody
                    })
                })

                const result = await res.json();
                if (result.error) throw new Error(result.error);

                setMessages([...messages, result]);
            } catch(error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false)
            }
        }
        // else group chat

    }

    return { sendMessage, loading };
}

export default useSendMessages

