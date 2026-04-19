export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  avatar?: string;
  createdAt: string;
  plan: "free" | "pro" | "enterprise";
  notesCount: number;
  storageUsed: number;
}

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  type: "text" | "voice" | "image";
  tags: string[];
  color: string;
  isPinned: boolean;
  reminder?: string;
  imageUrl?: string;
  audioUrl?: string;
  createdAt: string;
  updatedAt: string;
  aiSummary?: string;
  extractedKeywords?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  category: string;
  tags: string[];
  imageUrl: string;
  readTime: number;
  publishedAt: string;
  views: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: "reminder" | "share" | "system" | "ai";
  message: string;
  read: boolean;
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  action: string;
  noteTitle?: string;
  timestamp: string;
  icon: string;
  color: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  notFeatures: string[];
  highlighted: boolean;
  badge?: string;
  color: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  notes?: number;
  voice?: number;
  image?: number;
}
