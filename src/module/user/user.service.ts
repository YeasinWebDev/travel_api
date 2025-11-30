import AppError from "../../errorHelpers/AppError";
import { createToken } from "../../utils/userToken";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcryptjs";

const createUser = async (payload:Partial<IUser>) => {
    const isExist = await User.findOne({ email: payload.email });
    if(isExist) {
        throw new AppError("User already exist", 400);
    }
    const hashedPassword = await bcrypt.hash(payload.password!,10);
    payload.password = hashedPassword;
    const user = User.create(payload);
    return user;
};

const loginUser = async (payload:Partial<IUser>) => {
    const user = await User.findOne({ email: payload.email });
    if(!user) {
        throw new AppError("User does not exist", 400);
    }

    const isPasswordMatch = await bcrypt.compare(payload.password!, user.password!);
    if(!isPasswordMatch) {
        throw new AppError("Password does not match", 400);
    }

    const token = createToken(user);

    return { user, accessToken: token.accessToken, refreshToken: token.refreshToken };
};

const me = async (email:string) => {
    const user = await User.findOne({ email });
    if(!user) {
        throw new AppError("User does not exist", 400);
    }
    return user;
};

const updateUser = async (email:string, payload:Partial<IUser>) => {
    const user = await User.findOneAndUpdate({ email }, payload, { new: true });
    if(!user) {
        throw new AppError("User does not exist", 400);
    }
    return user;
};

const deleteUser = async (email:string) => {
    const user = await User.findOneAndDelete({ email });
    if(!user) {
        throw new AppError("User does not exist", 400);
    }
    return user;
};

export const UserService = { createUser, loginUser, me, updateUser, deleteUser };