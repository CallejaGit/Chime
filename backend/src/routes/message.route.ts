import express from 'express';
import protectRoute from '../middleware/protectRoute';
import { sendMessage, getMessage, getSideBarConv } from '../controllers/message.controller';

const router = express.Router();

router.get("/conversations", protectRoute, getSideBarConv);
router.post("/send/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, getMessage);


export default router;