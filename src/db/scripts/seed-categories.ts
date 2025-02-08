import { db } from "..";
import { categories } from "../schema";

const categoryNames = [
  "Cars and vehicels",
  "Comedy",
  "Education",
  "Entertainment",
  "Film and animation",
  "Gaming",
  "How-to and style",
  "Music",
  "News and politics",
  "Non-profits and activism",
  "People and blogs",
  "Pets and animals",
  "Science and technology",
  "Sports",
  "Travel and events",
];

async function main() {
  console.log("Seeding categories");
  try {
    const values = categoryNames.map((name) => ({
      name,
    }));
    await db.insert(categories).values(values);
    console.log("Seeded");
  } catch (err) {
    console.log(err);
  }
}

main();
