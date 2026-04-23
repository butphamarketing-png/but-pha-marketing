"use client";

import { useEffect, useRef, useState } from "react";
import { uploadMediaFile } from "@/lib/client-media-upload";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
  uploadTitle?: string;
}

const FONT_SIZES = [
  { label: "Nho", value: "2" },
  { label: "Vua", value: "3" },
  { label: "Lon", value: "4" },
  { label: "Rat lon", value: "5" },
];

const FONT_FAMILIES = [
  { label: "Mac dinh", value: "inherit" },
  { label: "Arial", value: "Arial" },
  { label: "Verdana", value: "Verdana" },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "Georgia", value: "Georgia" },
  { label: "Courier New", value: "Courier New" },
];

function EditorButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="rounded border border-white/20 px-2 py-1 text-xs font-semibold text-white hover:bg-white/10">
      {label}
    </button>
  );
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Nhap noi dung...",
  minHeight = 170,
  uploadTitle,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [fontSize, setFontSize] = useState("3");
  const [fontFamily, setFontFamily] = useState("inherit");
  const [color, setColor] = useState("#ffffff");
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (!editorRef.current) return;
    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const exec = (command: string, arg?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, arg);
    onChange(editorRef.current?.innerHTML || "");
  };

  const applyLink = () => {
    const url = window.prompt("Nhap link:");
    if (!url) return;
    exec("createLink", url);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const result = await uploadMediaFile(file, {
        title: uploadTitle,
        sectionLabel: "editor",
        suggestedName: file.name,
      });
      const figure = `<figure><img src="${result.url}" alt="${uploadTitle || file.name}" /><figcaption>${uploadTitle || file.name}</figcaption></figure>`;
      exec("insertHTML", figure);
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Khong the tai anh len luc nay.");
    } finally {
      setUploadingImage(false);
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 rounded-xl border border-white/10 bg-black/20 p-2">
        <EditorButton label="B" onClick={() => exec("bold")} />
        <EditorButton label="I" onClick={() => exec("italic")} />
        <EditorButton label="U" onClick={() => exec("underline")} />
        <EditorButton label="H1" onClick={() => exec("formatBlock", "H1")} />
        <EditorButton label="H2" onClick={() => exec("formatBlock", "H2")} />
        <EditorButton label="• List" onClick={() => exec("insertUnorderedList")} />
        <EditorButton label="1. List" onClick={() => exec("insertOrderedList")} />
        <EditorButton label="Trai" onClick={() => exec("justifyLeft")} />
        <EditorButton label="Giua" onClick={() => exec("justifyCenter")} />
        <EditorButton label="Phai" onClick={() => exec("justifyRight")} />
        <EditorButton label="Link" onClick={applyLink} />
        <EditorButton label={uploadingImage ? "Dang tai..." : "Anh"} onClick={() => imageInputRef.current?.click()} />
        <EditorButton label="↺" onClick={() => exec("undo")} />
        <EditorButton label="↻" onClick={() => exec("redo")} />

        <select
          value={fontFamily}
          onChange={(e) => {
            setFontFamily(e.target.value);
            exec("fontName", e.target.value);
          }}
          className="rounded border border-white/20 bg-transparent px-2 py-1 text-xs text-white"
        >
          {FONT_FAMILIES.map((item) => (
            <option key={item.value} value={item.value} className="bg-card">
              {item.label}
            </option>
          ))}
        </select>

        <select
          value={fontSize}
          onChange={(e) => {
            setFontSize(e.target.value);
            exec("fontSize", e.target.value);
          }}
          className="rounded border border-white/20 bg-transparent px-2 py-1 text-xs text-white"
        >
          {FONT_SIZES.map((item) => (
            <option key={item.value} value={item.value} className="bg-card">
              {item.label}
            </option>
          ))}
        </select>

        <input
          type="color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
            exec("foreColor", e.target.value);
          }}
          className="h-7 w-9 cursor-pointer rounded border border-white/20 bg-transparent p-0.5"
        />
      </div>

      <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange((e.currentTarget as HTMLDivElement).innerHTML)}
        data-placeholder={placeholder}
        className="rich-editor min-h-[170px] rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none"
        style={{ minHeight }}
      />
    </div>
  );
}
