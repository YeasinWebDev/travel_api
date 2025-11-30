import { IUser } from "../module/user/user.interface";
import { generateToken } from "./jwt";

/**
 * Creates a JWT token for a given user
 *
 * @param {Partial<IUser>} user - The user to create a token for
 * @returns {Promise<{accessToken: string}>} A promise that resolves with an object containing the JWT token
 */
export const createToken = (user: Partial<IUser>) => {
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(jwtPayload, process.env.JWT_SECRET!, process.env.ACCESS_EXPERTED!);

  const refreshToken = generateToken(jwtPayload, process.env.JWT_SECRET!, process.env.REFRESH_EXPERTED!);

  return { accessToken, refreshToken };
};