import  express  from 'express';
import cookieParser from "cookie-parser";
import type { Request, Response } from "express";
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { notFound } from './middlewares/notFound';
import { userRouter } from './module/user/user.route';

const app = express();

app.set("trust proxy", 1);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// test route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});


app.use("/api/v1/user", userRouter)

// global error handlers
app.use(globalErrorHandler);
app.use(notFound);


export default app;