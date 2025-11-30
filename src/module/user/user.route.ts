import { Router } from "express";
import { UserController } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { IUserRole } from "./user.interface";

export const userRouter = Router();

userRouter.get("/:email", UserController.me);
userRouter.post("/create", UserController.createUser);
userRouter.post("/login", UserController.loginUser);
userRouter.patch("/:email", UserController.updateUser);
userRouter.delete("/:email", checkAuth(IUserRole.ADMIN), UserController.deleteUser);
