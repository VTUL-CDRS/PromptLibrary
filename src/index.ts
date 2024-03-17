import express, {Express, Request, Response} from 'express'
const port = 8000;

const app: Express = express();

app.get("/", (_ :Request, res:Response) => {
    res.send("HELLO");
})

app.listen(port, () => {
    console.log(`now listening on port ${port}`);
})