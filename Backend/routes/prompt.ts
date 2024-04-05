import { prisma } from "../lib/prisma";
import { searchPrompts, searchPromptsTags } from "../controllers/prompts";
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

// Get Request
router.post("/", async (req: Request, res: Response) => {
  try {
    const prompts = await prisma.prompt.create(req.body);
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
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

/**
 * Tag search. Filter by however many tags are inputted.
 * /prompt/tagsearch?tags=Cooking
 */
router.get("/tagSearch", async (req: Request, res: Response) => {
  try {
    const tags = req.query.tags;
    //const { tags } = req.query;
    if (typeof tags === "string") {
      const tagArray = tags.split("+");
      const prompts = await prisma.prompt.findMany({
        where: {
          hasTag: {
            some: {
              tagId: {
                in: tagArray,
              },
            },
          },
        },
      });
      res.json(prompts);
    } else {
      throw new Error("Tags must be provided as a plus separated list");
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prompts" });
  }
});

/**
 * Get request. Executes searchPrompts controller function.
 * Prisma implemented Full Text Search
 * Takes query from /search?q=
 */
router.get("/textsearch", async (req: Request, res: Response) => {
  try {
    const prompts = await searchPrompts(req, res);
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

/**
 * Tag Searching AND Full Text Search
 * Exact same req body requirements as tag searching.
 *  Must be an array of strings. Each tag is split by '+'
 *
 * http://localhost:8000/search/fullsearch?q=Steak&tags=Cooking
 */
router.get("/fullsearch", async (req: Request, res: Response) => {
  try {
    const prompts = await searchPromptsTags(req, res);
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});



// Export Route
module.exports = router;
