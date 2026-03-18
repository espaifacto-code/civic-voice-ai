import { useMemo, useState } from "react";
import { useCivicRecords } from "@/hooks/useCivicRecords";
import MetricCard from "@/components/dashboard/MetricCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import ManualTrigger from "@/components/dashboard/ManualTrigger";
import { Users, CheckCircle, TrendingUp, Gauge, ArrowUpDown, Activity, Clock, Target, AlertTriangle } from "lucide-react";
import { format, subDays, isWithinInterval } from "date-fns";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, AreaChart, Area, ComposedChart,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const { data: records = [], isLoading, refetch } = useCivicRecords();
  const [sortKey, setSortKey] = useState<"created_at" | "avg_social_impact">("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const metrics = useMemo(() => {
    if (!records.length) return null;
    const total = records.length;
    const approved = records.filter((r) => r.approved).length;
    const avgSocial = records.reduce((s, r) => s + (r.avg_social_impact ?? 0), 0) / total;
    const avgFeasibility = records.reduce((s, r) => s + (r.avg_feasibility ?? 0), 0) / total;
    const avgInclusivity = records.reduce((s, r) => s + (r.avg_inclusivity ?? 0), 0) / total;
    const avgSustainability = records.reduce((s, r) => s + (r.avg_sustainability ?? 0), 0) / total;

    // Calculate recent activity (last 7 days)
    const sevenDaysAgo = subDays(new Date(), 7);
    const recentRecords = records.filter(r => isWithinInterval(new Date(r.created_at), { start: sevenDaysAgo, end: new Date() }));

    return {
      total,
      approvalRate: ((approved / total) * 100).toFixed(1),
      avgSocial: avgSocial.toFixed(1),
      avgFeasibility: avgFeasibility.toFixed(1),
      avgInclusivity: avgInclusivity.toFixed(1),
      avgSustainability: avgSustainability.toFixed(1),
      approved,
      revision: total - approved,
      recentActivity: recentRecords.length,
    };
  }, [records]);

  // Enhanced issue categorization
  const issueData = useMemo(() => {
    const categoryMap = new Map<string, number>();

    records.forEach((record) => {
      // Use area/category stored by n8n workflow; fall back to keyword detection
      let category = record.area || (record as any).category || null;

      if (!category) {
        const issueText = (record.issue || '').toLowerCase();
        if (/(housing|rent|eviction|home|homeless|habitat)/.test(issueText)) category = 'Housing';
        else if (/(mobility|traffic|bike|bus|transport|walk|pedestrian|street)/.test(issueText)) category = 'Mobility';
        else if (/(green|tree|park|nature|heat|climate|sustainab|environment|pollut)/.test(issueText)) category = 'Environment';
        else if (/(safety|violence|crime|lighting|security)/.test(issueText)) category = 'Safety';
        else if (/(accessib|disab|inclusive|universal design)/.test(issueText)) category = 'Accessibility';
        else if (/(youth|school|education|learning|children)/.test(issueText)) category = 'Education';
        else if (/(health|care|mental|wellbeing|medical)/.test(issueText)) category = 'Health';
        else if (/(community|participation|co-design|civic|social cohesion)/.test(issueText)) category = 'Community';
        else if (/(clean|waste|trash|noise|flood|water|street light|road)/.test(issueText)) category = 'Public Space';
        else if (/(unemploy|job|economy|business)/.test(issueText)) category = 'Economy';
        else category = 'Other';
      }

      categoryMap.set(category, (categoryMap.get(category) ?? 0) + 1);
    });

    return Array.from(categoryMap, ([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8); // Top 8 categories
  }, [records]);

  // Timeline data for activity over time
  const timelineData = useMemo(() => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = subDays(new Date(), 29 - i);
      return {
        date: format(date, 'MMM dd'),
        fullDate: date,
        count: 0,
      };
    });

    records.forEach((record) => {
      const recordDate = new Date(record.created_at);
      const dayIndex = last30Days.findIndex(day =>
        format(day.fullDate, 'yyyy-MM-dd') === format(recordDate, 'yyyy-MM-dd')
      );
      if (dayIndex !== -1) {
        last30Days[dayIndex].count += 1;
      }
    });

    return last30Days;
  }, [records]);

  // Impact radar data
  const impactData = useMemo(() => {
    if (!records.length) return [];
    const len = records.length;
    return [
      { metric: "Feasibility", value: +(records.reduce((s, r) => s + (r.avg_feasibility ?? 0), 0) / len).toFixed(1), fullMark: 10 },
      { metric: "Social Impact", value: +(records.reduce((s, r) => s + (r.avg_social_impact ?? 0), 0) / len).toFixed(1), fullMark: 10 },
      { metric: "Inclusivity", value: +(records.reduce((s, r) => s + (r.avg_inclusivity ?? 0), 0) / len).toFixed(1), fullMark: 10 },
      { metric: "Sustainability", value: +(records.reduce((s, r) => s + (r.avg_sustainability ?? 0), 0) / len).toFixed(1), fullMark: 10 },
    ];
  }, [records]);

  // Status distribution
  const statusData = useMemo(() => {
    const statusMap = new Map<string, number>();
    records.forEach((record) => {
      const status = record.approved ? 'Approved' : 'Under Review';
      statusMap.set(status, (statusMap.get(status) ?? 0) + 1);
    });
    return Array.from(statusMap, ([name, value]) => ({ name, value }));
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

  // Professional civic palette — blue/indigo/teal family
  const COLORS = [
    "#1d4ed8", // blue-700
    "#2563eb", // blue-600
    "#3b82f6", // blue-500
    "#0ea5e9", // sky-500
    "#0891b2", // cyan-600
    "#0d9488", // teal-600
    "#4f46e5", // indigo-600
    "#6366f1", // indigo-500
  ];

  // Vertical gradient (top→bottom) for pie/area/radar charts
  const renderGradient = (id, color) => (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={color} stopOpacity={0.85} />
      <stop offset="95%" stopColor={color} stopOpacity={0.35} />
    </linearGradient>
  );

  // Horizontal gradient (left→right) for horizontal bar chart
  const renderBarGradient = (id, color) => (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor={color} stopOpacity={1} />
      <stop offset="100%" stopColor={color} stopOpacity={0.55} />
    </linearGradient>
  );

  return (
    <div className="container space-y-8 py-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Participatory Civic AI Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">AI-assisted civic participation platform<br />transforming citizen input into actionable policy proposals</p>
      </div>

      {/* Key Metrics */}
      {metrics && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <MetricCard title="Total Submissions" value={String(metrics.total)} icon={Users} />
          <MetricCard title="Approval Rate" value={`${metrics.approvalRate}%`} subtitle={`${metrics.approved} approved`} icon={CheckCircle} />
          <MetricCard title="Recent Activity" value={String(metrics.recentActivity)} subtitle="last 7 days" icon={Activity} />
          <MetricCard title="Avg Social Impact" value={metrics.avgSocial} subtitle="out of 10" icon={TrendingUp} />
          <MetricCard title="Avg Feasibility" value={metrics.avgFeasibility} subtitle="out of 10" icon={Gauge} />
          <MetricCard title="Processing Queue" value={String(metrics.revision)} subtitle="under review" icon={Clock} />
        </div>
      )}

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="trigger">Manual Trigger</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Issue Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Civic Issues by Category
                </CardTitle>
                <CardDescription>Top community concerns categorized by type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={issueData} layout="vertical" margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
                    <defs>
                      {COLORS.map((color, idx) => renderBarGradient(`bar-gradient-${idx}`, color))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#475569' }} width={100} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: '#fff', borderRadius: 8, fontSize: 13, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      cursor={{ fill: '#f8fafc' }}
                    />
                    <Bar dataKey="count" radius={[0, 6, 6, 0]} isAnimationActive={true}>
                      {issueData.map((_, idx) => (
                        <Cell key={idx} fill={`url(#bar-gradient-${idx % COLORS.length})`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Processing Status
                </CardTitle>
                <CardDescription>Current state of proposal reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <defs>
                      {COLORS.map((color, idx) => renderGradient(`pie-gradient-${idx}`, color))}
                    </defs>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="value"
                      paddingAngle={2}
                      isAnimationActive={true}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`url(#pie-gradient-${index % COLORS.length})`} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#fff', borderRadius: 8, fontSize: 13 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-4">
                  {statusData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm">{entry.name}: {entry.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Impact Assessment Radar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Impact Assessment Overview
              </CardTitle>
              <CardDescription>Average scores across all evaluated proposals</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={impactData} outerRadius={150}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 13, fill: '#334155' }} />
                  <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Radar
                    name="Average Score"
                    dataKey="value"
                    stroke="#818cf8"
                    fill="#818cf8"
                    fillOpacity={0.25}
                    strokeWidth={3}
                  />
                  <Tooltip contentStyle={{ background: '#fff', borderRadius: 8, fontSize: 13 }} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
            {/* Submissions List */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Submissions</CardTitle>
                <CardDescription>Click a row to inspect it</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {sorted.slice(0, 10).map((record) => (
                    <div
                      key={record.id}
                      onClick={() => setSelectedId(selectedId === record.id ? null : record.id)}
                      className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${selectedId === record.id ? 'border-primary bg-muted/40' : ''}`}
                    >
                      <div className="flex-1 min-w-0 mr-2">
                        <p className="font-medium text-sm truncate">{record.issue || 'General Issue'}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground">{format(new Date(record.created_at), 'MMM dd, yyyy')}</span>
                          {record.area && <span className="text-xs text-muted-foreground">· {record.area}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant={record.approved ? "default" : "secondary"}>
                          {record.approved ? "Approved" : "Review"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detail Panel — overall stats by default, full submission detail when selected */}
            <Card>
              {(() => {
                const selected = sorted.find(r => r.id === selectedId);

                if (!selected) {
                  // Default: overall processing statistics + score breakdown
                  return (
                    <>
                      <CardHeader>
                        <CardTitle>Processing Statistics</CardTitle>
                        <CardDescription>Overall breakdown across all {metrics?.total ?? 0} submissions</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {metrics && (
                          <>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="border rounded-lg p-4 text-center">
                                <p className="text-2xl font-bold">{metrics.total}</p>
                                <p className="text-xs text-muted-foreground mt-1">Total Processed</p>
                              </div>
                              <div className="border rounded-lg p-4 text-center">
                                <p className="text-2xl font-bold">{metrics.approvalRate}%</p>
                                <p className="text-xs text-muted-foreground mt-1">Approval Rate</p>
                              </div>
                              <div className="border rounded-lg p-4 text-center">
                                <p className="text-2xl font-bold text-green-600">{metrics.approved}</p>
                                <p className="text-xs text-muted-foreground mt-1">Approved</p>
                              </div>
                              <div className="border rounded-lg p-4 text-center">
                                <p className="text-2xl font-bold text-yellow-600">{metrics.revision}</p>
                                <p className="text-xs text-muted-foreground mt-1">Under Review</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-3">Average Impact Scores</p>
                              <div className="space-y-3">
                                {[
                                  { label: 'Social Impact', value: metrics.avgSocial },
                                  { label: 'Feasibility', value: metrics.avgFeasibility },
                                  { label: 'Inclusivity', value: metrics.avgInclusivity },
                                  { label: 'Sustainability', value: metrics.avgSustainability },
                                ].map(({ label, value }) => (
                                  <div key={label} className="flex items-center gap-3">
                                    <span className="text-sm w-28 shrink-0">{label}</span>
                                    <div className="flex-1 bg-muted rounded-full h-2">
                                      <div className="bg-primary h-2 rounded-full" style={{ width: `${(parseFloat(value) / 10) * 100}%` }} />
                                    </div>
                                    <span className="text-sm font-bold w-8 text-right">{value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                        <p className="text-xs text-muted-foreground text-center">← Click a submission to inspect it</p>
                      </CardContent>
                    </>
                  );
                }

                // Selected: full submission detail
                const proposals = Array.isArray(selected.proposals) ? selected.proposals : [];
                return (
                  <>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="text-base leading-snug">{selected.issue || 'General Issue'}</CardTitle>
                          <CardDescription className="mt-1">
                            {selected.area && <span className="mr-2">{selected.area}</span>}
                            {selected.participant && <span className="mr-2">· {selected.participant}</span>}
                            · {format(new Date(selected.created_at), 'MMM dd, yyyy')}
                          </CardDescription>
                        </div>
                        <Badge variant={selected.approved ? "default" : "secondary"} className="shrink-0">
                          {selected.approved ? "Approved" : "Under Review"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      {/* Scores */}
                      {(selected.avg_feasibility != null || selected.avg_social_impact != null) && (
                        <div>
                          <p className="text-sm font-medium mb-2">Impact Scores</p>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { label: 'Social Impact', value: selected.avg_social_impact },
                              { label: 'Feasibility', value: selected.avg_feasibility },
                              { label: 'Inclusivity', value: selected.avg_inclusivity },
                              { label: 'Sustainability', value: selected.avg_sustainability },
                            ].map(({ label, value }) => value != null && (
                              <div key={label} className="border rounded-lg p-3 flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">{label}</span>
                                <span className="text-sm font-bold">{value.toFixed(1)}<span className="text-xs font-normal text-muted-foreground">/10</span></span>
                              </div>
                            ))}
                          </div>
                          {selected.ethical_issues_count != null && selected.ethical_issues_count > 0 && (
                            <p className="text-xs text-yellow-600 mt-2">⚠ {selected.ethical_issues_count} ethical issue{selected.ethical_issues_count > 1 ? 's' : ''} flagged</p>
                          )}
                        </div>
                      )}

                      {/* Proposals */}
                      <div>
                        <p className="text-sm font-medium mb-2">AI-Generated Proposals ({proposals.length})</p>
                        {proposals.length === 0 ? (
                          <p className="text-sm text-muted-foreground">No proposals stored for this submission.</p>
                        ) : (
                          <div className="space-y-3">
                            {proposals.map((p: any, idx: number) => (
                              <div key={idx} className="border rounded-lg p-3 space-y-1.5">
                                <p className="font-semibold text-sm">{p.title || `Proposal ${idx + 1}`}</p>
                                {p.solution && <p className="text-xs text-muted-foreground">{p.solution}</p>}
                                {Array.isArray(p.implementation_steps) && p.implementation_steps.length > 0 && (
                                  <ul className="list-disc pl-4 space-y-0.5 mt-1">
                                    {p.implementation_steps.map((step: string, i: number) => (
                                      <li key={i} className="text-xs">{step}</li>
                                    ))}
                                  </ul>
                                )}
                                {p.expected_impact_6m && (
                                  <p className="text-xs text-primary font-medium mt-1">Impact: {p.expected_impact_6m}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </>
                );
              })()}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Activity Timeline
              </CardTitle>
              <CardDescription>Citizen submissions over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={timelineData}>
                  <defs>
                    {renderGradient('area-gradient', '#22d3ee')}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} axisLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#fff', borderRadius: 8, fontSize: 13 }} />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#22d3ee"
                    fill="url(#area-gradient)"
                    fillOpacity={0.5}
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Impact Trends */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Impact Score Distribution</CardTitle>
                <CardDescription>How proposals score across different criteria</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <ComposedChart data={impactData}>
                    <defs>
                      {renderGradient('impact-bar-gradient', '#818cf8')}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="metric" tick={{ fontSize: 12 }} axisLine={false} />
                    <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} axisLine={false} />
                    <Tooltip contentStyle={{ background: '#fff', borderRadius: 8, fontSize: 13 }} />
                    <Bar dataKey="value" fill="url(#impact-bar-gradient)" radius={[8, 8, 0, 0]} />
                    <Line type="monotone" dataKey="fullMark" stroke="#a3a3a3" strokeDasharray="5 5" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics</CardTitle>
                <CardDescription>Average scores for approved proposals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {impactData.map((item) => (
                  <div key={item.metric} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.metric}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(item.value / 10) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold w-8 text-right">{item.value}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trigger" className="space-y-6">
          <ManualTrigger onTriggerSuccess={() => refetch()} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
