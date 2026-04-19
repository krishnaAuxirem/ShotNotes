import { useState } from "react";
import type { Note } from "@/types";
import { formatRelativeTime, truncate } from "@/lib/utils";
import { NOTE_COLOR_BORDERS } from "@/constants";
import { FileText, Mic, Image, Pin, Clock, Pencil, Trash2, Bot, MoreHorizontal } from "lucide-react";

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
  onEdit: (note: Note) => void;
}

export default function NoteCard({ note, onDelete, onTogglePin, onEdit }: NoteCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showAi, setShowAi] = useState(false);

  const colorIndex = ["#8CE4FF20", "#FEEE9120", "#FFA23920", "#FF565620", "#A78BFA20", "#34D39920"].indexOf(note.color);
  const borderColor = NOTE_COLOR_BORDERS[colorIndex >= 0 ? colorIndex : 0];

  const TypeIcon = note.type === "text" ? FileText : note.type === "voice" ? Mic : Image;
  const typeLabel = note.type === "text" ? "Text" : note.type === "voice" ? "Voice" : "Image";

  return (
    <div
      className="note-card relative group"
      style={{ background: note.color, border: `1px solid ${borderColor}` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <TypeIcon className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400 font-medium">{typeLabel}</span>
          {note.isPinned && <Pin className="w-3 h-3 text-light-yellow fill-current" />}
          {note.reminder && <Clock className="w-3 h-3 text-sky-blue" />}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-white/10 transition-all text-slate-400 hover:text-white"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {showMenu && (
            <div
              className="absolute right-0 top-full mt-1 w-36 rounded-xl shadow-xl z-10 py-1"
              style={{ background: "#1A2235", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <button
                onClick={() => { onEdit(note); setShowMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Pencil className="w-3 h-3" /> Edit
              </button>
              <button
                onClick={() => { onTogglePin(note.id); setShowMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Pin className="w-3 h-3" /> {note.isPinned ? "Unpin" : "Pin"}
              </button>
              <button
                onClick={() => setShowAi(!showAi)}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-sky-blue hover:bg-sky-blue/10 transition-colors"
              >
                <Bot className="w-3 h-3" /> AI Summary
              </button>
              <button
                onClick={() => { onDelete(note.id); setShowMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-coral-red hover:bg-coral-red/10 transition-colors"
              >
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Image */}
      {note.imageUrl && (
        <img
          src={note.imageUrl}
          alt={note.title}
          className="w-full h-32 object-cover rounded-lg mb-3"
          loading="lazy"
        />
      )}

      {/* Title */}
      <h3 className="font-semibold text-white text-sm mb-2 pr-6">{note.title}</h3>

      {/* Content */}
      <p className="text-slate-400 text-xs leading-relaxed mb-3">
        {truncate(note.content, 100)}
      </p>

      {/* AI Summary */}
      {showAi && note.aiSummary && (
        <div
          className="p-3 rounded-lg mb-3 text-xs text-slate-300 leading-relaxed"
          style={{ background: "rgba(140,228,255,0.05)", border: "1px solid rgba(140,228,255,0.15)" }}
        >
          <div className="text-sky-blue font-medium mb-1 text-[10px] flex items-center gap-1">
            <Bot className="w-3 h-3" /> AI Summary
          </div>
          {note.aiSummary}
        </div>
      )}

      {/* Tags */}
      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {note.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/8 text-slate-400">
              #{tag}
            </span>
          ))}
          {note.tags.length > 3 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/8 text-slate-500">
              +{note.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Keywords */}
      {note.extractedKeywords && note.extractedKeywords.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {note.extractedKeywords.slice(0, 3).map((kw) => (
            <span key={kw} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(167,139,250,0.15)", color: "#A78BFA" }}>
              {kw}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
        <span className="text-[10px] text-slate-500">{formatRelativeTime(note.updatedAt)}</span>
        <button
          onClick={() => setShowAi(!showAi)}
          className="text-[10px] text-slate-500 hover:text-sky-blue transition-colors flex items-center gap-1"
        >
          <Bot className="w-3 h-3" /> AI
        </button>
      </div>

      {/* Click outside handler */}
      {showMenu && (
        <div className="fixed inset-0 z-0" onClick={() => setShowMenu(false)} />
      )}
    </div>
  );
}
