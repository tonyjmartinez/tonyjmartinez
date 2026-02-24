import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const playerData = [
  { name: "Shai Gilgeous-Alexander", ppg: 31.2, rpg: 5.5, apg: 6.0, team: "OKC" },
  { name: "Luka Doncic", ppg: 28.8, rpg: 8.3, apg: 7.8, team: "LAL" },
  { name: "Jayson Tatum", ppg: 27.5, rpg: 8.7, apg: 5.2, team: "BOS" },
  { name: "Giannis Antetokounmpo", ppg: 31.5, rpg: 11.6, apg: 6.1, team: "MIL" },
  { name: "Anthony Edwards", ppg: 26.2, rpg: 5.8, apg: 4.5, team: "MIN" },
  { name: "Kevin Durant", ppg: 27.0, rpg: 6.4, apg: 5.0, team: "PHX" },
];

type Stat = "ppg" | "rpg" | "apg";

const statLabels: Record<Stat, string> = {
  ppg: "Points Per Game",
  rpg: "Rebounds Per Game",
  apg: "Assists Per Game",
};

const statColors: Record<Stat, string> = {
  ppg: "#3b82f6",
  rpg: "#10b981",
  apg: "#f59e0b",
};

export default function NbaChart() {
  const [activeStat, setActiveStat] = useState<Stat>("ppg");

  const chartData = playerData
    .map((p) => ({
      name: p.name.split(" ").pop(),
      fullName: p.name,
      team: p.team,
      value: p[activeStat],
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="my-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap gap-2">
        {(Object.keys(statLabels) as Stat[]).map((stat) => (
          <button
            key={stat}
            onClick={() => setActiveStat(stat)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              activeStat === stat
                ? "bg-[var(--color-brand-600)] text-white"
                : "bg-[var(--color-surface-raised)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            {statLabels[stat]}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="name"
            tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
            axisLine={{ stroke: "var(--color-border)" }}
            tickLine={{ stroke: "var(--color-border)" }}
          />
          <YAxis
            tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
            axisLine={{ stroke: "var(--color-border)" }}
            tickLine={{ stroke: "var(--color-border)" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "0.5rem",
              color: "var(--color-text-primary)",
            }}
            formatter={(value: number, _name: string, entry: any) => [
              `${value} ${activeStat.toUpperCase()}`,
              `${entry.payload.fullName} (${entry.payload.team})`,
            ]}
          />
          <Bar
            dataKey="value"
            fill={statColors[activeStat]}
            radius={[4, 4, 0, 0]}
            maxBarSize={60}
          />
        </BarChart>
      </ResponsiveContainer>

      <p className="mt-3 text-center text-xs text-[var(--color-text-muted)]">
        Sample data for demonstration. Click the stat buttons above to compare categories.
      </p>
    </div>
  );
}
