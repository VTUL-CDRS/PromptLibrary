import { prisma } from "../lib/prisma";
import express, { Request, Response } from "express";

// Create the router object
const router = express.Router();

/** 
 * Function to export a list of prompt ids.
 * 
 * To use, just use the endpoint but include a body in the request:
 * 
 * {
 *  ids: [...]
 * }
 * 
 * Where ids has a list of integers of ids to output
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const stuff = req.body;
    const ids: any[] = stuff.ids;
      // Find prompts that match the ids provided
      const prompts = await prisma.prompt.findMany({
        where: {
          id: {
            in: ids,
          },
        },
        select: {
          prompt: true,
          response: true,
          hasTag: true,
        }
      });

      // Return a JSON
      res.json(prompts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prompts" });
  }
});

// Export Route
module.exports = router;
