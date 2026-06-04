"use client";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  minHeight?: number;
}

export function RichTextEditor({ value, onChange, minHeight = 200 }: RichTextEditorProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-white text-sm outline-none resize-none"
        style={{ minHeight: minHeight }}
        placeholder="Nội dung..."
      />
    </div>
  );
}
