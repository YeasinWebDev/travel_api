import  express  from 'express';
import cookieParser from "cookie-parser";
import type { Request, Response } from "express";

const app = express();



app.set("trust proxy", 1);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// test route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;