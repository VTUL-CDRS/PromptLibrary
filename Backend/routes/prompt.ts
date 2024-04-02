import { prisma } from "../lib/prisma";
import express, { Request, Response } from "express";

// Create the router object
const router = express.Router();

// Get Request
router.get("/", async (req: Request, res: Response) => {
  try {
    const prompts = await prisma.prompt.findMany();
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

/**
 * Tag search. Filter by however many tags are inputted.
 */
router.get("/tagsearch", async (req: Request, res: Response) => {
  try {
    const tags = req.query.tags;
    //const { tags } = req.query;
    console.log(tags);
    if (typeof tags === "string") {
      const tagArray = tags.split("+");
      const prompts = await prisma.prompt.findMany({
        where: {
          hasTag: {
            some: {
              tagName: {
                in: tagArray,
              },
            },
          },
        },
      });
      res.json(prompts);
    } else {
      throw new Error("Tags must be provided as a comma-separated list");
    }
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
    });

    // Check if the tag exists
    if (tag) {
      res.json(tag);
    } else {
      res.status(404).json({ error: "Tag not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tags" });
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
    res.status(500).json({ error: "Failed to fetch tags" });
  }
});

// Export Route
module.exports = router;
