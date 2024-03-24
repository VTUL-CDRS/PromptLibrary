import { PrismaClient } from '@prisma/client'
import { prisma } from "@/prisma/prisma";
import express, {Request, Response} from 'express';

const router = express.Router()
const app = express()
app.use(express.json());

app.get('/tag', async (req: Request, res: Response) => {
    try {
      const tags = await prisma.tag.findMany();
      res.json(tags);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });