import { prisma } from "../lib/prisma";
import express, {Request, Response} from 'express';

export const searchPrompts = async (req: Request, res: Response) => {
    const prompts = await prisma.prompt.findMany({
        where: {
            prompt: {
                search: req.query.q?.toString()
            },
            response: {
                search: req.query.q?.toString()
            },
            llmName: {
                search: req.query.q?.toString()
            }
        }
    })
    res.json(prompts)
}

export const searchPromptsTags = async (req: Request, res: Response) => {
    try {
        const { tags } = req.query; 
        if (typeof tags === 'string') {
            const tagArray = tags.split('+');
            const prompts = await prisma.prompt.findMany({
                where: {
                    prompt: {
                        search: req.query.q?.toString()
                    },
                    response: {
                        search: req.query.q?.toString()
                    },
                    llmName: {
                        search: req.query.q?.toString()
                    },
                    hasTag: {
                        some: {
                        tagId: {
                            in: tagArray
                        }
                        }
                    }
                }
            })
            res.json(prompts)
        }
        else {
            throw new Error('Tags must be provided as a comma-separated list')
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch prompts' });
    }
}