import { Request, Response } from "express"
import prisma from "../db/prisma"

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.user.id;
        const senderMessage = req.body.message;

        
        let conversation = await prisma.conversation.findFirst({
            where: {
                participants: {
                    every: {
                        id: {
                            in: [senderId, receiverId]
                        }
                    }
                }
            }
        })
        if(!conversation){
            conversation = await prisma.conversation.create({
                data: {
                    participants: {
                        connect: [
                            { id: senderId },
                            { id: receiverId }
                        ]
                    }
                }
            })
        }

        const newMessage = await prisma.message.create({
            data: {
                senderId,
                body: senderMessage,
                conversationId: conversation.id
            }
        });

        res.status(201).json(newMessage)
    } catch (error: any) {
        console.log("Error in message.controller.ts", error.message);
        res.status(500).send("internal error");
    }
}

export const getMessage = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const conversationId = req.params.id;
        console.log(conversationId)

        const conversation = await prisma.conversation.findFirst({ 
            where: { id: conversationId,
                participants: { some: { id: userId }
            } },
            include: {messages: { orderBy: {createdAt: "asc"}}}
        });
        if(!conversation) {
            return res.status(200).json([]);
        }

        res.status(200).json(conversation.messages)
    } catch (error:any) {
        console.error("Error getMessages")
    }
}

export const getSideBarConv = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;

        const conversations = await prisma.conversation.findMany({ 
            where: { participants: { some: { id: { in: [userId]} }}},
            take: 10,
            select: {
                id: true,
                participants: {
                    where: { id: { not: userId }},
                    select: {
                        id: true,
                        fullName: true,
                        username: true,
                        profilePic: true,
                    }
                }
            }
        });


        res.status(200).json(conversations)
    } catch (error: any){
        res.status(500).send("internal error");
    }
}