import { prisma } from "../lib/prisma";
import express, { Request, Response } from "express";
import * as argon2 from "argon2";
// Create the router object
const router = express.Router();

/**
 * Get request for the accounts.
 * Theoretically there is only 1 account stored for a moderator account.
 */
router.post("/", async (req: Request, res: Response) => {
    try {
        // Parse Request
        const userSubmitted = req.body;
        const inUser = userSubmitted.password;
        const inPassword = userSubmitted.password;

        // Grab the account
        const account = await prisma.account.findFirst({
            where: {
                username: inUser,
            },
        });

        // Check for null
        if (!account) {
            res.status(500).json({ error: "Failed to fetch users" });
        } else {
            // check hash
            const valid = await argon2.verify(account.password, inPassword);
            if (!valid) {
                res.status(500).json({ error: "Failed to fetch users" });
            } else {
                res.json({ username: inUser, password: inPassword });
            }
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

/**
 * Get request for the accounts.
 * Theoretically there is only 1 account stored for a moderator account.
 */
router.post("/register", async (req: Request, res: Response) => {
    try {
        // Parse Request
        const userSubmitted = req.body;
        const inUser = userSubmitted.password;
        const inPassword = await argon2.hash(userSubmitted.password);
        // Grab the account
        const account = await prisma.account.create({
            data: {
                username: inUser,
                password: inPassword,
                isModerator: true,
            },
        });
        res.json(account);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// Export Route
module.exports = router;
