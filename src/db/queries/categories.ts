import { db } from "..";
import { categories } from "../schema";

export const getCategories = async () => {
  return await db.select().from(categories);
};
