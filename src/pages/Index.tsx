// Update this page (the content is just a fallback if you fail to update the page)

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Database, Shield, Users, BarChart3, Webhook, FileText, CheckCircle, Lightbulb, Sparkles, Zap, Globe } from "lucide-react";

const Index = () => {
  const heroArtworkUrl = `${import.meta.env.BASE_URL}og-image.svg`;

  return (
    <div className="min-h-screen">
      {/* ── Hero Section ─ Dark cinematic hero with inline SVG elements ── */}
      <style>{`
        @keyframes orbit1   { from { transform: rotate(0deg) translateX(180px) rotate(0deg); }   to { transform: rotate(360deg) translateX(180px) rotate(-360deg); } }
        @keyframes orbit2   { from { transform: rotate(120deg) translateX(130px) rotate(-120deg); } to { transform: rotate(480deg) translateX(130px) rotate(-480deg); } }
        @keyframes orbit3   { from { transform: rotate(240deg) translateX(80px) rotate(-240deg); }  to { transform: rotate(600deg) translateX(80px) rotate(-600deg); } }
        @keyframes drift    { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-18px); } }
        @keyframes fadeGrid { 0%,100% { opacity: .04; } 50% { opacity: .08; } }
        @keyframes glowRing { 0%,100% { opacity: .08; transform: scale(1); } 50% { opacity: .18; transform: scale(1.06); } }
        @keyframes nodeFloat { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(8px,-12px) scale(1.15); } 66% { transform: translate(-6px,8px) scale(.9); } }
        @keyframes artworkDrift { 0%,100% { transform: translate3d(0, 0, 0) scale(1); } 50% { transform: translate3d(-18px, -12px, 0) scale(1.02); } }
        @keyframes sheenPulse { 0%,100% { opacity: .38; } 50% { opacity: .62; } }
        .hero-grid      { animation: fadeGrid 6s ease-in-out infinite; }
        .hero-ring      { animation: glowRing 5s ease-in-out infinite; }
        .hero-ring-2    { animation: glowRing 7s ease-in-out infinite 1s; }
        .hero-ring-3    { animation: glowRing 9s ease-in-out infinite 2s; }
        .hero-node      { animation: nodeFloat 6s ease-in-out infinite; }
        .hero-node-2    { animation: nodeFloat 5s ease-in-out infinite .8s; }
        .hero-node-3    { animation: nodeFloat 7s ease-in-out infinite 1.6s; }
        .hero-node-4    { animation: nodeFloat 4s ease-in-out infinite 2.4s; }
        .hero-orbit-1   { animation: orbit1 20s linear infinite; }
        .hero-orbit-2   { animation: orbit2 28s linear infinite; }
        .hero-orbit-3   { animation: orbit3 16s linear infinite; }
        .hero-accent-bar { animation: drift 4s ease-in-out infinite; }
        .hero-artwork   { animation: artworkDrift 18s ease-in-out infinite; }
        .hero-sheen     { animation: sheenPulse 6s ease-in-out infinite; }
      `}</style>

      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-[#0b1120] via-[#0f1d35] to-[#162544]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(59,130,246,0.16),transparent_24%),radial-gradient(circle_at_82%_22%,rgba(6,182,212,0.14),transparent_18%),linear-gradient(135deg,rgba(15,23,42,0.18),rgba(15,23,42,0.62))]" />
        <div className="absolute inset-y-0 right-[-12%] hidden w-[44rem] max-w-none pointer-events-none lg:block">
          <div className="hero-sheen absolute inset-y-[18%] right-[8%] w-[68%] rounded-full bg-gradient-to-l from-cyan-300/16 via-blue-400/10 to-transparent blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,17,32,0.96)_0%,rgba(11,17,32,0.9)_44%,rgba(11,17,32,0.72)_100%)]" />

        {/* ── Animated grid lines ── */}
        <svg className="absolute inset-0 w-full h-full hero-grid pointer-events-none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gridFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[16,32,48,64,80].map(p => (
            <line key={`v${p}`} x1={`${p}%`} y1="0" x2={`${p}%`} y2="100%" stroke="url(#gridFade)" strokeWidth=".5" />
          ))}
          {[20,40,60,80].map(p => (
            <line key={`h${p}`} x1="0" y1={`${p}%`} x2="100%" y2={`${p}%`} stroke="#3b82f6" strokeWidth=".5" opacity=".04" />
          ))}
        </svg>

        {/* ── Accent bar (left) ── */}
        <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 w-1 h-40 rounded-full bg-gradient-to-b from-blue-500 to-cyan-400 hero-accent-bar hidden md:block" />

        {/* ── Orbiting rings (right side) ── */}
        <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[360px] h-[360px] hidden lg:block">
          <div className="absolute inset-0 rounded-full border border-blue-500/10 hero-ring" />
          <div className="absolute inset-[50px] rounded-full border border-cyan-400/10 hero-ring-2" />
          <div className="absolute inset-[100px] rounded-full bg-blue-500/[0.03] hero-ring-3" />

          {/* Orbiting dots */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="hero-orbit-1"><div className="w-3 h-3 rounded-full bg-cyan-400/60 shadow-[0_0_12px_rgba(6,182,212,.5)]" /></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="hero-orbit-2"><div className="w-2 h-2 rounded-full bg-blue-400/50 shadow-[0_0_8px_rgba(59,130,246,.4)]" /></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="hero-orbit-3"><div className="w-2 h-2 rounded-full bg-blue-300/40 shadow-[0_0_6px_rgba(147,197,253,.4)]" /></div>
          </div>
        </div>

        {/* ── Floating network nodes ── */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <div className="hero-node   absolute top-[18%] left-[12%] w-2 h-2 rounded-full bg-cyan-400/40 shadow-[0_0_10px_rgba(6,182,212,.3)]" />
          <div className="hero-node-2 absolute top-[72%] left-[22%] w-1.5 h-1.5 rounded-full bg-blue-400/30 shadow-[0_0_8px_rgba(59,130,246,.3)]" />
          <div className="hero-node-3 absolute top-[30%] right-[38%] w-2.5 h-2.5 rounded-full bg-blue-300/20 shadow-[0_0_14px_rgba(147,197,253,.25)]" />
          <div className="hero-node-4 absolute bottom-[25%] right-[28%] w-2 h-2 rounded-full bg-cyan-300/25 shadow-[0_0_10px_rgba(103,232,249,.25)]" />
          {/* Connecting lines */}
          <svg className="absolute inset-0 w-full h-full" style={{opacity:.06}}>
            <line x1="12%" y1="18%" x2="38%" y2="30%" stroke="#06b6d4" strokeWidth="1"/>
            <line x1="22%" y1="72%" x2="62%" y2="30%" stroke="#3b82f6" strokeWidth="1"/>
            <line x1="62%" y1="30%" x2="72%" y2="75%" stroke="#93c5fd" strokeWidth="1"/>
          </svg>
        </div>

        {/* ── Large ambient blurs ── */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-600/[0.07] rounded-full blur-[100px] animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-cyan-500/[0.06] rounded-full blur-[80px] animate-pulse delay-1000" />

        {/* ── Content ── */}
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 py-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)]">

          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 text-blue-200 px-5 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm animate-in zoom-in-50 delay-300">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              Mozilla Democracy & AI Incubator
            </div>

            <h1 className="mb-6 text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.05] animate-in slide-in-from-left-4 delay-500">
              <span className="text-white">Civic Voice</span>{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">AI</span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 mb-12 leading-relaxed animate-in slide-in-from-right-4 delay-700 lg:mx-0">
              AI-assisted civic participation platform{" "}
              <span className="text-cyan-300 font-semibold">transforming citizen input into actionable policy proposals</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in zoom-in-95 delay-1000 lg:justify-start">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-[0_4px_24px_rgba(59,130,246,.35)] hover:shadow-[0_6px_32px_rgba(59,130,246,.5)] transition-all duration-300 transform hover:scale-105 font-semibold text-base px-8">
                <Link to="/dashboard">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Explore Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" asChild className="border border-cyan-300/30 bg-white/[0.06] text-white shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:border-cyan-300/70 hover:bg-cyan-400/18 hover:text-white hover:shadow-[0_10px_30px_rgba(34,211,238,0.22)] font-semibold text-base px-8">
                <a href="https://tally.so/r/Y5OA8q" target="_blank" rel="noopener noreferrer">
                  <Users className="mr-2 h-5 w-5" />
                  Submit Citizen Input
                  <Zap className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="mt-16 flex items-center justify-center gap-6 text-xs text-slate-500 tracking-wider uppercase animate-in fade-in delay-[1200ms] lg:justify-start">
              <span>Common Praxis</span>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <span>Open Source</span>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <span>Participatory AI</span>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-cyan-400/12 via-blue-500/10 to-transparent blur-2xl" />
            <div className="hero-artwork relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_24px_80px_rgba(2,6,23,0.45)] backdrop-blur-md">
              <div className="rounded-[1.5rem] border border-white/10 bg-[#09111f]/85 p-2">
                <img
                  src={heroArtworkUrl}
                  alt="Civic Voice AI artwork"
                  className="block w-full rounded-[1.1rem] opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Rest of page uses light theme ── */}
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">

      {/* What It Does */}
      <section className="relative border-y border-slate-200/80 bg-white/92 py-20 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_0_rgba(148,163,184,0.08)] dark:border-slate-700/70 dark:bg-slate-950/58">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              What This System Does
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              This AI-powered civic participation pipeline transforms raw citizen input into structured,
              accountable policy proposals. It takes workshop submissions or survey responses, normalizes them
              into civic data, retrieves relevant planning context, generates multiple solution types,
              applies ethical governance review, scores impact, and creates citizen-facing explanations.
            </p>
          </div>

          {/* How to Access */}
          <Card className="mb-12 shadow-2xl border border-slate-200/70 bg-gradient-to-r from-white to-blue-50 dark:border-slate-700/70 dark:from-slate-800 dark:to-slate-700 hover:shadow-3xl transition-all duration-500 animate-in slide-in-from-left-4 delay-300">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center text-2xl">
                <Webhook className="mr-3 h-6 w-6 text-blue-600" />
                How to Access & Test the System
              </CardTitle>
              <CardDescription className="text-base">
                Multiple entry points for citizen participation and system testing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-8">
                <a href="https://tally.so/r/Y5OA8q" target="_blank" rel="noopener noreferrer" className="group/card block space-y-4 p-6 rounded-xl bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 hover:shadow-lg hover:border-green-400 dark:hover:border-green-600 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <h4 className="font-semibold flex items-center text-lg group-hover/card:text-green-600 transition-colors">
                    <Users className="mr-3 h-5 w-5 text-green-600" />
                    Citizen Participation
                    <ArrowRight className="ml-auto h-4 w-4 text-green-500 opacity-0 -translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-300" />
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    Submit real citizen input through our Tally form. This triggers the full AI pipeline
                    and generates proposals that appear in the dashboard.
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-green-600 group-hover/card:underline">
                    Open Tally Form
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </a>
                <Link to="/process" className="group/card block space-y-4 p-6 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800 hover:shadow-lg hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <h4 className="font-semibold flex items-center text-lg group-hover/card:text-purple-600 transition-colors">
                    <Database className="mr-3 h-5 w-5 text-purple-600" />
                    Webhook Integration
                    <ArrowRight className="ml-auto h-4 w-4 text-purple-500 opacity-0 -translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-300" />
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    The system accepts webhook payloads from external forms or workshops.
                    Configure your form to POST to the n8n webhook endpoint.
                  </p>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      Production Ready
                    </Badge>
                    <span className="inline-flex items-center text-sm font-medium text-purple-600 group-hover/card:underline">
                      View Process
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
                <a href="https://github.com/espaifacto-code/civic-voice-ai" target="_blank" rel="noopener noreferrer" className="group/card block space-y-4 p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/40 dark:to-slate-700/40 border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <h4 className="font-semibold flex items-center text-lg group-hover/card:text-slate-900 dark:group-hover/card:text-white transition-colors">
                    <Globe className="mr-3 h-5 w-5 text-slate-700 dark:text-slate-300" />
                    GitHub Repository
                    <ArrowRight className="ml-auto h-4 w-4 text-slate-500 opacity-0 -translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-300" />
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    Explore the source code, contribute, or fork the project. Fully open-source under
                    the civic AI initiative.
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 group-hover/card:underline">
                    View on GitHub
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="relative border-y border-blue-200/70 bg-gradient-to-r from-slate-200 via-sky-100 to-blue-200 py-20 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-1px_0_rgba(148,163,184,0.12)] dark:border-slate-700/60 dark:from-slate-900 dark:via-slate-800 dark:to-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-blue-900 dark:from-white dark:to-blue-300 bg-clip-text text-transparent">
              End-to-End Architecture
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Seven-stage AI pipeline designed for democratic accountability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Webhook, title: "1. Intake & Consent", desc: "Captures citizen input via Tally forms or webhooks. Validates consent before processing.", color: "from-blue-500 to-cyan-500" },
              { icon: FileText, title: "2. Normalization", desc: "Converts messy form responses into structured civic profiles with issues, priorities, community assets.", color: "from-green-500 to-emerald-500" },
              { icon: Database, title: "3. Context Retrieval", desc: "Queries vector database of planning documents and policy frameworks to ground proposals.", color: "from-purple-500 to-violet-500" },
              { icon: Lightbulb, title: "4. Proposal Generation", desc: "Creates multiple solution types and generates detailed proposal packages.", color: "from-yellow-500 to-orange-500" },
              { icon: Shield, title: "5. Ethical Review", desc: "AI governance layer checks for bias, exclusion, accessibility issues, and social fairness.", color: "from-red-500 to-pink-500" },
              { icon: BarChart3, title: "6. Impact Scoring", desc: "Evaluates proposals across equity, sustainability, feasibility, and community support.", color: "from-indigo-500 to-blue-500" }
            ].map((item, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/60 bg-white/88 dark:border-slate-700/60 dark:bg-slate-800/82 backdrop-blur-sm animate-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}

            <Card className="md:col-span-2 lg:col-span-3 group hover:shadow-2xl transition-all duration-500 border border-blue-200/60 bg-gradient-to-r from-blue-50 to-indigo-50 dark:border-slate-700/60 dark:from-blue-900/20 dark:to-indigo-900/20 animate-in slide-in-from-bottom-4 delay-700">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  7. Storage & Transparency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Stores results in Supabase for dashboard display. Creates citizen-facing explanations
                  and supports public oversight, audits, and comparative analysis.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dashboard Features */}
      <section className="relative border-y border-slate-200/80 bg-white py-20 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_0_rgba(148,163,184,0.08)] dark:border-slate-700/70 dark:bg-slate-950/64">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Dashboard & Explorer
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Public transparency interface for civic AI outputs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-200/60 bg-gradient-to-br from-blue-50 to-indigo-50 dark:border-slate-700/60 dark:from-blue-900/20 dark:to-indigo-900/20 animate-in slide-in-from-left-4 delay-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <BarChart3 className="mr-3 h-6 w-6" />
                  Participatory Civic AI Dashboard
                </CardTitle>
                <CardDescription className="text-base">
                  Real-time metrics and analytics from citizen participation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Total citizen submissions and approval rates</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Average social impact and feasibility scores</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Civic issues frequency analysis</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Ethical governance overview charts</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Impact radar charts across key dimensions</li>
                </ul>
                <Button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300" asChild>
                  <Link to="/dashboard">View Dashboard</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-purple-200/60 bg-gradient-to-br from-purple-50 to-pink-50 dark:border-slate-700/60 dark:from-purple-900/20 dark:to-pink-900/20 animate-in slide-in-from-right-4 delay-500">
              <CardHeader>
                <CardTitle className="flex items-center text-xl group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  <Globe className="mr-3 h-6 w-6" />
                  Proposal Explorer
                </CardTitle>
                <CardDescription className="text-base">
                  Detailed inspection of generated civic proposals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Individual proposal details and metadata</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Ethical review outcomes and revision history</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Impact scores and citizen explanations</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Technical context and retrieved documents</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Stakeholder analysis and implementation steps</li>
                </ul>
                <Button className="mt-6 w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all duration-300" variant="outline" asChild>
                  <Link to="/explorer">Explore Proposals</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mozilla Alignment */}
      <section className="relative border-y border-indigo-200/70 bg-gradient-to-r from-indigo-100 via-white to-cyan-100 py-20 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-1px_0_rgba(129,140,248,0.08)] dark:border-slate-700/60 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-900 to-purple-900 dark:from-indigo-200 dark:to-purple-200 bg-clip-text text-transparent animate-in fade-in">
            Mozilla Democracy & AI Alignment
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            This system embodies Mozilla's principles of participatory, accountable,
            transparent, and socially grounded AI.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Citizen-Centered", desc: "Begins with real participation, not institutional data", color: "from-blue-500 to-blue-600" },
              { icon: Lightbulb, title: "Plural Solutions", desc: "Generates multiple pathways instead of single answers", color: "from-yellow-500 to-orange-500" },
              { icon: Shield, title: "Ethical Governance", desc: "Built-in AI accountability and bias detection", color: "from-red-500 to-red-600" },
              { icon: BarChart3, title: "Public Transparency", desc: "All outputs auditable and explainable", color: "from-green-500 to-green-600" }
            ].map((item, index) => (
              <div key={index} className="group rounded-2xl border border-white/70 bg-white/88 p-6 shadow-lg transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl dark:border-slate-700/60 dark:bg-slate-800/80 animate-in zoom-in-95" style={{ animationDelay: `${index * 200}ms` }}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="mb-3 text-lg font-medium">Prototype built for Mozilla Democracy & AI Incubator</p>
          <p className="text-slate-300">Open-source civic participation infrastructure</p>
          <div className="mt-6 flex justify-center space-x-6">
            <div className="flex items-center text-sm text-slate-400">
              <Sparkles className="h-4 w-4 mr-2" />
              Powered by AI for Democracy
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Index;
