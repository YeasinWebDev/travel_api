export enum IUserRole {
    USER = "user",
    ADMIN = "admin",
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  profileImage: string;
  password: string;
  role: IUserRole;
  travelInterests?: string[];
  location?: string;
  status?: "active" | "inactive";
}

