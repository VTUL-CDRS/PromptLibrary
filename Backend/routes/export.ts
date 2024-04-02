import { prisma } from "../lib/prisma";
import express, { Request, Response } from "express";

// Create the router object
const router = express.Router();

/** 
 * Function to export a list of prompt ids. Takes a json array of ids separated by a +.
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const ids = req.query.ids;
    if (typeof ids === "string") {
      // Convert to integer array
      const idArray = ids.split("+").map(function (item) {
        return parseInt(item, 10);
      });
      
      // Find prompts that match the ids provided
      const prompts = await prisma.prompt.findMany({
        where: {
          id: {
            in: idArray,
          },
        },
      });

      // Return a JSON
      res.json(prompts);
    } else {
      throw new Error("IDs must be provided as a plus-separated list");
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prompts" });
  }
});

// Export Route
module.exports = router;
