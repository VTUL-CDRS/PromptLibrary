import { prisma } from "../lib/prisma";
import { searchPrompts, searchPromptsTags } from "../controllers/prompts";
import express, { Request, Response } from "express";

// Create the router object
const router = express.Router();

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
        include: {
          hasTag: {
            include: {
              tag: true
            }
          }
        }
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
    res.status(500).json({ error: "Failed to fetch prompts" });
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
    res.status(500).json({ error: "Failed to fetch prompts" });
  }
});

// Export Route
module.exports = router;
