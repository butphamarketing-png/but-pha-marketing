"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type VisitorAreaChartProps = {
  data: Array<{ name: string; visits: number }>;
};

export function VisitorAreaChart({ data }: VisitorAreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="visitsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#ffffff15" vertical={false} />
        <XAxis dataKey="name" tick={{ fill: "#9CA3AF", fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#9CA3AF", fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ backgroundColor: "#111827", borderRadius: 12, border: "1px solid #374151" }}
          labelStyle={{ color: "#f8fafc" }}
          itemStyle={{ color: "#10B981" }}
        />
        <Area type="monotone" dataKey="visits" stroke="#10B981" fill="url(#visitsGradient)" strokeWidth={3} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
