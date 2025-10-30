const SESSION_KEY = "ticketapp_session";

export interface SessionData {
  id: string;
  email: string;
  name: string;
}

/**
 * Save session data to localStorage
 */
export const setSession = (data: SessionData) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(data));
};

/**
 * Retrieve session data
 */
export const getSession = (): SessionData | null => {
  const stored = localStorage.getItem(SESSION_KEY);
  return stored ? JSON.parse(stored) : null;
};

/**
 * Check if a user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(SESSION_KEY);
};

/**
 * Log out (clear session)
 */
export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
};
