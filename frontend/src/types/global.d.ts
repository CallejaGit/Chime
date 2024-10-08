type ParticipantType = {
    id: string;
    fullName: string;
    username: string;
    profilePic: string;
    onlineStatus: string;
}

type ConversationType = {
    id: string;
    conversationName: string;
    conversationProfilePic: string;
    participants: ParticipantType[];
}