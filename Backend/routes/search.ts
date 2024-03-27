import { searchPrompts } from "../controllers/prompts";
import express, {Request, Response} from 'express';

// Create the router object
const router = express.Router()

// Get Request
router.get('/', async (req: Request, res: Response) => {
  try {
    const prompts = await searchPrompts(req, res);
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Export Route
module.exports = router;