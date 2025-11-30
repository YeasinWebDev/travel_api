import AppError from "../../errorHelpers/AppError";
import { filterWithPagination } from "../../utils/filterWithPagination";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";

const createDivision = async (payload: IDivision) => {
  const isExists = await Division.findOne({ name: payload.name });
  if (isExists) throw new AppError("Division already exist", 400);
  const division = Division.create(payload);
  return division;
};

const getAllDivisions = async(page: number, limit: number,search: string) => {
  const divisions = await filterWithPagination(Division, { page, limit, search ,searchFields: ["name"] });
  return divisions;
};

const getDivision = (id: string) => {
  const isExists = Division.findById(id);
  if (!isExists) throw new AppError("Division does not exist", 400);
  const division = Division.findById(id);
  return division;
};

const updateDivision = (id: string, payload: Partial<IDivision>) => {
  const isExists = Division.findById(id);
  if (!isExists) throw new AppError("Division does not exist", 400);
  const division = Division.findByIdAndUpdate(id, payload, { new: true });
  return division;
};

const deleteDivision = (id: string) => {
  const isExists = Division.findById(id);
  if (!isExists) throw new AppError("Division does not exist", 400);
  const division = Division.findByIdAndDelete(id);
  return division;
};

export const DivisionService = {
  createDivision,
  getAllDivisions,
  getDivision,
  updateDivision,
  deleteDivision,
};