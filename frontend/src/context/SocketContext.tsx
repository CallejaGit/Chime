import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

type MainSocket = {
    socket: Socket | null;
    getSocket: () => Socket | null;
}

export const SocketContext = createContext<MainSocket>({
    socket: null,
    getSocket: () => null,
})

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({children}:{children:ReactNode}) => {
    const [ socket, setSocketState ] = useState<Socket | null>(null)
    const { isLoading, authUser } = useAuthContext();

    const getSocket = () => {
        return socket;
    }

    useEffect(() => {   
        if (!isLoading && authUser) {
            console.log('SocketContext: finished loading')
            const socket = getSocket();
            if (!socket) {

                const newSocket = io('http://localhost:5000')
                setSocketState(newSocket)
                newSocket.emit('user-online', authUser.id)
            }
        }

        return () => {
            if(socket){
                socket.disconnect();
                setSocketState(null);
            }
        }
    }, [socket, authUser])

    return(
        <SocketContext.Provider value={{socket, getSocket: () => socket}}>
            {children}
        </SocketContext.Provider>
    )
}

