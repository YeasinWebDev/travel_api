import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { filterWithPagination } from "../../utils/filterWithPagination";
import { createToken } from "../../utils/userToken";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcryptjs";

const createUser = async (payload: Partial<IUser>, profileImage?: string) => {
  const isExist = await User.findOne({ email: payload.email });
  if (isExist) {
    throw new AppError("User already exist", 400);
  }
  const hashedPassword = await bcrypt.hash(payload.password!, 10);
  payload.password = hashedPassword;
  if (profileImage) {
    payload.profileImage = profileImage;
  }
  const user = User.create(payload);
  return user;
};

const loginUser = async (payload: Partial<IUser>) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError("User does not exist", 400);
  }

  if (user.status === "inactive") {
    throw new AppError("User is inactive", 400);
  }

  const isPasswordMatch = await bcrypt.compare(payload.password!, user.password!);
  if (!isPasswordMatch) {
    throw new AppError("Password does not match", 400);
  }

  const token = createToken(user);

  return { user, accessToken: token.accessToken, refreshToken: token.refreshToken };
};

const me = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("User does not exist", 400);
  }
  const res = {
    _id: user._id,
    email: user.email,
    role: user.role,
    name: user.name,
    profileImage: user.profileImage,
    location: user.location,
    travelInterests: user.travelInterests,
  };
  return res;
};

const updateUser = async (email: string, payload: Partial<IUser>) => {
  const user = await User.findOneAndUpdate({ email }, payload, { new: true });
  if (!user) {
    throw new AppError("User does not exist", 400);
  }
  return user;
};

const deleteUser = async (email: string) => {
  const user = await User.findOneAndDelete({ email });
  if (!user) {
    throw new AppError("User does not exist", 400);
  }
  return user;
};

const updateUserStatus = async (email: string, status: "active" | "inactive") => {
  const user = await User.findOneAndUpdate({ email }, { status }, { new: true });
  if (!user) {
    throw new AppError("User does not exist", 400);
  }
  return user;
};

const getAll = async (page: number, limit: number, search: string , userData:JwtPayload) => {
  const users = await filterWithPagination(User, { page, limit, search, searchFields: ["name","email"] ,filters: {
      email: { $ne: userData.email } 
    }});
  return users;
};

export const UserService = { createUser, loginUser, me, updateUser, deleteUser , getAll,updateUserStatus };
