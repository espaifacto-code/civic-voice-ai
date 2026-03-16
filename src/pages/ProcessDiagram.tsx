import { ArrowRight, RotateCcw } from "lucide-react";

const lanes = [
  {
    label: "Participation",
    color: "bg-blue-50 border-blue-200",
    headerBg: "bg-blue-500",
    dotColor: "bg-blue-500",
    steps: ["Citizen Input", "Consent Check", "Data Normalization", "Civic Profile"],
  },
  {
    label: "Grounding",
    color: "bg-teal-50 border-teal-200",
    headerBg: "bg-teal-500",
    dotColor: "bg-teal-500",
    steps: ["Build Query", "Retrieve Policy Context", "Merge Context"],
  },
  {
    label: "Generation",
    color: "bg-purple-50 border-purple-200",
    headerBg: "bg-purple-500",
    dotColor: "bg-purple-500",
    steps: ["Generate Solution Types", "Generate Proposals"],
  },
  {
    label: "Governance",
    color: "bg-orange-50 border-orange-200",
    headerBg: "bg-orange-500",
    dotColor: "bg-orange-500",
    steps: ["Ethical Review", "Approval Gate", "Revision Loop"],
  },
  {
    label: "Transparency",
    color: "bg-emerald-50 border-emerald-200",
    headerBg: "bg-emerald-500",
    dotColor: "bg-emerald-500",
    steps: ["Impact Scoring", "Civic Explanation", "Dashboard Record", "Supabase", "Public Dashboard"],
  },
];

const badges = [
  { label: "Consent-aware", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { label: "RAG-grounded", color: "bg-teal-100 text-teal-700 border-teal-200" },
  { label: "Plurality-preserving", color: "bg-purple-100 text-purple-700 border-purple-200" },
  { label: "Ethically reviewed", color: "bg-orange-100 text-orange-700 border-orange-200" },
  { label: "Publicly explainable", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
];

export default function ProcessDiagram() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container py-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Civic AI Process Flow
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            How citizen input is transformed into AI-generated civic proposals with ethical oversight and impact evaluation.
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {badges.map((b) => (
            <span
              key={b.label}
              className={`inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-semibold ${b.color}`}
            >
              {b.label}
            </span>
          ))}
        </div>

        {/* Swimlane Diagram */}
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[900px] space-y-4">
            {lanes.map((lane, laneIdx) => (
              <div
                key={lane.label}
                className={`flex items-stretch rounded-xl border ${lane.color} overflow-hidden`}
              >
                {/* Lane Header */}
                <div
                  className={`flex items-center justify-center px-5 py-4 min-w-[140px] ${lane.headerBg} text-white`}
                >
                  <span className="text-sm font-bold tracking-wide whitespace-nowrap">
                    {lane.label}
                  </span>
                </div>

                {/* Steps */}
                <div className="flex items-center gap-2 px-5 py-4 flex-1">
                  {lane.steps.map((step, stepIdx) => {
                    const isApprovalGate =
                      lane.label === "Governance" && step === "Approval Gate";
                    const isRevisionLoop =
                      lane.label === "Governance" && step === "Revision Loop";

                    return (
                      <div key={step} className="flex items-center gap-2">
                        {/* Step Card */}
                        <div
                          className={`relative flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 shadow-sm transition-shadow hover:shadow-md ${
                            isRevisionLoop ? "ring-2 ring-orange-300" : ""
                          }`}
                        >
                          <div className={`h-2 w-2 rounded-full ${lane.dotColor} shrink-0`} />
                          <span className="text-sm font-medium text-foreground whitespace-nowrap">
                            {step}
                          </span>

                          {/* Revision loop arrow */}
                          {isRevisionLoop && (
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center gap-1 text-orange-500">
                              <RotateCcw className="h-3.5 w-3.5" />
                              <span className="text-[10px] font-semibold">Loop</span>
                            </div>
                          )}
                        </div>

                        {/* Arrow between steps (not after last in lane) */}
                        {stepIdx < lane.steps.length - 1 && (
                          <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Inter-lane Flow Arrow */}
          <div className="flex justify-center mt-6 min-w-[900px]">
            <div className="flex items-center gap-3 px-6 py-2 rounded-full border border-border bg-card shadow-sm">
              <span className="text-xs font-semibold text-blue-600">Participation</span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs font-semibold text-teal-600">Grounding</span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs font-semibold text-purple-600">Generation</span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs font-semibold text-orange-600">Governance</span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs font-semibold text-emerald-600">Transparency</span>
            </div>
          </div>
        </div>

        {/* Governance Loop Callout */}
        <div className="mt-8 mx-auto max-w-xl rounded-xl border border-orange-200 bg-orange-50 p-5">
          <div className="flex items-start gap-3">
            <RotateCcw className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-orange-800">Governance Loop</p>
              <p className="text-sm text-orange-700 mt-1">
                If the <strong>Approval Gate</strong> flags concerns, proposals enter a{" "}
                <strong>Revision Loop</strong> and are re-evaluated by{" "}
                <strong>Ethical Review</strong> until they meet governance standards.
              </p>
            </div>
          </div>
        </div>

        {/* Transparency Footer */}
        <div className="mt-10 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
          <p>
            This platform demonstrates responsible AI-assisted civic participation.
            Citizen input is translated into policy proposals using AI models combined
            with contextual knowledge. All proposals undergo ethical review and impact
            scoring before being presented.
          </p>
        </div>
      </div>
    </main>
  );
}
