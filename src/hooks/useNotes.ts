import { useState, useEffect, useCallback } from "react";
import type { Note } from "@/types";
import { getNotes, createNote, updateNote, deleteNote } from "@/lib/notes";
import { mockAiSummary, extractKeywords } from "@/lib/utils";
import { NOTE_COLORS } from "@/constants";

export function useNotes(userId: string | undefined) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setNotes([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const data = getNotes(userId);
      setNotes(data);
      setIsLoading(false);
    }, 500);
  }, [userId]);

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      !searchQuery ||
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = !selectedTag || note.tags.includes(selectedTag);
    const matchesType = !selectedType || note.type === selectedType;
    return matchesSearch && matchesTag && matchesType;
  });

  const pinnedNotes = filteredNotes.filter((n) => n.isPinned);
  const unpinnedNotes = filteredNotes.filter((n) => !n.isPinned);

  const allTags = Array.from(new Set(notes.flatMap((n) => n.tags)));

  const addNote = useCallback(
    (data: {
      title: string;
      content: string;
      type: "text" | "voice" | "image";
      tags: string[];
      isPinned?: boolean;
      reminder?: string;
      imageUrl?: string;
    }) => {
      if (!userId) return;
      const colorIndex = notes.length % NOTE_COLORS.length;
      const newNote = createNote({
        userId,
        title: data.title,
        content: data.content,
        type: data.type,
        tags: data.tags,
        color: NOTE_COLORS[colorIndex],
        isPinned: data.isPinned || false,
        reminder: data.reminder,
        imageUrl: data.imageUrl,
        aiSummary: mockAiSummary(data.content),
        extractedKeywords: extractKeywords(data.content),
      });
      setNotes((prev) => [newNote, ...prev]);
    },
    [userId, notes.length]
  );

  const editNote = useCallback((id: string, updates: Partial<Note>) => {
    const updated = updateNote(id, updates);
    if (updated) {
      setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)));
    }
  }, []);

  const removeNote = useCallback((id: string) => {
    deleteNote(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const togglePin = useCallback(
    (id: string) => {
      const note = notes.find((n) => n.id === id);
      if (!note) return;
      editNote(id, { isPinned: !note.isPinned });
    },
    [notes, editNote]
  );

  return {
    notes,
    filteredNotes,
    pinnedNotes,
    unpinnedNotes,
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    selectedType,
    setSelectedType,
    allTags,
    addNote,
    editNote,
    removeNote,
    togglePin,
  };
}
