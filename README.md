# Participatory Civic AI Pipeline

AI-assisted civic participation platform that transforms citizen input into ethically reviewed policy proposals with public transparency.

## What It Does

This system takes raw citizen feedback from surveys, workshops, or forms and transforms it into:
- **Structured civic proposals** grounded in policy and planning knowledge
- **Ethical governance review** to prevent bias and exclusion
- **Impact evaluation** across equity, sustainability, and feasibility
- **Public transparency** through accessible dashboards and explanations

## End-to-End Process Flow

```
Citizen Input → Consent Verification → Data Normalization → Civic Profile
     ↓
Build Query → Retrieve Policy Context → Citizen + Policy Context
     ↓
Generate Solution Types → Generate Civic Proposals
     ↓
Ethical Review → Approval Gate → Revision Loop (if issues)
     ↓
Impact Scoring → Civic Explanation → Dashboard Record → Supabase → Public Transparency Dashboard
```

## Architecture Overview

n8n flow ---> https://github.com/espaifacto-code/civic-voice-ai/blob/main/common-praxis-civic-ai-n8n-workflow.json

### 1. Participation Layer
**Purpose:** Capture and validate citizen input with consent awareness
- **Citizen Input:** Raw responses from Tally forms, workshops, or webhooks
- **Consent Verification:** Ensures processing permission before AI pipeline begins
- **Data Normalization:** Converts messy form answers into structured civic variables
- **Civic Profile:** Builds comprehensive profile of issue, priorities, and community context


### 2. Grounding Layer
**Purpose:** Connect citizen concerns with relevant policy and planning knowledge
- **Build Query:** Converts civic profile into targeted retrieval query
- **Retrieve Policy Context:** Searches knowledge base for planning documents and regulations
- **Citizen + Policy Context:** Merges participatory input with institutional knowledge

### 3. Generation Layer
**Purpose:** Create diverse, context-grounded civic proposals
- **Generate Solution Types:** Produces multiple intervention categories (policy, community, infrastructure, education)
- **Generate Civic Proposals:** Creates structured proposals with implementation steps and stakeholders

### 4. Governance Layer
**Purpose:** Ethical oversight and accountability safeguards
- **Ethical Review:** Evaluates proposals for bias, exclusion, accessibility, and governance risks
- **Approval Gate:** Decides whether proposals proceed or need revision
- **Revision Loop:** Iteratively improves proposals based on reviewer feedback

### 5. Transparency Layer
**Purpose:** Public explainability and democratic accountability
- **Impact Scoring:** Evaluates proposals across equity, sustainability, feasibility, and community support
- **Civic Explanation:** Translates technical outputs into citizen-readable language
- **Dashboard Record:** Packages all data for public presentation
- **Supabase:** Stores civic records for auditability and reuse
- **Public Transparency Dashboard:** Displays proposals, reviews, and impact data

## Key Features

- ✅ **Consent-aware:** Explicit permission checks before processing
- ✅ **RAG-grounded:** Proposals based on retrieved policy documents, not model hallucination
- ✅ **Plurality-preserving:** Generates multiple solution types instead of single answers
- ✅ **Ethically reviewed:** Dedicated governance layer prevents harmful outputs
- ✅ **Publicly explainable:** All decisions and outputs are transparent and auditable

## Technology Stack

- **Frontend:** React + TypeScript + Tailwind CSS + Shadcn/ui
- **Backend:** n8n workflow automation
- **AI:** OpenAI GPT models with retrieval-augmented generation
- **Database:** Supabase (vector storage + PostgreSQL)
- **Deployment:** GitHub Pages

## Access Points

### For Citizens
- **Submit Input:** [Tally Form](https://tally.so/r/Y5OA8q) - Direct participation entry point
- **View Results:** Public dashboard shows all approved proposals and their evaluations

### For Developers/Reviewers
- **Dashboard:** `/dashboard` - Real-time metrics and analytics
- **Proposal Explorer:** `/explorer` - Detailed proposal inspection
- **Process Flow:** `/process` - Interactive architecture diagram with tooltips

## Mozilla Alignment

This system demonstrates responsible AI for democratic participation by:
- Starting with citizen input rather than institutional assumptions
- Preserving plurality through diverse solution generation
- Grounding outputs in verifiable policy documents
- Including ethical review before public presentation
- Supporting transparency through public dashboards
- Enabling iterative improvement through revision loops

## Limitations & Risks

- Ethical review is AI-assisted, not a final authority
- Impact scores are heuristic estimates, not empirical data
- System effectiveness depends on knowledge base quality
- Long-term legitimacy requires human oversight loops
- Demonstrates augmentation, not autonomous decision-making

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Route components (Dashboard, Explorer, ProcessDiagram)
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
├── types/              # TypeScript type definitions
└── integrations/       # External service integrations (Supabase)
```

## Contributing

This is a Mozilla Democracy & AI Incubator project. Contributions welcome for:
- Knowledge base expansion
- Ethical review improvements
- UI/UX enhancements
- Additional evaluation metrics
- Integration testing

## License

MIT License - see LICENSE file for details.

7. Transparency Layer
- Plain-language civic explanation
- Dashboard record
- Public dashboard / proposal explorer

## Tech Stack

- **Frontend:** React + TypeScript + Vite
- **UI:** Tailwind CSS + Shadcn/ui components
- **Backend:** n8n workflow automation
- **AI:** OpenAI GPT with RAG
- **Database:** Supabase (vector + relational)
- **Deployment:** GitHub Pages

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/espaifacto-code/civic-voice-ai.git
cd civic-voice-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

## Usage

### For Citizens
1. **Submit Input:** Use the [Tally form](https://tally.so/r/Y5OA8q) to provide civic feedback
2. **View Results:** Check the public dashboard for generated proposals

### For Reviewers
- **Dashboard:** Overview of all submissions and metrics
- **Explorer:** Detailed proposal inspection
- **Process Flow:** Interactive diagram of the AI pipeline

## API Integration

The system accepts webhook payloads from external forms:

```json
{
  "citizen_input": "Raw form response",
  "consent_given": true,
  "issue_area": "Housing",
  "priority_values": ["Equity", "Sustainability"]
}
```

## Architecture Details

### Data Flow
1. **Input Validation:** Consent checking and data sanitization
2. **Normalization:** Convert to structured civic schema
3. **Retrieval:** Query policy knowledge base
4. **Generation:** Create diverse proposal types
5. **Review:** Ethical governance evaluation
6. **Scoring:** Impact assessment
7. **Storage:** Public database with audit trail

### Key Components
- **ProcessDiagram:** Interactive flow visualization with tooltips
- **Dashboard:** Real-time metrics and proposal summaries
- **Explorer:** Detailed proposal inspection interface
- **Supabase Integration:** Vector search and relational storage

## Mozilla Context

This project aligns with Mozilla's Democracy & AI initiative by demonstrating:
- **Participatory AI:** Citizen input drives the process
- **Responsible AI:** Ethical review and consent requirements
- **Transparent AI:** Public explainability and auditability
- **Pluralistic AI:** Multiple solution pathways instead of single answers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.


