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
  const { data: records = [], isLoading } = useCivicRecords();
  const [sortKey, setSortKey] = useState<"created_at" | "avg_social_impact">("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

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
      let category = 'Other';

      // Try to categorize based on issue description or field
      const issueText = (record.issue || record.description || '').toLowerCase();

      if (issueText.includes('hous') || issueText.includes('rent') || issueText.includes('apart')) {
        category = 'Housing';
      } else if (issueText.includes('transport') || issueText.includes('traffic') || issueText.includes('bus') || issueText.includes('metro')) {
        category = 'Transportation';
      } else if (issueText.includes('environment') || issueText.includes('green') || issueText.includes('park') || issueText.includes('pollut')) {
        category = 'Environment';
      } else if (issueText.includes('education') || issueText.includes('school') || issueText.includes('learn')) {
        category = 'Education';
      } else if (issueText.includes('health') || issueText.includes('medical') || issueText.includes('care')) {
        category = 'Healthcare';
      } else if (issueText.includes('community') || issueText.includes('safety') || issueText.includes('crime')) {
        category = 'Community Safety';
      } else if (issueText.includes('economy') || issueText.includes('job') || issueText.includes('business')) {
        category = 'Economy';
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

  const COLORS = ["hsl(160, 84%, 39%)", "hsl(38, 92%, 50%)", "hsl(217, 91%, 60%)", "hsl(280, 81%, 60%)"];

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
                  <BarChart data={issueData} layout="horizontal" margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={120} />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(217, 91%, 60%)" radius={[0, 4, 4, 0]} />
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
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="value"
                      paddingAngle={2}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
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
                <RadarChart data={impactData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fontSize: 10 }} />
                  <Radar
                    name="Average Score"
                    dataKey="value"
                    stroke="hsl(217, 91%, 60%)"
                    fill="hsl(217, 91%, 60%)"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Records Table */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Submissions</CardTitle>
                <CardDescription>Latest citizen input processed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sorted.slice(0, 5).map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{record.issue || 'General Issue'}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(record.created_at), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={record.approved ? "default" : "secondary"}>
                          {record.approved ? "Approved" : "Review"}
                        </Badge>
                        {record.avg_social_impact && (
                          <span className="text-xs font-medium">
                            {record.avg_social_impact.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Processing Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Processing Statistics</CardTitle>
                <CardDescription>Detailed breakdown of proposal evaluations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {metrics && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Processed</span>
                      <Badge variant="outline">{metrics.total}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Approved</span>
                      <Badge variant="default">{metrics.approved}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Under Review</span>
                      <Badge variant="secondary">{metrics.revision}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Success Rate</span>
                      <Badge variant="outline">{metrics.approvalRate}%</Badge>
                    </div>
                  </>
                )}
              </CardContent>
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
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="hsl(217, 91%, 60%)"
                    fill="hsl(217, 91%, 60%)"
                    fillOpacity={0.3}
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
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                    <XAxis dataKey="metric" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
                    <Line type="monotone" dataKey="fullMark" stroke="hsl(214, 32%, 91%)" strokeDasharray="5 5" />
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
          <ManualTrigger />
        </TabsContent>
      </Tabs>
    </div>
  );
}
