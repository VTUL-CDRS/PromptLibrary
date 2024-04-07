import { prisma } from "../lib/prisma";
import { searchPrompts, searchPromptsTags } from "../controllers/prompts";
import express, { Request, Response } from "express";

// Create the router object
const router = express.Router();

// Get Request
router.get("/all", async (req: Request, res: Response) => {
  try {
    const prompts = await prisma.prompt.findMany({
      include: {
        hasTag: {
          include: {
            tag: true
          }
        }
      }
    });

    res.json(prompts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prompts" });
  }
});

// Get Request. But only approved
router.get("/", async (req: Request, res: Response) => {
  try {
    const prompts = await prisma.prompt.findMany({
      where: {
        approved: true
      },
      include: {
        hasTag: {
          include: {
            tag: true
          }
        }
      }
    });

    res.json(prompts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prompts" });
  }
});

// Post Request
router.post("/", async (req: Request, res: Response) => {
  try {
    const prompts = await prisma.prompt.create(req.body);
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prompts" });
  }
});

/**
 * Update Request. Is ID specific
 */
router.patch("/:id", async (req: Request, res: Response) => {
  try {
    // Grab id from params
    const promptId = req.params.id

    const prompts = await prisma.prompt.update({
      where: {
        id: parseInt(promptId),
      },
      data: req.body
    });
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prompts" });
  }
});

/**
 * Get function. Id specific
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    // Grab the id from the params
    const tagId = req.params.id;

    //Normal stuff
    const tag = await prisma.prompt.findUnique({
      where: { id: parseInt(tagId) },
      include: {
        hasTag: {
          include: {
            tag: true
          }
        }
      }
    });

    // Check if the tag exists
    if (tag) {
      res.json(tag);
    } else {
      res.status(404).json({ error: "Tag not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prompts" });
  }
});

/**
 * Delete function. Id specific
 */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    // Grab the id from the params
    const tagId = req.params.id;

    //Normal stuff
    const tag = await prisma.prompt.delete({
      where: { id: parseInt(tagId) },
    });

    // Check if the tag exists
    if (tag) {
      res.json(tag);
    } else {
      res.status(404).json({ error: "Tag not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prompts" });
  }
});


// Export Route
module.exports = router;
