import { prisma } from "../lib/prisma";
import express, {Request, Response} from 'express';

// Create the router object
const router = express.Router()

/**
 * Get function. Not id specific
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const tags = await prisma.lLM.findMany();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch llms' });
  }
});

/**
 * Post function. Just pushes a tag name
 * 
 * The tag specics are: just the string name.
 */
router.post('/', async (req: Request, res: Response) => {
  // Need body
  try {
    const newTag = await prisma.lLM.create({data: req.body})
    res.json(newTag);
  } catch (error) {
    res.status(500).json({ error: 'Failed to post llms' });
  }
});

/**
 * Delete function. Id specific
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    // Grab the id from the params
    const tagId = req.params.id

    //Normal stuff
    const tag = await prisma.lLM.delete({
      where: {llmName: tagId}
    });

    // Check if the tag exists
    if (tag) {
      res.json(tag);
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

// Export Route
module.exports = router;