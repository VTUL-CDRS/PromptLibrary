import { prisma } from "../lib/prisma";
import express, {Request, Response} from 'express';

export const searchPrompts = async (req: Request, res: Response) => {
    
    const prompts = await prisma.prompt.findMany({
        where: {
            prompt: {
                search: req.query.q?.toString()
            }
        }
    })

    res.json(prompts)
}