import { DEMO_USERS } from "@/constants";
import type { User } from "@/types";

const AUTH_KEY = "shotnotes_auth";
const USERS_KEY = "shotnotes_users";

export function getStoredUser(): User | null {
  try {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function storeUser(user: User): void {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function clearUser(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function getRegisteredUsers(): User[] {
  try {
    const data = localStorage.getItem(USERS_KEY);
    const stored: User[] = data ? JSON.parse(data) : [];
    // Merge with demo users (without passwords in user objects)
    const demoUserObjs: User[] = DEMO_USERS.map(({ password: _p, ...u }) => u);
    const storedEmails = new Set(stored.map((u) => u.email));
    const merged = [...stored];
    demoUserObjs.forEach((u) => {
      if (!storedEmails.has(u.email)) merged.push(u);
    });
    return merged;
  } catch {
    return DEMO_USERS.map(({ password: _p, ...u }) => u);
  }
}

export function registerUser(
  email: string,
  name: string,
  _password: string
): { success: boolean; message: string; user?: User } {
  const existing = getRegisteredUsers();
  if (existing.find((u) => u.email === email)) {
    return { success: false, message: "An account with this email already exists." };
  }

  const newUser: User = {
    id: `user-${Date.now()}`,
    email,
    name,
    role: "user",
    plan: "free",
    avatar: `https://i.pravatar.cc/150?u=${email}`,
    createdAt: new Date().toISOString(),
    notesCount: 0,
    storageUsed: 0,
  };

  const storedData = localStorage.getItem(USERS_KEY);
  const stored: User[] = storedData ? JSON.parse(storedData) : [];
  stored.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(stored));

  // Store credentials separately
  const credsKey = "shotnotes_creds";
  const existingCreds = localStorage.getItem(credsKey);
  const creds: Record<string, string> = existingCreds ? JSON.parse(existingCreds) : {};
  creds[email] = _password;
  localStorage.setItem(credsKey, JSON.stringify(creds));

  return { success: true, message: "Account created successfully!", user: newUser };
}

export function loginUser(
  email: string,
  password: string
): { success: boolean; message: string; user?: User } {
  // Check demo users first
  const demoMatch = DEMO_USERS.find(
    (u) => u.email === email && u.password === password
  );
  if (demoMatch) {
    const { password: _p, ...userObj } = demoMatch;
    return { success: true, message: "Login successful!", user: userObj as User };
  }

  // Check registered users
  const credsKey = "shotnotes_creds";
  const existingCreds = localStorage.getItem(credsKey);
  const creds: Record<string, string> = existingCreds ? JSON.parse(existingCreds) : {};

  if (!creds[email]) {
    return {
      success: false,
      message: "No account found with this email. Please register first.",
    };
  }

  if (creds[email] !== password) {
    return { success: false, message: "Incorrect password. Please try again." };
  }

  const users = getRegisteredUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return { success: false, message: "Account not found. Please register." };
  }

  return { success: true, message: "Login successful!", user };
}
