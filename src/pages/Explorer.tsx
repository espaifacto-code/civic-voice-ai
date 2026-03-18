import { useState, useMemo } from "react";
import { useCivicRecords } from "@/hooks/useCivicRecords";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { format } from "date-fns";
import { ChevronRight, CheckCircle2, AlertTriangle, Shield, X } from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
} from "recharts";
import type { CivicRecord, Proposal } from "@/types/civic";

export default function Explorer() {
  const { data: records = [], isLoading } = useCivicRecords();
  const [selected, setSelected] = useState<CivicRecord | null>(null);
  const [areaFilter, setAreaFilter] = useState("");
  const [issueFilter, setIssueFilter] = useState("");
  const [ethicalFilter, setEthicalFilter] = useState("");

  const areas = useMemo(() => [...new Set(records.map((r) => r.area).filter(Boolean))].sort(), [records]);
  const issues = useMemo(() => [...new Set(records.map((r) => r.issue).filter(Boolean))].sort(), [records]);

  const filtered = useMemo(() => {
    return records.filter((r) => {
      if (areaFilter && r.area !== areaFilter) return false;
      if (issueFilter && r.issue !== issueFilter) return false;
      if (ethicalFilter === "approved" && !r.approved) return false;
      if (ethicalFilter === "revision" && r.approved) return false;
      return true;
    });
  }, [records, areaFilter, issueFilter, ethicalFilter]);

  const impactData = selected
    ? [
        { metric: "Feasibility", value: selected.avg_feasibility ?? 0 },
        { metric: "Social Impact", value: selected.avg_social_impact ?? 0 },
        { metric: "Inclusivity", value: selected.avg_inclusivity ?? 0 },
        { metric: "Sustainability", value: selected.avg_sustainability ?? 0 },
      ]
    : [];

  if (isLoading) return <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">Loading data…</div>;

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Civic Proposal Explorer</h1>
      <p className="mt-1 text-sm text-muted-foreground">Browse and review AI-generated civic proposals with ethical oversight.</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <select value={areaFilter} onChange={(e) => setAreaFilter(e.target.value)} className="rounded-lg border bg-card px-3 py-2 text-sm">
          <option value="">All Areas</option>
          {areas.map((a) => <option key={a} value={a!}>{a}</option>)}
        </select>
        <select value={issueFilter} onChange={(e) => setIssueFilter(e.target.value)} className="rounded-lg border bg-card px-3 py-2 text-sm">
          <option value="">All Issues</option>
          {issues.map((i) => <option key={i} value={i!}>{i}</option>)}
        </select>
        <select value={ethicalFilter} onChange={(e) => setEthicalFilter(e.target.value)} className="rounded-lg border bg-card px-3 py-2 text-sm">
          <option value="">All Statuses</option>
          <option value="approved">Approved</option>
          <option value="revision">Requires Revision</option>
        </select>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[35%_1fr]">
        {/* List */}
        <div className="space-y-2 overflow-y-auto lg:max-h-[calc(100vh-200px)]">
          {filtered.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelected(r)}
              className={`w-full rounded-xl p-4 text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-md ${
                selected?.id === r.id ? "ring-2 ring-primary bg-card" : "bg-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground text-sm">{r.issue}</h3>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{r.area}</span>
                <span>·</span>
                <span>{format(new Date(r.created_at), "MMM d, yyyy")}</span>
              </div>
              <div className="mt-2"><StatusBadge status={r.status} /></div>
            </button>
          ))}
          {!filtered.length && <p className="py-12 text-center text-sm text-muted-foreground">No records match your filters.</p>}
        </div>

        {/* Detail */}
        {selected ? (
          <div className="space-y-6 overflow-y-auto lg:max-h-[calc(100vh-200px)]">
            {/* Header */}
            <div className="rounded-xl bg-card p-6 shadow-card">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">{selected.issue}</h2>
                  <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span>Area: <strong className="text-foreground">{selected.area}</strong></span>
                    <span>Participant: <strong className="text-foreground">{selected.participant}</strong></span>
                    <span>Date: <strong className="font-mono-tabular text-foreground">{format(new Date(selected.created_at), "MMM d, yyyy")}</strong></span>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="rounded-lg p-1 text-muted-foreground hover:bg-secondary lg:hidden">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Proposals */}
              {(selected.proposals as any[] ?? []).map((p: any, i: number) => (
              <div key={i} className="rounded-xl bg-primary/[0.03] p-6 shadow-card space-y-4">
                <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Problem Summary</h4>
                  <p className="mt-1 text-sm leading-relaxed">{p.problem_summary ?? p.solution ?? '—'}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Solution</h4>
                  <p className="mt-1 text-sm leading-relaxed">{p.solution}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Implementation Steps</h4>
                  <ol className="mt-2 space-y-1">
                    {(p.implementation_steps ?? []).map((step, j) => (
                      <li key={j} className="flex gap-3 text-sm">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{j + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Stakeholders</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(p.stakeholders ?? []).map((s) => (
                      <span key={s} className="rounded-md border bg-secondary px-2 py-0.5 text-xs font-medium">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Expected Impact (6 Months)</h4>
                  <p className="mt-1 text-sm leading-relaxed">{p.expected_impact_6m}</p>
                </div>
              </div>
            ))}

            {/* Ethical Review */}
            <div className={`rounded-xl p-6 shadow-card ${selected.approved ? "bg-emerald-50 border border-emerald-200" : "bg-amber-50 border border-amber-200"}`}>
              <div className="flex items-center gap-3">
                {selected.approved ? (
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                )}
                <h3 className={`text-lg font-semibold ${selected.approved ? "text-emerald-800" : "text-amber-800"}`}>
                  {selected.approved ? "Approved by Ethical Review" : "Requires Revision"}
                </h3>
              </div>
              {selected.approved ? (
                <p className="mt-2 text-sm text-emerald-700">This proposal meets all ethical guidelines.</p>
              ) : (
                <div className="mt-3 space-y-2">
                  <p className="text-sm text-amber-700">{selected.ethical_issues_count} ethical issue(s) identified:</p>
                  {(selected.ethical_issues as string[] | null)?.map((issue, i) => (
                    <div key={i} className="rounded-lg bg-amber-100/60 px-3 py-2 text-sm text-amber-800">{issue}</div>
                  ))}
                </div>
              )}
            </div>

            {/* Impact Radar */}
            <div className="rounded-xl bg-card p-6 shadow-card">
              <h3 className="mb-4 text-sm font-semibold">Impact Evaluation</h3>
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={impactData}>
                  <PolarGrid stroke="hsl(214, 32%, 91%)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis domain={[0, 10]} tick={{ fontSize: 10 }} />
                  <Radar dataKey="value" stroke="hsl(217, 91%, 60%)" fill="hsl(217, 91%, 60%)" fillOpacity={0.1} />
                </RadarChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Feasibility:</span> <span className="font-mono-tabular font-medium">{selected.avg_feasibility?.toFixed(1)}</span></div>
                <div><span className="text-muted-foreground">Social Impact:</span> <span className="font-mono-tabular font-medium">{selected.avg_social_impact?.toFixed(1)}</span></div>
                <div><span className="text-muted-foreground">Inclusivity:</span> <span className="font-mono-tabular font-medium">{selected.avg_inclusivity?.toFixed(1)}</span></div>
                <div><span className="text-muted-foreground">Sustainability:</span> <span className="font-mono-tabular font-medium">{selected.avg_sustainability?.toFixed(1)}</span></div>
              </div>
            </div>

            {/* AI Transparency */}
            <div className="rounded-xl bg-slate-900 p-8 text-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-slate-400" />
                <h3 className="text-sm font-semibold">AI Transparency</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-300">
                This civic AI system generates policy proposals based on citizen input and contextual knowledge. Each proposal is evaluated by an ethical review layer and scored across impact dimensions such as feasibility, inclusivity, and sustainability.
              </p>
            </div>

            {/* Footer notice */}
            <footer className="mx-auto max-w-prose py-12 text-center text-xs text-muted-foreground">
              This platform demonstrates responsible AI-assisted civic participation. Citizen input is translated into policy proposals using AI models combined with contextual knowledge. All proposals undergo ethical review and impact scoring before being presented.
            </footer>
          </div>
        ) : (
          <div className="flex min-h-[300px] items-center justify-center rounded-xl bg-card text-sm text-muted-foreground shadow-card">
            Select a record to view proposal details.
          </div>
        )}
      </div>
    </div>
  );
}
