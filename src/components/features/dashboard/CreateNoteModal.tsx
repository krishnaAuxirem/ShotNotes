import { useState } from "react";
import { mockAiSummary } from "@/lib/utils";
import { FileText, Mic, Image, X, Bot, Pin, Clock, Plus, Square, Circle } from "lucide-react";

interface CreateNoteModalProps {
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    content: string;
    type: "text" | "voice" | "image";
    tags: string[];
    isPinned: boolean;
    reminder?: string;
    imageUrl?: string;
  }) => void;
}

export default function CreateNoteModal({ onClose, onSubmit }: CreateNoteModalProps) {
  const [type, setType] = useState<"text" | "voice" | "image">("text");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isPinned, setIsPinned] = useState(false);
  const [reminder, setReminder] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [aiSummary, setAiSummary] = useState("");

  const TYPE_OPTIONS: { key: "text" | "voice" | "image"; label: string; Icon: typeof FileText }[] = [
    { key: "text", label: "Text", Icon: FileText },
    { key: "voice", label: "Voice", Icon: Mic },
    { key: "image", label: "Image", Icon: Image },
  ];

  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase().replace(/\s+/g, "-");
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setTagInput("");
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      setContent("This is a simulated voice transcription. In the real app, your speech would be converted to text in real-time with 97% accuracy across 12+ languages.");
    } else {
      setIsRecording(true);
    }
  };

  const handleGenerateAI = () => {
    if (content) setAiSummary(mockAiSummary(content));
  };

  const handleSubmit = () => {
    if (!title || !content) return;
    onSubmit({ title, content, type, tags, isPinned, reminder: reminder || undefined, imageUrl: imageUrl || undefined });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl glass-card shadow-2xl max-h-[90vh] overflow-y-auto" style={{ border: "1px solid rgba(140,228,255,0.2)" }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-lg font-semibold text-white">Create New Note</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg glass-card flex items-center justify-center text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Type Selector */}
          <div className="flex gap-2">
            {TYPE_OPTIONS.map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setType(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  type === key ? "text-dark-navy" : "glass-card text-slate-400 hover:text-white"
                }`}
                style={type === key ? { background: "linear-gradient(135deg, #8CE4FF, #FEEE91)" } : {}}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Note Title *</label>
            <input
              className="input-field"
              placeholder="Give your note a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-slate-400">Content *</label>
              {type === "voice" && (
                <button
                  onClick={handleVoiceToggle}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isRecording
                      ? "bg-coral-red text-white animate-pulse"
                      : "bg-sky-blue/20 text-sky-blue"
                  }`}
                >
                  {isRecording ? (
                    <><Square className="w-3 h-3" /> Stop</>
                  ) : (
                    <><Mic className="w-3 h-3" /> Record</>
                  )}
                </button>
              )}
            </div>
            <textarea
              className="input-field min-h-28 resize-none"
              placeholder={
                type === "voice"
                  ? "Press Record to capture voice, or type manually..."
                  : type === "image"
                  ? "Add caption or paste extracted text..."
                  : "Start writing your note..."
              }
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* Image URL (for image type) */}
          {type === "image" && (
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Image URL (optional)</label>
              <input
                className="input-field text-sm"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
          )}

          {/* Tags */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Tags</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="tag-chip bg-sky-blue/10 text-sky-blue border border-sky-blue/20 text-xs"
                >
                  #{tag}
                  <button onClick={() => setTags(tags.filter((t) => t !== tag))} className="ml-1 hover:text-coral-red">
                    <X className="w-3 h-3 inline" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                className="input-field flex-1 text-sm"
                placeholder="Add tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              />
              <button onClick={handleAddTag} className="btn-secondary text-sm py-2 px-4 flex items-center gap-1">
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>
          </div>

          {/* Options Row */}
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <Pin className="w-4 h-4 text-slate-300" />
              <span className="text-sm text-slate-300">Pin this note</span>
            </label>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-300" />
              <span className="text-sm text-slate-300">Reminder:</span>
              <input
                type="datetime-local"
                className="input-field text-xs py-1.5 px-2"
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
              />
            </div>
          </div>

          {/* AI Summary */}
          {content && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-400 flex items-center gap-1"><Bot className="w-3 h-3" /> AI Summary</span>
                <button onClick={handleGenerateAI} className="text-xs text-sky-blue hover:underline">
                  Generate
                </button>
              </div>
              {aiSummary && (
                <div className="p-3 rounded-xl text-xs text-slate-300 leading-relaxed" style={{ background: "rgba(140,228,255,0.05)", border: "1px solid rgba(140,228,255,0.15)" }}>
                  {aiSummary}
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="btn-secondary flex-1 py-3">Cancel</button>
            <button
              onClick={handleSubmit}
              disabled={!title || !content}
              className="btn-primary flex-1 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
