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

export function ComparisonTable({ tabs, comparisonTabs, primaryColor, onCheckout }: ComparisonTableProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const tab = tabs[activeTab];
  const customTab = comparisonTabs?.[activeTab];
  
  const allFeatures = customTab ? customTab.rows.map(r => r.label) : Array.from(new Set(tab.packages.flatMap(p => {
    return p.allFeatures.map(f => f.includes(":") ? f.split(":")[0].trim() : f);
  })));

  const getFeatureValue = (pkg: Package, featureName: string) => {
    const found = pkg.features.find(f => f.toLowerCase().startsWith(featureName.toLowerCase()));
    if (!found) return null;
    if (found.includes(":")) return found.split(":")[1].trim();
    return "check";
  };

  return (
    <section data-section="compare" id="compare" className="py-20 px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-5xl">
        <h2 className="mb-3 text-center text-3xl font-black text-white md:text-4xl">So Sánh Các Gói Dịch Vụ</h2>
        <p className="mb-8 text-center text-gray-400">Chọn gói phù hợp nhất với nhu cầu của bạn</p>

        {tabs.length > 1 && (
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {tabs.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className="rounded-full px-5 py-2 text-sm font-semibold transition-all"
                style={activeTab === i ? { backgroundColor: primaryColor, color: "#fff" } : { backgroundColor: "rgba(255,255,255,0.07)", color: "#ccc" }}
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
            className="overflow-x-auto rounded-2xl border border-white/10"
          >
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="bg-white/5 p-4 text-left text-sm font-medium text-gray-400">Tính năng</th>
                  {tab.packages.map((pkg, i) => (
                    <th 
                      key={i} 
                      onMouseEnter={() => setHoveredCol(i)}
                      onMouseLeave={() => setHoveredCol(null)}
                      className={`relative p-4 text-center transition-colors duration-300 ${hoveredCol === i ? "bg-white/10" : (!customTab && pkg.popular) ? "bg-primary/20" : "bg-white/5"}`}
                    >
                      <p className="text-base font-bold text-white">{customTab?.columns?.[i] || pkg.name}</p>
                      <p className="text-xl font-black" style={{ color: primaryColor }}>{pkg.price}</p>
                      <p className="text-xs text-gray-400">/tháng</p>
                      <button
                        onClick={() => onCheckout?.({ name: pkg.name, price: pkg.price, tabLabel: tab.label })}
                        className="mt-3 w-full rounded-lg py-2 text-sm font-bold text-white transition-transform hover:scale-105"
                        style={{ backgroundColor: (!customTab && pkg.popular) || hoveredCol === i ? primaryColor : "rgba(255,255,255,0.1)" }}
                      >
                        Đăng ký ngay
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allFeatures.map((feature, fi) => (
                  <tr key={fi} className={`border-b border-white/5 transition-colors hover:bg-white/5 ${fi % 2 === 0 ? "" : "bg-white/[0.02]"}`}>
                    <td className="p-4 text-sm text-gray-300">{feature}</td>
                    {tab.packages.map((pkg, pi) => {
                      const val = customTab ? (customTab.rows?.[fi]?.cells?.[pi] ?? "") : getFeatureValue(pkg, feature);
                      return (
                        <td 
                          key={pi} 
                          onMouseEnter={() => setHoveredCol(pi)}
                          onMouseLeave={() => setHoveredCol(null)}
                          className={`p-4 text-center transition-colors duration-300 ${hoveredCol === pi ? "bg-white/10" : (!customTab && pkg.popular) ? "bg-primary/10" : ""}`}
                        >
                          {val === "check" || val === "✓" ? (
                            <Check className="mx-auto h-5 w-5 text-green-400" />
                          ) : val === "—" || val === "-" ? (
                            <Minus className="mx-auto h-4 w-4 text-gray-600" />
                          ) : val ? (
                            <span className="text-sm font-bold text-white">{val}</span>
                          ) : (
                            <Minus className="mx-auto h-4 w-4 text-gray-600" />
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

