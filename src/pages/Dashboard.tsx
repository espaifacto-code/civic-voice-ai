import { useMemo, useState } from "react";
import { useCivicRecords } from "@/hooks/useCivicRecords";
import MetricCard from "@/components/dashboard/MetricCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Users, CheckCircle, TrendingUp, Gauge, ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";

export default function Dashboard() {
  const { data: records = [], isLoading } = useCivicRecords();
  const [sortKey, setSortKey] = useState<"created_at" | "avg_social_impact">("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const metrics = useMemo(() => {
    if (!records.length) return null;
    const total = records.length;
    const approved = records.filter((r) => r.approved).length;
    const avgSocial = records.reduce((s, r) => s + (r.avg_social_impact ?? 0), 0) / total;
    const avgFeasibility = records.reduce((s, r) => s + (r.avg_feasibility ?? 0), 0) / total;
    return { total, approvalRate: ((approved / total) * 100).toFixed(1), avgSocial: avgSocial.toFixed(1), avgFeasibility: avgFeasibility.toFixed(1), approved, revision: total - approved };
  }, [records]);

  const issueData = useMemo(() => {
    const map = new Map<string, number>();
    records.forEach((r) => { if (r.issue) map.set(r.issue, (map.get(r.issue) ?? 0) + 1); });
    return Array.from(map, ([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  }, [records]);

  const impactData = useMemo(() => {
    if (!records.length) return [];
    const len = records.length;
    return [
      { metric: "Feasibility", value: +(records.reduce((s, r) => s + (r.avg_feasibility ?? 0), 0) / len).toFixed(1) },
      { metric: "Social Impact", value: +(records.reduce((s, r) => s + (r.avg_social_impact ?? 0), 0) / len).toFixed(1) },
      { metric: "Inclusivity", value: +(records.reduce((s, r) => s + (r.avg_inclusivity ?? 0), 0) / len).toFixed(1) },
      { metric: "Sustainability", value: +(records.reduce((s, r) => s + (r.avg_sustainability ?? 0), 0) / len).toFixed(1) },
    ];
  }, [records]);

  const sorted = useMemo(() => {
    return [...records].sort((a, b) => {
      const aVal = sortKey === "created_at" ? new Date(a.created_at).getTime() : (a.avg_social_impact ?? 0);
      const bVal = sortKey === "created_at" ? new Date(b.created_at).getTime() : (b.avg_social_impact ?? 0);
      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    });
  }, [records, sortKey, sortDir]);

  const toggleSort = (key: "created_at" | "avg_social_impact") => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("desc"); }
  };

  if (isLoading) return <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">Loading data…</div>;

  const COLORS = ["hsl(160, 84%, 39%)", "hsl(38, 92%, 50%)"];

  return (
    <div className="container space-y-8 py-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Participatory Civic AI Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">AI-assisted civic participation platform<br />transforming citizen input into actionable policy proposals</p>
      </div>

      {/* Metrics */}
      {metrics && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="Total Citizen Submissions" value={String(metrics.total)} icon={Users} />
          <MetricCard title="Approval Rate" value={`${metrics.approvalRate}%`} subtitle={`${metrics.approved} of ${metrics.total}`} icon={CheckCircle} />
          <MetricCard title="Avg Social Impact" value={metrics.avgSocial} subtitle="out of 10" icon={TrendingUp} />
          <MetricCard title="Avg Feasibility" value={metrics.avgFeasibility} subtitle="out of 10" icon={Gauge} />
        </div>
      )}

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Issues Bar Chart */}
        <div className="rounded-xl bg-card p-6 shadow-card lg:col-span-1">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Civic Issues by Frequency</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={issueData} layout="vertical" margin={{ left: 0, right: 16, top: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={140} />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(217, 91%, 60%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Governance Donut */}
        <div className="rounded-xl bg-card p-6 shadow-card">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Ethical Governance Overview</h2>
          {metrics && (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={[{ name: "Approved", value: metrics.approved }, { name: "Requires Revision", value: metrics.revision }]} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" paddingAngle={2}>
                  {[0, 1].map((i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
          <div className="mt-2 flex justify-center gap-4 text-xs">
            <span className="flex items-center gap-1"><span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: COLORS[0] }} /> Approved</span>
            <span className="flex items-center gap-1"><span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: COLORS[1] }} /> Revision</span>
          </div>
        </div>

        {/* Impact Radar */}
        <div className="rounded-xl bg-card p-6 shadow-card">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Impact Score Distribution</h2>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={impactData}>
              <PolarGrid stroke="hsl(214, 32%, 91%)" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis domain={[0, 10]} tick={{ fontSize: 10 }} />
              <Radar dataKey="value" stroke="hsl(217, 91%, 60%)" fill="hsl(217, 91%, 60%)" fillOpacity={0.1} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-card shadow-card">
        <div className="border-b px-6 py-4">
          <h2 className="text-sm font-semibold text-foreground">Civic Proposals</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="sticky top-0 bg-background/80 backdrop-blur-md text-left text-xs font-medium text-muted-foreground">
                <th className="px-6 py-3 cursor-pointer select-none" onClick={() => toggleSort("created_at")}>
                  <span className="inline-flex items-center gap-1">Date <ArrowUpDown className="h-3 w-3" /></span>
                </th>
                <th className="px-6 py-3">Issue</th>
                <th className="px-6 py-3">Area</th>
                <th className="px-6 py-3">Proposals</th>
                <th className="px-6 py-3 cursor-pointer select-none" onClick={() => toggleSort("avg_social_impact")}>
                  <span className="inline-flex items-center gap-1">Social Impact <ArrowUpDown className="h-3 w-3" /></span>
                </th>
                <th className="px-6 py-3">Feasibility</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r) => (
                <tr key={r.id} className="border-t transition-colors hover:bg-secondary/50">
                  <td className="whitespace-nowrap px-6 py-3 font-mono-tabular text-xs">{format(new Date(r.created_at), "MMM d, yyyy")}</td>
                  <td className="px-6 py-3 font-medium">{r.issue}</td>
                  <td className="px-6 py-3 text-muted-foreground">{r.area}</td>
                  <td className="px-6 py-3 font-mono-tabular">{r.proposal_count}</td>
                  <td className="px-6 py-3 font-mono-tabular">{r.avg_social_impact?.toFixed(1)}</td>
                  <td className="px-6 py-3 font-mono-tabular">{r.avg_feasibility?.toFixed(1)}</td>
                  <td className="px-6 py-3"><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
