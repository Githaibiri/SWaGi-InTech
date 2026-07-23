import bcrypt from "bcryptjs";

/**
 * Hash a password before storing it in the database.
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

/**
 * Compare a plain password with its stored hash.
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}