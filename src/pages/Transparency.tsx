import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Database, FileText, Shield, Users, Zap, Eye, Code, ExternalLink } from "lucide-react";

export default function Transparency() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container py-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            AI Transparency & Methodology
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Complete technical transparency about how the Participatory Civic AI system works,
            what data it collects, and how it ensures accountability.
          </p>
        </div>

        {/* What Input Is Collected */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              What Input Is Collected
            </CardTitle>
            <CardDescription>
              Citizen participation data and consent mechanisms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Citizen Input Fields:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Issue description and location</li>
                <li>Community priorities and values</li>
                <li>Affected groups and stakeholders</li>
                <li>Desired solution types</li>
                <li>Ethical principles and red lines</li>
                <li>Community assets and resources</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Consent Mechanism:</h4>
              <p className="text-sm text-muted-foreground">
                Explicit consent checkbox required before any processing begins.
                No AI pipeline runs without affirmative consent.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* How Consent Works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              How Consent Works
            </CardTitle>
            <CardDescription>
              People-first data governance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Consent Gate:</h4>
                <p className="text-sm text-muted-foreground">
                  Processing only begins after explicit consent. The system validates
                  consent before any AI steps run.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Data Minimization:</h4>
                <p className="text-sm text-muted-foreground">
                  Only collects what's necessary for civic proposal generation.
                  No unnecessary personal data collection.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Retrieval Layer */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              What the Retrieval Layer Does
            </CardTitle>
            <CardDescription>
              Grounding AI outputs in real policy and planning knowledge
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              The system uses Retrieval-Augmented Generation (RAG) to ground proposals
              in verified civic and planning documents, preventing hallucinated outputs.
            </p>
            <div>
              <h4 className="font-semibold mb-2">Process:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Convert citizen input into targeted search queries</li>
                <li>Search vector database of policy/planning documents</li>
                <li>Retrieve relevant excerpts and context</li>
                <li>Merge retrieved knowledge with citizen priorities</li>
                <li>Use combined context for proposal generation</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Current Models & Portability */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Current Models & Architectural Portability
            </CardTitle>
            <CardDescription>
              AI models used and how the system can be adapted
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Currently Used:</h4>
              <p className="text-sm text-muted-foreground mb-2">
                OpenAI GPT models for rapid prototyping and development.
              </p>
              <Badge variant="secondary">OpenAI GPT-4</Badge>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-2">Architecturally Portable:</h4>
              <p className="text-sm text-muted-foreground mb-2">
                The system is designed to be model-agnostic. All AI steps can be swapped
                to open-weight or local models through the same interfaces.
              </p>
              <div className="space-y-2">
                <div>
                  <Badge variant="outline" className="mr-2">Local LLMs</Badge>
                  <span className="text-xs text-muted-foreground">via Ollama or vLLM</span>
                </div>
                <div>
                  <Badge variant="outline" className="mr-2">Open Embeddings</Badge>
                  <span className="text-xs text-muted-foreground">sentence-transformers, etc.</span>
                </div>
                <div>
                  <Badge variant="outline" className="mr-2">Self-hosted Vector DB</Badge>
                  <span className="text-xs text-muted-foreground">Pinecone, Weaviate, etc.</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ethical Review Process */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              What the Ethical Review Checks
            </CardTitle>
            <CardDescription>
              Governance safeguards before publication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              A dedicated AI governance layer evaluates proposals for potential harms
              before they are published or stored.
            </p>
            <div>
              <h4 className="font-semibold mb-2">Review Criteria:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Bias and exclusion against vulnerable groups</li>
                <li>Accessibility barriers and implementation gaps</li>
                <li>Weak sustainability or environmental concerns</li>
                <li>Unrealistic implementation claims</li>
                <li>Social fairness and equity issues</li>
                <li>Governance risks and accountability gaps</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Outcome:</h4>
              <p className="text-sm text-muted-foreground">
                Proposals are either approved, flagged for revision, or rejected with
                detailed feedback for improvement.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Storage */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              What Data Is Stored in Supabase
            </CardTitle>
            <CardDescription>
              Transparent data persistence for auditability
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Stored Data:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Normalized citizen input (anonymized)</li>
                <li>Generated proposal packages</li>
                <li>Ethical review results and feedback</li>
                <li>Impact scoring evaluations</li>
                <li>Civic explanations and metadata</li>
                <li>Approval status and timestamps</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Privacy & Access:</h4>
              <p className="text-sm text-muted-foreground">
                Data is stored for public transparency and democratic accountability.
                All records are accessible through the public dashboard.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Source Documents */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Policy and Planning Sources for Context Retrieval
            </CardTitle>
            <CardDescription>
              Documents that ground AI proposals in real civic knowledge
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              The RAG system retrieves from these verified civic and planning documents
              to ensure proposals are grounded in real institutional knowledge.
            </p>
            <div className="space-y-2">
              {[
                "Barcelona Housing Plan 2016–2025",
                "Geography Fieldwork – Urban/Location methods PDF",
                "MPGM Gràcia / heritage-planning memory",
                "Urban Green Justice Toolkit",
                "Urban Planning for City Leaders",
                "Guide to Planning Healthy Cities",
                "Open Data for Smart City and Urban Development",
                "EU report on Open Data in Cities"
              ].map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span className="text-sm">{doc}</span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reproduction Instructions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              How to Reproduce the Workflow
            </CardTitle>
            <CardDescription>
              Technical setup for replication and adaptation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Prerequisites:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>n8n instance (cloud or self-hosted)</li>
                <li>Supabase project with vector extensions</li>
                <li>OpenAI API key (or alternative LLM provider)</li>
                <li>Tally form for citizen input collection</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Setup Steps:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Import the n8n workflow from <code>/n8n/</code> directory</li>
                <li>Configure Supabase connection and vector store</li>
                <li>Ingest policy documents into the knowledge base</li>
                <li>Set up Tally webhook integration</li>
                <li>Configure AI model endpoints</li>
                <li>Deploy the React dashboard</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Adaptation:</h4>
              <p className="text-sm text-muted-foreground">
                The workflow can be adapted for different neighborhoods, cities, or policy domains
                by updating the knowledge base documents and adjusting the civic profile schema.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-10 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
          <p>
            This transparency documentation ensures the Participatory Civic AI system
            remains accountable, reproducible, and aligned with democratic values.
          </p>
          <p className="mt-2">
            <strong>Human oversight remains essential:</strong> This system augments
            participation but does not replace democratic deliberation.
          </p>
        </div>
      </div>
    </main>
  );
}