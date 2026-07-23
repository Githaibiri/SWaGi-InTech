/**
 * Generate a secure session token.
 */
export function generateSessionToken(): string {
  return crypto.randomUUID();
}

/**
 * Session lifetime (24 hours).
 */
export const SESSION_DURATION_HOURS = 24;

/**
 * Calculate when the session expires.
 */
export function getSessionExpiry(): Date {
  const expiry = new Date();
  expiry.setHours(expiry.getHours() + SESSION_DURATION_HOURS);
  return expiry;
}