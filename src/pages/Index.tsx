// Update this page (the content is just a fallback if you fail to update the page)

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Database, Shield, Users, BarChart3, Webhook, FileText, CheckCircle, Lightbulb, Sparkles, Zap, Globe } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center py-20 px-4 min-h-screen">
        <div className="text-center max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg animate-in zoom-in-50 delay-300">
            <Sparkles className="h-4 w-4" />
            Mozilla Democracy & AI Incubator
          </div>

          <h1 className="mb-6 text-6xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent animate-in slide-in-from-left-4 delay-500">
            Civic Voice AI
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed animate-in slide-in-from-right-4 delay-700">
            AI-assisted civic participation platform<br />
            <span className="text-blue-600 dark:text-blue-400 font-semibold">transforming citizen input into actionable policy proposals</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in zoom-in-95 delay-1000">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <Link to="/dashboard">
                <BarChart3 className="mr-2 h-5 w-5" />
                Explore Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button variant="outline" size="lg" asChild className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <a href="https://tally.so/r/Y5OA8q" target="_blank" rel="noopener noreferrer">
                <Users className="mr-2 h-5 w-5" />
                Submit Citizen Input
                <Zap className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="mt-10 animate-in fade-in delay-[1200ms]">
            <img
              src="/civic-voice-ai/og-image.svg"
              alt="Participatory Civic AI preview"
              className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200/70 shadow-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* What It Does */}
      <section className="relative py-20 px-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
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
          <Card className="mb-12 shadow-2xl border-0 bg-gradient-to-r from-white to-blue-50 dark:from-slate-800 dark:to-slate-700 hover:shadow-3xl transition-all duration-500 animate-in slide-in-from-left-4 delay-300">
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
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4 p-6 rounded-xl bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300">
                  <h4 className="font-semibold flex items-center text-lg">
                    <Users className="mr-3 h-5 w-5 text-green-600" />
                    Citizen Participation
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    Submit real citizen input through our Tally form. This triggers the full AI pipeline
                    and generates proposals that appear in the dashboard.
                  </p>
                  <Button variant="outline" size="sm" asChild className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300">
                    <a href="https://tally.so/r/Y5OA8q" target="_blank" rel="noopener noreferrer">
                      Open Tally Form
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
                <div className="space-y-4 p-6 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300">
                  <h4 className="font-semibold flex items-center text-lg">
                    <Database className="mr-3 h-5 w-5 text-purple-600" />
                    Webhook Integration
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    The system accepts webhook payloads from external forms or workshops.
                    Configure your form to POST to the n8n webhook endpoint.
                  </p>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    Production Ready
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-slate-100 to-blue-50 dark:from-slate-800 dark:to-slate-900">
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
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm animate-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 100}ms` }}>
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

            <Card className="md:col-span-2 lg:col-span-3 group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 animate-in slide-in-from-bottom-4 delay-700">
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
      <section className="relative py-20 px-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
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
            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 animate-in slide-in-from-left-4 delay-300">
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

            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 animate-in slide-in-from-right-4 delay-500">
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
      <section className="relative py-20 px-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
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
              <div key={index} className="group p-6 bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-in zoom-in-95" style={{ animationDelay: `${index * 200}ms` }}>
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
  );
};

export default Index;
