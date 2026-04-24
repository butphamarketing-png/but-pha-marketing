"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bot,
  CheckCircle2,
  Clock3,
  Image as ImageIcon,
  Link2,
  Play,
  RefreshCw,
  Save,
  Settings2,
  Sparkles,
  Target,
} from "lucide-react";
import type { SeoAutomationRunLog, SeoAutomationSettings } from "@/lib/seo-automation";

type SeoAutomationPayload = {
  ok: boolean;
  settings: SeoAutomationSettings;
  runs: SeoAutomationRunLog[];
  error?: string;
};

const DEFAULT_SETTINGS: SeoAutomationSettings = {
  enabled: false,
  dailyPostCount: 5,
  autoPublish: true,
  publishTimeLabel: "08:00",
  topicSeeds: [
    "thiết kế website",
    "dịch vụ SEO tổng thể",
    "quảng cáo Google Ads",
    "chăm sóc fanpage Facebook",
  ],
  defaultCategory: "blog",
  targetWordCount: 1500,
  generateImages: true,
  imagesPerArticle: 2,
  autoInsertInternalLinks: true,
  autoOptimizeSeo: true,
  autoRefreshOldPosts: false,
  autoBackfillMissingSeo: true,
  gscSiteUrl: "",
  ga4MeasurementId: "",
  ga4PropertyId: "",
  notes: "",
  timezone: "Asia/Bangkok",
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) return error.message;
  return "Không thể thao tác với SEO Autopilot lúc này.";
}

function RunBadge({ status }: { status: SeoAutomationRunLog["status"] }) {
  const className =
    status === "success"
      ? "bg-emerald-50 text-emerald-700"
      : status === "partial"
        ? "bg-amber-50 text-amber-700"
        : status === "failed"
          ? "bg-rose-50 text-rose-700"
          : "bg-slate-100 text-slate-600";
  const label =
    status === "success" ? "Thành công" : status === "partial" ? "Một phần" : status === "failed" ? "Lỗi" : "Đang chạy";
  return <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] ${className}`}>{label}</span>;
}

export function SeoAutomationPanel() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [settings, setSettings] = useState<SeoAutomationSettings>(DEFAULT_SETTINGS);
  const [runs, setRuns] = useState<SeoAutomationRunLog[]>([]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch("/api/admin/seo-automation", { cache: "no-store" });
        const payload = (await response.json().catch(() => null)) as SeoAutomationPayload | null;
        if (!response.ok || !payload?.ok) {
          throw new Error(payload?.error || "Không thể tải cấu hình SEO Autopilot.");
        }
        if (!cancelled) {
          setSettings(payload.settings);
          setRuns(payload.runs || []);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(getErrorMessage(loadError));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const todayRun = useMemo(() => runs[0] || null, [runs]);

  const updateSettings = (patch: Partial<SeoAutomationSettings>) => {
    setMessage("");
    setError("");
    setSettings((prev) => ({ ...prev, ...patch }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setMessage("");
      const payload = {
        ...settings,
        topicSeeds: settings.topicSeeds,
      };

      const response = await fetch("/api/admin/seo-automation", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => null)) as { ok?: boolean; settings?: SeoAutomationSettings; error?: string } | null;
      if (!response.ok || !data?.ok || !data.settings) {
        throw new Error(data?.error || "Không thể lưu SEO Autopilot.");
      }

      setSettings(data.settings);
      setMessage("Đã lưu cấu hình SEO Autopilot.");
    } catch (saveError) {
      setError(getErrorMessage(saveError));
    } finally {
      setSaving(false);
    }
  };

  const handleRunNow = async () => {
    try {
      setRunning(true);
      setError("");
      setMessage("");
      const response = await fetch("/api/admin/seo-automation/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ manualCount: settings.dailyPostCount, force: true }),
      });
      const data = (await response.json().catch(() => null)) as { ok?: boolean; runs?: SeoAutomationRunLog[]; run?: SeoAutomationRunLog; error?: string } | null;
      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || "Không thể chạy SEO Autopilot.");
      }

      const refresh = await fetch("/api/admin/seo-automation", { cache: "no-store" });
      const refreshed = (await refresh.json().catch(() => null)) as SeoAutomationPayload | null;
      if (refresh.ok && refreshed?.ok) {
        setSettings(refreshed.settings);
        setRuns(refreshed.runs || []);
      }

      setMessage("Đã khởi chạy SEO Autopilot. Hệ thống đang tự sinh và đăng bài.");
    } catch (runError) {
      setError(getErrorMessage(runError));
    } finally {
      setRunning(false);
    }
  };

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.28em] text-indigo-500">
            <Bot size={15} />
            SEO Autopilot
          </div>
          <h2 className="mt-3 text-2xl font-black text-slate-950">Chế độ tự chạy 5 bài/ngày cho một người vận hành</h2>
          <p className="mt-2 text-sm leading-7 text-slate-500">
            Bật là hệ thống tự chọn chủ đề, tự viết, tự tối ưu SEO, tự sinh ảnh, tự tạo slug, keyword, mô tả, chèn link nội bộ và
            tự đăng bài. Bạn vẫn có thể tắt bất cứ lúc nào hoặc bấm chạy ngay bằng tay.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[480px]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-slate-400">Trạng thái</p>
            <p className={`mt-3 text-lg font-black ${settings.enabled ? "text-emerald-600" : "text-slate-700"}`}>
              {settings.enabled ? "Đang bật" : "Đang tắt"}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-slate-400">Mục tiêu/ngày</p>
            <p className="mt-3 text-lg font-black text-slate-900">{settings.dailyPostCount} bài</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-slate-400">Lượt gần nhất</p>
            <p className="mt-3 text-sm font-black text-slate-900">{todayRun ? new Date(todayRun.startedAt).toLocaleString("vi-VN") : "Chưa chạy"}</p>
          </div>
        </div>
      </div>

      {(error || message) && (
        <div className={`mt-5 rounded-2xl px-4 py-3 text-sm font-semibold ${error ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"}`}>
          {error || message}
        </div>
      )}

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-slate-900">Bật tự động hoàn toàn</p>
                  <p className="mt-1 text-xs text-slate-500">Cron mỗi ngày sẽ tự chạy nếu mục này đang bật.</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.enabled}
                  onChange={(event) => updateSettings({ enabled: event.target.checked })}
                  className="h-5 w-5 rounded border-slate-300 text-indigo-600"
                />
              </div>
            </label>

            <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-slate-900">Tự đăng bài sau khi sinh xong</p>
                  <p className="mt-1 text-xs text-slate-500">Tắt nếu muốn hệ thống chỉ lưu nháp để bạn xem lại.</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoPublish}
                  onChange={(event) => updateSettings({ autoPublish: event.target.checked })}
                  className="h-5 w-5 rounded border-slate-300 text-indigo-600"
                />
              </div>
            </label>

            <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-slate-900">Tự tạo ảnh AI</p>
                  <p className="mt-1 text-xs text-slate-500">Ảnh đầu tiên làm thumbnail, ảnh sau sẽ chèn vào section.</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.generateImages}
                  onChange={(event) => updateSettings({ generateImages: event.target.checked })}
                  className="h-5 w-5 rounded border-slate-300 text-indigo-600"
                />
              </div>
            </label>

            <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-slate-900">Tự chèn internal links</p>
                  <p className="mt-1 text-xs text-slate-500">Sinh block bài viết liên quan và chèn vào nội dung.</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoInsertInternalLinks}
                  onChange={(event) => updateSettings({ autoInsertInternalLinks: event.target.checked })}
                  className="h-5 w-5 rounded border-slate-300 text-indigo-600"
                />
              </div>
            </label>

            <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-slate-900">Tự vá bài cũ thiếu SEO</p>
                  <p className="mt-1 text-xs text-slate-500">Điền slug, SEO title, keyword, mô tả còn thiếu cho bài đã có.</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoBackfillMissingSeo}
                  onChange={(event) => updateSettings({ autoBackfillMissingSeo: event.target.checked })}
                  className="h-5 w-5 rounded border-slate-300 text-indigo-600"
                />
              </div>
            </label>

            <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-slate-900">Chuẩn bị refresh bài cũ</p>
                  <p className="mt-1 text-xs text-slate-500">Giữ sẵn cờ này cho vòng nâng cấp tiếp theo về auto cập nhật nội dung.</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoRefreshOldPosts}
                  onChange={(event) => updateSettings({ autoRefreshOldPosts: event.target.checked })}
                  className="h-5 w-5 rounded border-slate-300 text-indigo-600"
                />
              </div>
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <label className="space-y-2 rounded-2xl border border-slate-200 p-4">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Số bài/ngày</span>
              <input
                type="number"
                min={1}
                max={10}
                value={settings.dailyPostCount}
                onChange={(event) => updateSettings({ dailyPostCount: Number(event.target.value || 5) })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-bold text-slate-900 outline-none"
              />
            </label>
            <label className="space-y-2 rounded-2xl border border-slate-200 p-4">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Khung giờ chạy</span>
              <input
                value={settings.publishTimeLabel}
                onChange={(event) => updateSettings({ publishTimeLabel: event.target.value })}
                placeholder="08:00"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-bold text-slate-900 outline-none"
              />
            </label>
            <label className="space-y-2 rounded-2xl border border-slate-200 p-4">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Độ dài mục tiêu</span>
              <input
                type="number"
                min={900}
                max={3200}
                value={settings.targetWordCount}
                onChange={(event) => updateSettings({ targetWordCount: Number(event.target.value || 1500) })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-bold text-slate-900 outline-none"
              />
            </label>
            <label className="space-y-2 rounded-2xl border border-slate-200 p-4">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Ảnh / bài</span>
              <input
                type="number"
                min={1}
                max={4}
                value={settings.imagesPerArticle}
                onChange={(event) => updateSettings({ imagesPerArticle: Number(event.target.value || 2) })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-bold text-slate-900 outline-none"
              />
            </label>
          </div>

          <label className="block rounded-2xl border border-slate-200 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-black text-slate-900">
              <Sparkles size={16} />
              Chủ đề hạt giống để hệ thống xoay bài
            </div>
            <textarea
              rows={5}
              value={settings.topicSeeds.join("\n")}
              onChange={(event) => updateSettings({ topicSeeds: event.target.value.split("\n").map((item) => item.trim()).filter(Boolean) })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700 outline-none"
              placeholder="Mỗi dòng một chủ đề..."
            />
            <p className="mt-2 text-xs text-slate-500">
              Ví dụ: thiết kế website, dịch vụ SEO tổng thể, quảng cáo Google Ads, local SEO, content marketing...
            </p>
          </label>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <label className="space-y-2 rounded-2xl border border-slate-200 p-4">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">GSC site URL</span>
              <input
                value={settings.gscSiteUrl}
                onChange={(event) => updateSettings({ gscSiteUrl: event.target.value })}
                placeholder="https://www.butphamarketing.com/"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none"
              />
            </label>
            <label className="space-y-2 rounded-2xl border border-slate-200 p-4">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">GA4 Measurement ID</span>
              <input
                value={settings.ga4MeasurementId}
                onChange={(event) => updateSettings({ ga4MeasurementId: event.target.value })}
                placeholder="G-XXXXXXX"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none"
              />
            </label>
            <label className="space-y-2 rounded-2xl border border-slate-200 p-4">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">GA4 Property ID</span>
              <input
                value={settings.ga4PropertyId}
                onChange={(event) => updateSettings({ ga4PropertyId: event.target.value })}
                placeholder="123456789"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none"
              />
            </label>
          </div>

          <label className="block rounded-2xl border border-slate-200 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-black text-slate-900">
              <Settings2 size={16} />
              Ghi chú vận hành
            </div>
            <textarea
              rows={3}
              value={settings.notes}
              onChange={(event) => updateSettings({ notes: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700 outline-none"
              placeholder="Nhắc hệ thống ưu tiên ngành, tone giọng, khu vực, dịch vụ chủ lực..."
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || loading}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
              {saving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
              Lưu cấu hình
            </button>
            <button
              type="button"
              onClick={handleRunNow}
              disabled={running || loading}
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-black text-white transition hover:bg-indigo-500 disabled:opacity-60"
            >
              {running ? <RefreshCw size={16} className="animate-spin" /> : <Play size={16} />}
              Chạy ngay 1 lượt
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              <Clock3 size={14} />
              Tự động hóa thật
            </div>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="mt-0.5 text-emerald-500" />
                Tạo tối đa {settings.dailyPostCount} bài/ngày theo chủ đề hạt giống.
              </li>
              <li className="flex items-start gap-2">
                <Target size={16} className="mt-0.5 text-indigo-500" />
                Tự điền title, SEO title, slug, keyword, meta description, mô tả ngắn.
              </li>
              <li className="flex items-start gap-2">
                <ImageIcon size={16} className="mt-0.5 text-fuchsia-500" />
                {settings.generateImages ? `Sinh ${settings.imagesPerArticle} ảnh/bài và tự gắn vào bài.` : "Đang tắt tự tạo ảnh."}
              </li>
              <li className="flex items-start gap-2">
                <Link2 size={16} className="mt-0.5 text-cyan-500" />
                {settings.autoInsertInternalLinks ? "Có tự chèn internal links." : "Đang tắt tự chèn internal links."}
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="mt-0.5 text-emerald-500" />
                Chỉ tự publish khi điểm SEO nội bộ đạt từ 80/100, thấp hơn sẽ giữ ở nháp để tránh đăng bài yếu.
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Lịch sử Autopilot</p>
                <h3 className="mt-2 text-lg font-black text-slate-900">Các lượt chạy gần đây</h3>
              </div>
              {loading ? <RefreshCw size={16} className="animate-spin text-slate-400" /> : null}
            </div>

            <div className="mt-4 space-y-3">
              {runs.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm font-medium text-slate-500">
                  Chưa có lượt chạy nào.
                </div>
              ) : (
                runs.slice(0, 6).map((run) => (
                  <div key={run.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-black text-slate-900">{run.reason === "cron" ? "Tự động hằng ngày" : "Chạy tay"}</p>
                        <p className="mt-1 text-xs text-slate-500">{new Date(run.startedAt).toLocaleString("vi-VN")}</p>
                      </div>
                      <RunBadge status={run.status} />
                    </div>
                    <div className="mt-3 grid grid-cols-4 gap-2 text-center text-[11px] font-bold">
                      <div className="rounded-xl bg-white px-2 py-2 text-emerald-700">{run.createdCount} mới</div>
                      <div className="rounded-xl bg-white px-2 py-2 text-indigo-700">{run.updatedCount} sửa</div>
                      <div className="rounded-xl bg-white px-2 py-2 text-slate-600">{run.skippedCount} bỏ qua</div>
                      <div className="rounded-xl bg-white px-2 py-2 text-rose-700">{run.failedCount} lỗi</div>
                    </div>
                    {run.items.length > 0 ? (
                      <div className="mt-3 space-y-2">
                        {run.items.slice(0, 3).map((item, index) => (
                          <div key={`${run.id}-${item.slug}-${index}`} className="rounded-xl bg-white px-3 py-2">
                            <p className="text-xs font-black text-slate-900">{item.title}</p>
                            <p className="mt-1 text-[11px] text-slate-500">{item.detail}</p>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
            <p className="font-black">Lưu ý số liệu SEO thật</p>
            <p className="mt-2 leading-7">
              Phần GSC/GA4 đã có ô cấu hình để chuẩn bị nối dữ liệu thật. Những nơi chưa nối được sẽ cần ghi nhãn “ước tính”, không nên xem là số
              liệu Google thật.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
