import { prisma } from "../lib/prisma";
import express, {Request, Response} from 'express';

// Create the router object
const router = express.Router()

/**
 * Get function. Not id specific
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const tags = await prisma.tag.findMany();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tags' });
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
    const newTag = await prisma.tag.create({data: req.body})
    res.json(newTag);
  } catch (error) {
    res.status(500).json({ error: 'Failed to post tags' });
  }
});

/**
 * Get function. Id specific
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    // Grab the id from the params
    const tagId = req.params.id

    //Normal stuff
    const tag = await prisma.tag.findUnique({
      where: {name: tagId}
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

/**
 * Delete function. Id specific
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    // Grab the id from the params
    const tagId = req.params.id

    //Normal stuff
    const tag = await prisma.tag.delete({
      where: {name: tagId}
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