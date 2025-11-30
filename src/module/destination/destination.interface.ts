import { Types } from "mongoose";

export interface IDestination {
  _id?: string;
  name: string;
  location: string;
  description: string;
  image: string[];
  interests: string[];
  division: Types.ObjectId;
  price: number;
  bestTimeToVisit: string;
  activities: string[];
  isFeatured: boolean;
  status: "active" | "inactive";
  rating?: number;
  reviewCount?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}
