import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import initRouter from './routes';
import cors from "cors";
import connectDb from './config/connectDatabase';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRouter(app)

connectDb()

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running here');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});