import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, ChevronDown, Save, RotateCcw } from "lucide-react";
import { getContent, saveContent, buildDefaultProcessTabs, ContentOverride } from "@/lib/pageContent";
import type { PlatformConfig } from "@/components/shared/PlatformPage";

const PLATFORMS: { key: string; label: string; color: string }[] = [
  { key: "facebook", label: "Facebook", color: "#1877F2" },
  { key: "tiktok", label: "TikTok", color: "#FF0050" },
  { key: "instagram", label: "Instagram", color: "#E1306C" },
  { key: "zalo", label: "Zalo", color: "#0068FF" },
  { key: "googlemaps", label: "Google Maps", color: "#EA4335" },
  { key: "website", label: "Website", color: "#34A853" },
];

const DEFAULT_CONFIGS: Record<string, Partial<PlatformConfig>> = {
  facebook: {
    vision: "Chúng tôi hướng đến trở thành đối tác chiến lược số 1 về Marketing Facebook tại Việt Nam.",
    mission: "Mang lại giải pháp Facebook Marketing toàn diện từ xây dựng Fanpage đến triển khai quảng cáo.",
    responsibility: "Cam kết minh bạch trong từng đồng ngân sách và báo cáo kết quả thực tế hàng tuần.",
    stats: [{ label: "Khách hàng", value: "500+" }, { label: "Dự án", value: "1.200+" }, { label: "Hài lòng", value: "98%" }, { label: "Năm KN", value: "5+" }],
    faqs: [
      { q: "Bao lâu thì thấy kết quả?", a: "Sau 7-14 ngày chạy Ads, bạn sẽ thấy kết quả ban đầu." },
      { q: "Chi phí có được hoàn lại không?", a: "Nếu không đạt KPI cam kết sẽ làm thêm 1 tháng miễn phí." },
    ],
  },
};

function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-white/10">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-white hover:bg-white/5">
        {title}
        <ChevronDown size={15} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="border-t border-white/10 p-4 space-y-3">{children}</div>}
    </div>
  );
}

function TA({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-primary resize-none" />;
}
function INP({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-primary" />;
}

export function PageContentEditor({ defaultConfigs }: { defaultConfigs: Record<string, Partial<PlatformConfig>> }) {
  const [activePlatform, setActivePlatform] = useState("facebook");
  const [saved, setSaved] = useState(false);

  const platform = PLATFORMS.find(p => p.key === activePlatform)!;
  const stored = getContent(activePlatform);
  const defaults = { ...DEFAULT_CONFIGS[activePlatform], ...defaultConfigs[activePlatform] };

  const [vision, setVision] = useState(stored?.vision ?? defaults?.vision ?? "");
  const [mission, setMission] = useState(stored?.mission ?? defaults?.mission ?? "");
  const [responsibility, setResponsibility] = useState(stored?.responsibility ?? defaults?.responsibility ?? "");
  const [tabs, setTabs] = useState(stored?.tabs ?? defaultConfigs[activePlatform]?.tabs ?? []);
  const [stats, setStats] = useState(stored?.stats ?? defaults?.stats ?? []);
  const [processTabs, setProcessTabs] = useState(stored?.processTabs ?? buildDefaultProcessTabs((stored?.tabs ?? defaultConfigs[activePlatform]?.tabs ?? []).map(t => t.label)));
  const [faqs, setFaqs] = useState(stored?.faqs ?? defaults?.faqs ?? []);
  const [beforeImg, setBeforeImg] = useState(stored?.beforeAfterBefore ?? "");
  const [afterImg, setAfterImg] = useState(stored?.beforeAfterAfter ?? "");

  useEffect(() => {
    const s = getContent(activePlatform);
    const d = { ...DEFAULT_CONFIGS[activePlatform], ...defaultConfigs[activePlatform] };
    setVision(s?.vision ?? d?.vision ?? "");
    setMission(s?.mission ?? d?.mission ?? "");
    setResponsibility(s?.responsibility ?? d?.responsibility ?? "");
    setTabs(s?.tabs ?? defaultConfigs[activePlatform]?.tabs ?? []);
    setStats(s?.stats ?? d?.stats ?? []);
    setFaqs(s?.faqs ?? d?.faqs ?? []);
    setBeforeImg(s?.beforeAfterBefore ?? "");
    setAfterImg(s?.beforeAfterAfter ?? "");
    const ts = s?.tabs ?? defaultConfigs[activePlatform]?.tabs ?? [];
    setProcessTabs(s?.processTabs ?? buildDefaultProcessTabs(ts.map((t: any) => t.label)));
  }, [activePlatform]);

  const handleSave = () => {
    const override: ContentOverride = {
      vision, mission, responsibility,
      tabs: tabs as any,
      stats,
      processTabs,
      faqs,
      beforeAfterBefore: beforeImg || undefined,
      beforeAfterAfter: afterImg || undefined,
    };
    saveContent(activePlatform, override);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    localStorage.removeItem(`bpm_content_${activePlatform}`);
    const d = { ...DEFAULT_CONFIGS[activePlatform], ...defaultConfigs[activePlatform] };
    setVision(d?.vision ?? "");
    setMission(d?.mission ?? "");
    setResponsibility(d?.responsibility ?? "");
    const ts = defaultConfigs[activePlatform]?.tabs ?? [];
    setTabs(ts as any);
    setStats(d?.stats ?? []);
    setFaqs(d?.faqs ?? []);
    setProcessTabs(buildDefaultProcessTabs(ts.map((t: any) => t.label)));
    setBeforeImg("");
    setAfterImg("");
  };

  return (
    <div>
      {/* Platform selector */}
      <div className="mb-5 flex flex-wrap gap-2">
        {PLATFORMS.map(p => (
          <button key={p.key} onClick={() => setActivePlatform(p.key)} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${activePlatform === p.key ? "text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"}`} style={activePlatform === p.key ? { backgroundColor: p.color } : {}}>
            <div className="h-2 w-2 rounded-full bg-current opacity-70" />{p.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {/* Vision / Mission / Responsibility */}
        <Section title="Tầm Nhìn / Sứ Mệnh / Trách Nhiệm" defaultOpen>
          <div><label className="mb-1 block text-xs text-gray-500">Tầm Nhìn</label><TA value={vision} onChange={setVision} /></div>
          <div><label className="mb-1 block text-xs text-gray-500">Sứ Mệnh</label><TA value={mission} onChange={setMission} /></div>
          <div><label className="mb-1 block text-xs text-gray-500">Trách Nhiệm</label><TA value={responsibility} onChange={setResponsibility} /></div>
        </Section>

        {/* Pricing Packages */}
        <Section title="Gói Dịch Vụ & Nội Dung AudioGuide">
          {tabs.map((tab: any, ti: number) => (
            <div key={ti} className="rounded-xl border border-white/10 p-3 space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: platform.color }} />
                <p className="text-sm font-semibold text-white">{tab.label}</p>
              </div>
              {tab.packages?.map((pkg: any, pi: number) => (
                <div key={pi} className="space-y-2 rounded-lg bg-white/5 p-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div><label className="mb-1 block text-xs text-gray-500">Tên gói</label><INP value={pkg.name} onChange={v => { const t = [...tabs]; (t[ti] as any).packages[pi].name = v; setTabs(t); }} /></div>
                    <div><label className="mb-1 block text-xs text-gray-500">Giá (đ)</label><INP value={pkg.price} onChange={v => { const t = [...tabs]; (t[ti] as any).packages[pi].price = v; setTabs(t); }} placeholder="1.500.000đ" /></div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">Nội dung AudioGuide (tiếng Việt, sẽ được đọc)</label>
                    <TA value={pkg.audioText ?? ""} onChange={v => { const t = [...tabs]; (t[ti] as any).packages[pi].audioText = v; setTabs(t); }} rows={2} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">Tính năng (mỗi dòng 1 tính năng)</label>
                    <TA value={(pkg.features ?? []).join("\n")} onChange={v => { const t = [...tabs]; (t[ti] as any).packages[pi].features = v.split("\n").filter((s: string) => s.trim()); setTabs(t); }} rows={4} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Section>

        {/* Stats */}
        <Section title="Thống Kê (Khách hàng hài lòng, Năm kinh nghiệm...)">
          <div className="space-y-2">
            {stats.map((s: any, i: number) => (
              <div key={i} className="flex gap-2">
                <INP value={s.value} onChange={v => { const arr = [...stats]; arr[i] = { ...arr[i], value: v }; setStats(arr); }} placeholder="500+" />
                <INP value={s.label} onChange={v => { const arr = [...stats]; arr[i] = { ...arr[i], label: v }; setStats(arr); }} placeholder="Khách hàng" />
                <button onClick={() => setStats(stats.filter((_: any, idx: number) => idx !== i))} className="rounded-lg bg-red-500/10 px-2 text-red-400 hover:bg-red-500/20"><Trash2 size={13} /></button>
              </div>
            ))}
            <button onClick={() => setStats([...stats, { value: "0+", label: "Nhãn mới" }])} className="flex items-center gap-2 rounded-lg border border-dashed border-white/20 px-3 py-2 text-xs text-gray-400 hover:text-white">
              <Plus size={13} />Thêm chỉ số
            </button>
          </div>
        </Section>

        {/* Process Tabs */}
        <Section title="Quy Trình Triển Khai (3 Tabs theo dịch vụ)">
          <div className="space-y-3">
            {processTabs.map((ptab: any, ti: number) => (
              <div key={ti} className="rounded-xl border border-white/10 p-3 space-y-2">
                <div><label className="mb-1 block text-xs text-gray-500">Tên tab quy trình</label><INP value={ptab.label} onChange={v => { const arr = [...processTabs]; arr[ti] = { ...arr[ti], label: v }; setProcessTabs(arr); }} /></div>
                <div className="space-y-2">
                  {ptab.steps?.map((step: any, si: number) => (
                    <div key={si} className="rounded-lg bg-white/5 p-3 space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        <div><label className="mb-1 block text-xs text-gray-500">Bước</label><INP value={String(step.step)} onChange={v => { const arr = [...processTabs]; arr[ti].steps[si].step = parseInt(v) || si + 1; setProcessTabs(arr); }} /></div>
                        <div className="col-span-2"><label className="mb-1 block text-xs text-gray-500">Tiêu đề</label><INP value={step.title} onChange={v => { const arr = [...processTabs]; arr[ti].steps[si].title = v; setProcessTabs(arr); }} /></div>
                      </div>
                      <TA value={step.desc} onChange={v => { const arr = [...processTabs]; arr[ti].steps[si].desc = v; setProcessTabs(arr); }} rows={2} />
                    </div>
                  ))}
                  <button onClick={() => { const arr = [...processTabs]; arr[ti].steps.push({ step: arr[ti].steps.length + 1, title: "Bước mới", desc: "" }); setProcessTabs(arr); }} className="flex items-center gap-1 text-xs text-gray-400 hover:text-white">
                    <Plus size={12} />Thêm bước
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* FAQ */}
        <Section title="Câu Hỏi Thường Gặp (FAQ)">
          <div className="space-y-3">
            {faqs.map((faq: any, i: number) => (
              <div key={i} className="rounded-xl border border-white/10 p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-500 flex-shrink-0">Q:</label>
                  <input value={faq.q} onChange={e => { const arr = [...faqs]; arr[i] = { ...arr[i], q: e.target.value }; setFaqs(arr); }} className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-primary" />
                  <button onClick={() => setFaqs(faqs.filter((_: any, idx: number) => idx !== i))} className="rounded-lg bg-red-500/10 p-1.5 text-red-400"><Trash2 size={12} /></button>
                </div>
                <div className="flex gap-2">
                  <label className="text-xs text-gray-500 flex-shrink-0 pt-2">A:</label>
                  <TA value={faq.a} onChange={v => { const arr = [...faqs]; arr[i] = { ...arr[i], a: v }; setFaqs(arr); }} rows={2} />
                </div>
              </div>
            ))}
            <button onClick={() => setFaqs([...faqs, { q: "Câu hỏi mới?", a: "Trả lời..." }])} className="flex items-center gap-2 rounded-lg border border-dashed border-white/20 px-3 py-2 text-xs text-gray-400 hover:text-white">
              <Plus size={13} />Thêm câu hỏi
            </button>
          </div>
        </Section>

        {/* Before After Images */}
        <Section title="Sự Thay Đổi Kỳ Diệu - Hình ảnh">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-xs text-gray-500">Ảnh TRƯỚC (URL)</label>
              <INP value={beforeImg} onChange={setBeforeImg} placeholder="https://..." />
              {beforeImg && <img src={beforeImg} alt="before" className="mt-2 h-24 w-full rounded-lg object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />}
            </div>
            <div>
              <label className="mb-2 block text-xs text-gray-500">Ảnh SAU (URL)</label>
              <INP value={afterImg} onChange={setAfterImg} placeholder="https://..." />
              {afterImg && <img src={afterImg} alt="after" className="mt-2 h-24 w-full rounded-lg object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />}
            </div>
          </div>
        </Section>
      </div>

      {/* Save + Reset */}
      <div className="mt-5 flex gap-3">
        <button onClick={handleSave} className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all ${saved ? "bg-green-500" : ""}`} style={!saved ? { backgroundColor: platform.color } : {}}>
          <Save size={15} />
          {saved ? "Đã lưu!" : "Lưu thay đổi"}
        </button>
        <button onClick={handleReset} className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-gray-400 hover:text-white">
          <RotateCcw size={14} />Đặt lại mặc định
        </button>
      </div>
    </div>
  );
}
