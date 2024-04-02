import { prisma } from "../lib/prisma";
import express, { Request, Response } from "express";

// Create the router object
const router = express.Router();

// Search for and return a JSON object of prompts with the id
router.get("/", async (req: Request, res: Response) => {
  /*
  try {
    const { ids } = req.query;
    if (typeof ids === "string") {
      const idArray = ids.split("+");
      const prompts = await prisma.prompt.findMany({
        where: {
          id: {
            in: idArray,
          },
        },
      });
      res.json(prompts);
    } else {
      throw new Error("IDs must be provided as a plus-separated list");
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prompts" });
  }*/
});

// Export Route
module.exports = router;
