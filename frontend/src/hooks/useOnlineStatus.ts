import { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext";
import useGetConversations from "./useGetConversation";

type OnlineStatus = {
    [userId: string]: boolean;
}

const useOnlineStatus = () => {
    const [onlineStatus, setOnlineStatus] = useState<OnlineStatus>({});
    const { conversations } = useGetConversations();
    const { getSocket } = useSocketContext();

    useEffect(()=>{
        const socket = getSocket();
        if (!socket || !conversations) return; 

        conversations.forEach(conversation => {
            conversation.participants.forEach(participant => {
                socket.emit('check-user-status', participant.id, (isOnline:boolean) => {
                    setOnlineStatus((prevStatus: OnlineStatus) => ({
                        ...prevStatus,
                        [participant.id]: isOnline,
                    }))
                })
            })

        })

        socket.on('online-status-update', (userId: string) => {
            console.log('useOnlineStatus', userId)
            setOnlineStatus((prevStatus: OnlineStatus) =>({
                ...prevStatus,
                [userId]: true,
            }))
        })

        socket.on('disconnected-status-update', (userId: string) => {
            setOnlineStatus((prevStatus: OnlineStatus) =>({
                ...prevStatus,
                [userId]: false,
            }))
        })

        return ()=>{
            socket.off('check-user-stats')
            socket.off('online-status-update')
            socket.off('disconnected-status-update')
        }

    }, [conversations, getSocket])

    return onlineStatus
}

export default useOnlineStatus;