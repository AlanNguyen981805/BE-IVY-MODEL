import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import initRouter from './routes';
import connectDb from './config/connectDatabase';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

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