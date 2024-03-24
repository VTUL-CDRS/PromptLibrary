import { prisma } from "../lib/prisma";
import express, {Request, Response} from 'express';

// Create the router object
const router = express.Router()

// Get Request
router.get('/', async (req: Request, res: Response) => {
  try {
    const accounts = await prisma.account.findMany();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Export Route
module.exports = router;