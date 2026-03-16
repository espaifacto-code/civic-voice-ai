// Update this page (the content is just a fallback if you fail to update the page)

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Database, Shield, Users, BarChart3, Webhook, FileText, CheckCircle, Lightbulb } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 py-16 px-4">
        <div className="text-center max-w-4xl">
          <h1 className="mb-6 text-5xl font-bold tracking-tight">Civic Voice AI</h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            AI-assisted civic participation platform<br />
            transforming citizen input into actionable policy proposals
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/dashboard">
                <BarChart3 className="mr-2 h-4 w-4" />
                Explore Dashboard
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://tally.so/r/mD5N8Q" target="_blank" rel="noopener noreferrer">
                <Users className="mr-2 h-4 w-4" />
                Submit Citizen Input
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* What It Does */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What This System Does</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              This AI-powered civic participation pipeline transforms raw citizen input into structured,
              accountable policy proposals. It takes workshop submissions or survey responses, normalizes them
              into civic data, retrieves relevant planning context, generates multiple solution types,
              applies ethical governance review, scores impact, and creates citizen-facing explanations.
            </p>
          </div>

          {/* How to Access */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Webhook className="mr-2 h-5 w-5" />
                How to Access & Test the System
              </CardTitle>
              <CardDescription>
                Multiple entry points for citizen participation and system testing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    Citizen Participation
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Submit real citizen input through our Tally form. This triggers the full AI pipeline
                    and generates proposals that appear in the dashboard.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://tally.so/r/mD5N8Q" target="_blank" rel="noopener noreferrer">
                      Open Tally Form
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center">
                    <Database className="mr-2 h-4 w-4" />
                    Webhook Integration
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    The system accepts webhook payloads from external forms or workshops.
                    Configure your form to POST to the n8n webhook endpoint.
                  </p>
                  <Badge variant="secondary">Production Ready</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">End-to-End Architecture</h2>
            <p className="text-lg text-muted-foreground">
              Seven-stage AI pipeline designed for democratic accountability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Webhook className="mr-2 h-4 w-4" />
                  1. Intake & Consent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Captures citizen input via Tally forms or webhooks. Validates consent before processing.
                  Supports both live participation and test data injection.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  2. Normalization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Converts messy form responses into structured civic profiles with issues, priorities,
                  community assets, and ethical principles.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Database className="mr-2 h-4 w-4" />
                  3. Context Retrieval
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Queries vector database of planning documents and policy frameworks to ground
                  proposals in technical reality.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  4. Proposal Generation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Creates multiple solution types (policy, infrastructure, community programs)
                  and generates detailed proposal packages.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  5. Ethical Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  AI governance layer checks for bias, exclusion, accessibility issues,
                  and social fairness risks. Triggers revision if needed.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  6. Impact Scoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Evaluates proposals across equity, sustainability, feasibility,
                  and community support dimensions.
                </p>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  7. Storage & Transparency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Stores results in Supabase for dashboard display. Creates citizen-facing explanations
                  and supports public oversight, audits, and comparative analysis.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dashboard Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Dashboard & Explorer</h2>
            <p className="text-lg text-muted-foreground">
              Public transparency interface for civic AI outputs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Participatory Civic AI Dashboard</CardTitle>
                <CardDescription>
                  Real-time metrics and analytics from citizen participation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Total citizen submissions and approval rates</li>
                  <li>• Average social impact and feasibility scores</li>
                  <li>• Civic issues frequency analysis</li>
                  <li>• Ethical governance overview charts</li>
                  <li>• Impact radar charts across key dimensions</li>
                </ul>
                <Button className="mt-4" asChild>
                  <Link to="/dashboard">View Dashboard</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Proposal Explorer</CardTitle>
                <CardDescription>
                  Detailed inspection of generated civic proposals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Individual proposal details and metadata</li>
                  <li>• Ethical review outcomes and revision history</li>
                  <li>• Impact scores and citizen explanations</li>
                  <li>• Technical context and retrieved documents</li>
                  <li>• Stakeholder analysis and implementation steps</li>
                </ul>
                <Button className="mt-4" variant="outline" asChild>
                  <Link to="/explorer">Explore Proposals</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mozilla Alignment */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Mozilla Democracy & AI Alignment</h2>
          <p className="text-lg text-muted-foreground mb-8">
            This system embodies Mozilla's principles of participatory, accountable,
            transparent, and socially grounded AI.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="bg-background p-4 rounded-lg">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <strong>Citizen-Centered</strong>
              <p className="mt-1">Begins with real participation, not institutional data</p>
            </div>
            <div className="bg-background p-4 rounded-lg">
              <Lightbulb className="h-8 w-8 mx-auto mb-2 text-primary" />
              <strong>Plural Solutions</strong>
              <p className="mt-1">Generates multiple pathways instead of single answers</p>
            </div>
            <div className="bg-background p-4 rounded-lg">
              <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
              <strong>Ethical Governance</strong>
              <p className="mt-1">Built-in AI accountability and bias detection</p>
            </div>
            <div className="bg-background p-4 rounded-lg">
              <BarChart3 className="h-8 w-8 mx-auto mb-2 text-primary" />
              <strong>Public Transparency</strong>
              <p className="mt-1">All outputs auditable and explainable</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-sm text-muted-foreground border-t">
        <p className="mb-2">Prototype built for Mozilla Democracy & AI Incubator</p>
        <p>Open-source civic participation infrastructure</p>
      </footer>
    </div>
  );
};

export default Index;
