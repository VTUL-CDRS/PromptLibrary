import { prisma } from "../lib/prisma";
import express, {Request, Response} from 'express';

// Create the router object
const router = express.Router()

// Get Request
router.get('/', async (req: Request, res: Response) => {
  try {
    const tags = await prisma.tag.findMany();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get Request
router.get('/tagsearch', async (req: Request, res: Response) => {
  try {
    const { tags } = req.body; // Grab the tags from the request body
    const prompts = await prisma.prompt.findMany({
      where: {
        hasTag: {
          some: {
            tagName: {
              in: tags
            }
          }
        }
      }
    });
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Export Route
module.exports = router;