"use client";

import { Stamp, Wand2 } from "lucide-react";
import { ToolHubCard, ToolShell } from "@/components/tools/watermark-ui";
import { WatermarkLoginGate, useWatermarkSession } from "@/components/tools/WatermarkLoginGate";

function ToolsHubContent() {
  const session = useWatermarkSession();
  if (!session) return null;

  return (
    <ToolShell>
      <div className="space-y-6">
        <header className="rounded-[1.75rem] border border-white/60 bg-white/80 p-6 shadow-brand backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">Bứt Phá Marketing</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-indigo-950">Bộ công cụ xử lý ảnh</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Xin chào <span className="font-semibold text-indigo-900">{session.fullName}</span>. Tất cả công cụ chạy 100% trên
            trình duyệt — ảnh của bạn không được upload lên server.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          <ToolHubCard
            href="/cong-cu/dong-dau-logo"
            title="Đóng dấu logo"
            description="Đóng dấu logo hàng loạt, preset theo %, watermark chữ, xuất ZIP. Kéo thả vị trí trực tiếp trên ảnh."
            icon={<Stamp size={22} />}
            badge="Phổ biến"
          />
          <ToolHubCard
            href="/cong-cu/xoa-nen"
            title="Xóa nền AI"
            description="Xóa nền logo hoặc ảnh sản phẩm bằng AI chạy trên trình duyệt. Offline sau lần tải model đầu."
            icon={<Wand2 size={22} />}
          />
        </div>
      </div>
    </ToolShell>
  );
}

export function ToolsHub() {
  return (
    <WatermarkLoginGate>
      <ToolsHubContent />
    </WatermarkLoginGate>
  );
}
