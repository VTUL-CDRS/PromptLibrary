import { prisma } from "../lib/prisma";
import { searchPrompts, searchPromptsTags } from "../controllers/prompts";
import express, { Request, Response } from "express";

// Create the router object
const router = express.Router();

/**
 * General Get Request. Returns all prompts including unapproved prompts.
 */
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

/**
 * Get all unapproved prompts
 */
router.get("/unapproved", async (req: Request, res: Response) => {
  try {
    const prompts = await prisma.prompt.findMany({
      where: {
        approved: false
      }
    });

    res.json(prompts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prompts" });
  }
});


/**
 * General Get Request. Returns all prompts excluding unapproved prompts.
 */
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

/**
 * Post request. Requires a req body.
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { prompt, response, image, rating, approved, llmName, summary, title, tags } = req.body;

    // Create the Prompt
    const createdPrompt = await prisma.prompt.create({
      data: {
        prompt,
        response,
        image,
        rating,
        approved,
        llmName,
        summary,
        title,
        hasTag: {
          create: tags.map((tag: {tagName: String}) => ({
            tag: {
              connectOrCreate: {
                where: {
                  name: tag.tagName
                },
                create: {
                  name: tag.tagName
                }
              }
            }
          }))
        },
      }})
    res.status(200);
    res.json(createdPrompt);
  } catch (error) {
    console.error("Prisma error:", error);
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

    // Check if the Prompt exists
    if (prompts) {
      res.json(prompts);
    } else {
      res.status(404).json({ error: "Prompt not found" });
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
    const promptId = parseInt(req.params.id);

    // Retrieve the prompt from the database and check existance
    const prompt = await prisma.prompt.findUnique({
      where: { id: promptId },
    });
    if (!prompt) {
      return res.status(404).json({ error: "Prompt not found" });
    }

    // Delete the has tag first since it foreign keys the prompt id
    await prisma.hasTag.deleteMany({
      where: { promptId: promptId }
    });
    const deleteRes = await prisma.prompt.delete({
      where: { id: promptId },
    });

    res.json(deleteRes)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prompts" });
  }
});


// Export Route
module.exports = router;
