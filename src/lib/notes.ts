import type { Note } from "@/types";
import { generateId } from "@/lib/utils";

const NOTES_KEY = "shotnotes_notes";

const DEMO_NOTES: Note[] = [
  {
    id: "note-1",
    userId: "demo-user-1",
    title: "Project Kickoff Meeting",
    content: "Discussed Q1 goals with the team. Key priorities: launch new features, improve onboarding, reduce churn. Follow up with design team on mockups by Friday.",
    type: "text",
    tags: ["meeting", "work", "Q1"],
    color: "#8CE4FF20",
    isPinned: true,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    aiSummary: "Q1 priorities: new features, onboarding, churn reduction. Design mockups due Friday.",
    extractedKeywords: ["goals", "features", "onboarding", "churn", "design"],
  },
  {
    id: "note-2",
    userId: "demo-user-1",
    title: "Voice Note - Morning Ideas",
    content: "Capture the idea about integrating calendar sync. Users want to link reminders to Google Calendar. Also think about dark mode for mobile.",
    type: "voice",
    tags: ["ideas", "product"],
    color: "#FEEE9120",
    isPinned: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    aiSummary: "Product ideas: calendar sync integration, Google Calendar reminders, dark mode.",
    extractedKeywords: ["calendar", "integration", "reminders", "mobile", "darkmode"],
  },
  {
    id: "note-3",
    userId: "demo-user-1",
    title: "Recipe - Masala Chai",
    content: "2 cups water, 1 cup milk, 2 tsp tea leaves, cardamom, ginger, sugar. Boil water first, add spices, then tea, then milk. Simmer 5 minutes. Strain and serve.",
    type: "text",
    tags: ["recipe", "personal"],
    color: "#FFA23920",
    isPinned: false,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
    aiSummary: "Masala Chai recipe with cardamom, ginger. 10-minute preparation.",
    extractedKeywords: ["recipe", "chai", "spices", "milk", "boil"],
  },
  {
    id: "note-4",
    userId: "demo-user-1",
    title: "Scanned Business Card",
    content: "Rajesh Kumar\nCTO - TechVentures India\nrajesh@techventures.in\n+91 98765 43210\nwww.techventures.in",
    type: "image",
    tags: ["contact", "networking"],
    color: "#FF565620",
    isPinned: false,
    imageUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
    aiSummary: "Contact: Rajesh Kumar, CTO at TechVentures India.",
    extractedKeywords: ["contact", "CTO", "TechVentures"],
  },
  {
    id: "note-5",
    userId: "demo-user-1",
    title: "Book Notes - Atomic Habits",
    content: "Key insight: 1% improvement daily = 37x better in a year. Identity-based habits beat outcome-based. The 4 laws: Make it obvious, attractive, easy, satisfying. Habit stacking is powerful for building new routines.",
    type: "text",
    tags: ["books", "learning", "habits"],
    color: "#A78BFA20",
    isPinned: true,
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    updatedAt: new Date(Date.now() - 432000000).toISOString(),
    aiSummary: "Atomic Habits: 1% daily growth, identity-based habits, 4 laws framework, habit stacking.",
    extractedKeywords: ["habits", "improvement", "identity", "routine", "atomic"],
  },
  {
    id: "note-6",
    userId: "demo-user-1",
    title: "Travel Checklist - Goa Trip",
    content: "Documents: Aadhar, tickets. Clothes: 5 sets, swimwear. Electronics: charger, camera. Medicines: sunscreen, ORS. Hotels: check-in March 22. Budget: ₹15,000 per person.",
    type: "text",
    tags: ["travel", "personal", "checklist"],
    color: "#34D39920",
    isPinned: false,
    reminder: new Date(Date.now() + 604800000).toISOString(),
    createdAt: new Date(Date.now() - 518400000).toISOString(),
    updatedAt: new Date(Date.now() - 518400000).toISOString(),
    aiSummary: "Goa trip checklist: documents, clothes, electronics, medicines. Budget ₹15K/person.",
    extractedKeywords: ["travel", "checklist", "budget", "documents", "swimwear"],
  },
];

export function getNotes(userId: string): Note[] {
  try {
    const data = localStorage.getItem(NOTES_KEY);
    const allNotes: Note[] = data ? JSON.parse(data) : [];
    const userNotes = allNotes.filter((n) => n.userId === userId);

    // Seed demo notes if user has no notes
    if (userNotes.length === 0 && userId === "demo-user-1") {
      const stored = [...allNotes, ...DEMO_NOTES];
      localStorage.setItem(NOTES_KEY, JSON.stringify(stored));
      return DEMO_NOTES;
    }

    return userNotes;
  } catch {
    return [];
  }
}

export function createNote(note: Omit<Note, "id" | "createdAt" | "updatedAt">): Note {
  const newNote: Note = {
    ...note,
    id: `note-${generateId()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const data = localStorage.getItem(NOTES_KEY);
  const allNotes: Note[] = data ? JSON.parse(data) : [];
  allNotes.unshift(newNote);
  localStorage.setItem(NOTES_KEY, JSON.stringify(allNotes));

  return newNote;
}

export function updateNote(id: string, updates: Partial<Note>): Note | null {
  const data = localStorage.getItem(NOTES_KEY);
  const allNotes: Note[] = data ? JSON.parse(data) : [];
  const index = allNotes.findIndex((n) => n.id === id);
  if (index === -1) return null;

  allNotes[index] = { ...allNotes[index], ...updates, updatedAt: new Date().toISOString() };
  localStorage.setItem(NOTES_KEY, JSON.stringify(allNotes));
  return allNotes[index];
}

export function deleteNote(id: string): boolean {
  const data = localStorage.getItem(NOTES_KEY);
  const allNotes: Note[] = data ? JSON.parse(data) : [];
  const filtered = allNotes.filter((n) => n.id !== id);
  localStorage.setItem(NOTES_KEY, JSON.stringify(filtered));
  return true;
}

export function getAllNotes(): Note[] {
  try {
    const data = localStorage.getItem(NOTES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}
