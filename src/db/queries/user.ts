import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";

interface CreateUserParams {
  clerkId: string;
  name: string;
  imageUrl: string;
}
export const createUser = async ({
  clerkId,
  name,
  imageUrl,
}: CreateUserParams) => {
  await db.insert(users).values({
    clerkId,
    name,
    imageUrl,
  });
};

export const deleteUser = async ({ clerkId }: { clerkId: string }) => {
  await db.delete(users).where(eq(users.clerkId, clerkId));
};

interface UpdateUserParams {
  clerkId: string;
  name: string | undefined;
  imageUrl: string | undefined;
}
export const updateUser = async ({
  clerkId,
  name,
  imageUrl,
}: UpdateUserParams) => {
  await db
    .update(users)
    .set({
      name,
      imageUrl,
    })
    .where(eq(users.clerkId, clerkId));
};

export const getUserByClerkId = async ({ clerkId }: { clerkId: string }) => {
  return await db.select().from(users).where(eq(users.clerkId, clerkId));
};
