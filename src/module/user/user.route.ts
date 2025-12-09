import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { IUserRole } from "./user.interface";
import { createUserSchema } from "./user.validation";
import { malterUpload } from "../../helpers/fileUploder";

export const userRouter = Router();

userRouter.get("/", checkAuth(IUserRole.ADMIN), UserController.getAll);
userRouter.get("/me", checkAuth(IUserRole.ADMIN, IUserRole.USER), UserController.me);
// userRouter.get("/:email", UserController.me);
userRouter.post("/create", malterUpload.single("image"), (req:Request, res:Response, next:NextFunction) => {
  req.body = createUserSchema.parse(JSON.parse(req.body.data));
  return UserController.createUser(req, res, next);
});

userRouter.post("/login", UserController.loginUser);
userRouter.patch("/status/:email", checkAuth(IUserRole.ADMIN), UserController.updateUserStatus);

userRouter.patch("/:email",checkAuth(IUserRole.ADMIN,IUserRole.USER), UserController.updateUser);

userRouter.delete("/:email", checkAuth(IUserRole.ADMIN), UserController.deleteUser);