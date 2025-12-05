import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const picture = req.file?.path;
    const result = await UserService.createUser(req.body, picture);
    sendResponse(res, 200, "User created successfully", result);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.loginUser(req.body);

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    
    sendResponse(res, 200, "User logged in successfully", result);
  } catch (error) {
    next(error);
  }
};

const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.me(req.params.email);
    sendResponse(res, 200, "User fetched successfully", result);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.updateUser(req.params.email, req.body);
    sendResponse(res, 200, "User updated successfully", result);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.deleteUser(req.params.email);
    sendResponse(res, 200, "User deleted successfully", result);
  } catch (error) {
    next(error);
  }
};

export const UserController = { createUser, loginUser, me, updateUser, deleteUser };
