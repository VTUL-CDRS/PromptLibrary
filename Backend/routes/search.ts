import { searchPrompts } from "../controllers/prompts";
import express, {Request, Response} from 'express';

// Create the router object
const router = express.Router()

/**
 * Get request. Executes searchPrompts controller function.
 * Prisma implemented Full Text Search
 * Takes query from /search?q=
 */
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