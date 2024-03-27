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
    const { tags } = req.query; 
    console.log(tags);
    if (typeof tags === 'string') {
      const tagArray = tags.split('+');
      const prompts = await prisma.prompt.findMany({
        where: {
          hasTag: {
            some: {
              tagName: {
                in: tagArray
              }
            }
          }
        }
      });
      res.json(prompts);
    } else {
      throw new Error('Tags must be provided as a comma-separated list');
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prompts' });
  }
});

// Export Route
module.exports = router;