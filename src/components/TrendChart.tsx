"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CATEGORICAL_DARK, CATEGORICAL_LIGHT, CHART_INK_DARK, CHART_INK_LIGHT } from "@/lib/palette";
import { useIsDark } from "@/lib/useIsDark";

export interface TrendSeries {
  key: string;
  label: string;
}

export function TrendChart({
  title,
  data,
  series,
  height = 260,
}: {
  title: string;
  data: Record<string, string | number>[];
  series: TrendSeries[];
  height?: number;
}) {
  const isDark = useIsDark();
  const ink = isDark ? CHART_INK_DARK : CHART_INK_LIGHT;
  const categorical = isDark ? CATEGORICAL_DARK : CATEGORICAL_LIGHT;

  return (
    <div className="rounded-xl border border-line bg-surface p-4 shadow-sm">
      <p className="mb-3 text-sm font-semibold text-primary">{title}</p>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 4, right: 12, left: -16, bottom: 0 }}>
          <CartesianGrid stroke={ink.gridline} vertical={false} />
          <XAxis
            dataKey="date"
            stroke={ink.axis}
            tick={{ fill: ink.mutedText, fontSize: 12 }}
            tickLine={false}
          />
          <YAxis
            stroke={ink.axis}
            tick={{ fill: ink.mutedText, fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            width={48}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              borderColor: ink.gridline,
              backgroundColor: ink.tooltipBg,
              color: ink.primaryText,
              fontSize: 12,
            }}
          />
          {series.length > 1 ? (
            <Legend wrapperStyle={{ fontSize: 12, color: ink.secondaryText }} />
          ) : null}
          {series.map((s, i) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={categorical[i % categorical.length]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
