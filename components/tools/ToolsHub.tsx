"use client";

import { ImageIcon, Stamp, Wand2, Zap } from "lucide-react";
import { HubSeoBlock, ToolHubCard, ToolHubHeader, ToolShell } from "@/components/tools/watermark-ui";
import { WatermarkLoginGate, useWatermarkSession } from "@/components/tools/WatermarkLoginGate";

function ToolsHubContent() {
  const session = useWatermarkSession();
  if (!session) return null;

  return (
    <ToolShell userName={session.fullName}>
      <div className="space-y-6">
        <ToolHubHeader
          userName={session.fullName}
          title="Bộ công cụ xử lý ảnh"
          subtitle="Tất cả công cụ chạy 100% trên trình duyệt — ảnh của bạn không được upload lên server."
        />

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
          <ToolHubCard
            href="/cong-cu/nen-anh"
            title="Nén ảnh WebP"
            description="Giảm dung lượng ảnh sản phẩm, so sánh trước/sau, xuất ZIP WebP hoặc JPG."
            icon={<Zap size={22} />}
            badge="Mới"
          />
          <ToolHubCard
            href="/cong-cu/resize-anh"
            title="Resize hàng loạt"
            description="Đổi kích thước theo chuẩn Shopee 1:1, Facebook 4:5, Story 9:16, banner web."
            icon={<ImageIcon size={22} />}
            badge="Mới"
          />
        </div>

        <HubSeoBlock />
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
