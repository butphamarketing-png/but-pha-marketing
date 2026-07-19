import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Minus } from "lucide-react";
import type { ComparisonTabOverride } from "@/lib/pageContent";

interface Package {
  name: string;
  price: string;
  popular?: boolean;
  features: string[];
  allFeatures: string[];
}

interface Tab {
  label: string;
  packages: Package[];
}

interface ComparisonTableProps {
  tabs: Tab[];
  comparisonTabs?: ComparisonTabOverride[];
  primaryColor: string;
  onCheckout?: (pkg: { name: string; price: string; tabLabel: string }) => void;
}

const ACCENT = "#6D5CE6";

export function ComparisonTable({ tabs, comparisonTabs, primaryColor, onCheckout }: ComparisonTableProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const tab = tabs[activeTab];
  const customTab = comparisonTabs?.[activeTab];
  const accent = primaryColor || ACCENT;

  const allFeatures = customTab
    ? customTab.rows.map((r) => r.label)
    : Array.from(
        new Set(
          tab.packages.flatMap((p) => {
            return p.allFeatures.map((f) => (f.includes(":") ? f.split(":")[0].trim() : f));
          }),
        ),
      );

  const getFeatureValue = (pkg: Package, featureName: string) => {
    const found = pkg.features.find((f) => f.toLowerCase().startsWith(featureName.toLowerCase()));
    if (!found) return null;
    if (found.includes(":")) return found.split(":")[1].trim();
    return "check";
  };

  return (
    <section data-section="compare" id="compare" className="px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-5xl"
      >
        <h2 className="mb-3 text-center text-3xl font-semibold text-white md:text-4xl">
          So sánh các gói dịch vụ
        </h2>
        <p className="mb-8 text-center text-white/45">Chọn gói phù hợp nhất với nhu cầu của bạn</p>

        {tabs.length > 1 && (
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {tabs.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className="rounded-full border px-5 py-2 text-sm font-semibold transition-all"
                style={
                  activeTab === i
                    ? { backgroundColor: accent, color: "#0b0d12", borderColor: accent }
                    : {
                        backgroundColor: "rgba(255,255,255,0.03)",
                        color: "rgba(255,255,255,0.55)",
                        borderColor: "rgba(255,255,255,0.12)",
                      }
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-white/[0.03]"
          >
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="bg-white/[0.04] p-4 text-left text-sm font-medium text-white/40">Tính năng</th>
                  {tab.packages.map((pkg, i) => (
                    <th
                      key={i}
                      onMouseEnter={() => setHoveredCol(i)}
                      onMouseLeave={() => setHoveredCol(null)}
                      className={`relative p-4 text-center transition-colors duration-300 ${
                        hoveredCol === i || (!customTab && pkg.popular)
                          ? "bg-white/[0.04]"
                          : "bg-transparent"
                      }`}
                    >
                      <p className="text-base font-medium text-white">{customTab?.columns?.[i] || pkg.name}</p>
                      <p className="text-xl font-semibold text-violet-300/80">{pkg.price}</p>
                      <p className="text-xs text-white/35">/tháng</p>
                      <button
                        onClick={() => onCheckout?.({ name: pkg.name, price: pkg.price, tabLabel: tab.label })}
                        className="mt-3 w-full rounded-full py-2 text-sm font-semibold transition-transform hover:scale-[1.02]"
                        style={
                          (!customTab && pkg.popular) || hoveredCol === i
                            ? { backgroundColor: "#e8c99a", color: "#0b0d12" }
                            : { backgroundColor: "rgba(255,255,255,0.12)", color: "#fff" }
                        }
                      >
                        Đăng ký ngay
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allFeatures.map((feature, fi) => (
                  <tr
                    key={fi}
                    className={`border-b border-white/[0.05] transition-colors hover:bg-white/[0.03] ${
                      fi % 2 === 0 ? "" : "bg-white/[0.02]"
                    }`}
                  >
                    <td className="p-4 text-sm text-white/70">{feature}</td>
                    {tab.packages.map((pkg, pi) => {
                      const val = customTab
                        ? (customTab.rows?.[fi]?.cells?.[pi] ?? "")
                        : getFeatureValue(pkg, feature);
                      return (
                        <td
                          key={pi}
                          onMouseEnter={() => setHoveredCol(pi)}
                          onMouseLeave={() => setHoveredCol(null)}
                          className={`p-4 text-center transition-colors duration-300 ${
                            hoveredCol === pi || (!customTab && pkg.popular) ? "bg-white/[0.03]" : ""
                          }`}
                        >
                          {val === "check" || val === "✓" ? (
                            <Check className="mx-auto h-5 w-5 text-violet-300/80" />
                          ) : val === "—" || val === "-" ? (
                            <Minus className="mx-auto h-4 w-4 text-white/25" />
                          ) : val ? (
                            <span className="text-sm font-medium text-white/85">{val}</span>
                          ) : (
                            <Minus className="mx-auto h-4 w-4 text-white/25" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
