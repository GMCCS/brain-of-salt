import { useState, useEffect, useRef, useCallback } from "react";

// ─── THEME ─────────────────────────────────────────────────────────────────
const LIGHT = {
  bg: "#ffffff", bgSecondary: "#f7f7f5", bgTertiary: "#f0efe9",
  border: "#e5e4de", borderStrong: "#c8c7c0",
  text: "#1a1a18", textSecondary: "#6b6b63", textMuted: "#9e9d96",
  accent: "#3d3df5", accentBg: "#f0f0fe",
  success: "#15803d", successBg: "#f0fdf4", successBorder: "#bbf7d0",
  warning: "#92400e", warningBg: "#fffbeb", warningBorder: "#fde68a",
  danger: "#991b1b", dangerBg: "#fef2f2", dangerBorder: "#fecaca",
  amber: "#b45309", amberBg: "#fffbeb",
  teal: "#0f766e", tealBg: "#f0fdfa",
  card: "#ffffff", overlay: "rgba(0,0,0,0.35)",
};
const DARK = {
  bg: "#0d0d0b", bgSecondary: "#141412", bgTertiary: "#1a1a17",
  border: "#2a2a26", borderStrong: "#3a3a35",
  text: "#f0efe8", textSecondary: "#a0a097", textMuted: "#6b6b63",
  accent: "#6366f1", accentBg: "#1e1e3f",
  success: "#4ade80", successBg: "#052e16", successBorder: "#14532d",
  warning: "#fbbf24", warningBg: "#1c1200", warningBorder: "#713f12",
  danger: "#f87171", dangerBg: "#1c0a0a", dangerBorder: "#7f1d1d",
  amber: "#fbbf24", amberBg: "#1c1200",
  teal: "#2dd4bf", tealBg: "#0a1f1e",
  card: "#141412", overlay: "rgba(0,0,0,0.6)",
};

// ─── MODULES ───────────────────────────────────────────────────────────────
const MODULES = [
  {
    id: 1, title: "Product Discovery in the AI Era", subtitle: "What to build — and why it matters", icon: "◌", tag: "DISCOVERY",
    lessons: [
      { id: "1a", title: "Why discovery fails in practice", type: "lesson", content: [
        { type: "intro", text: "Most product teams don't skip discovery. They do a performative version of it. They write a persona, run a survey, hold a kickoff meeting — and then build what they already decided to build. Discovery becomes a ritual that produces the answer you started with." },
        { type: "concept", label: "The real problem with discovery", text: "Discovery fails not because PMs are lazy — it's because the incentives point toward building. Speed is rewarded. Shipping is visible. Questioning whether to build at all is invisible, and sometimes career-limiting. So discovery gets compressed into something that looks thorough without being rigorous." },
        { type: "distinction", items: [
          { term: "Performative discovery", desc: "Surveys sent to existing users. Personas built from assumptions. Problems defined to match solutions already in mind. Feels productive, produces comfort." },
          { term: "Real discovery", desc: "Sitting with a problem long enough to understand it. Talking to people about their lives, not your feature. Being genuinely willing to find out you're wrong." },
          { term: "The AI era problem", desc: "When building is cheap and fast, the pressure to skip discovery intensifies. Anyone can ship in a weekend. The scarce resource is now judgment — not execution." },
        ]},
        { type: "callout", label: "The honest question", text: "Before any feature, any roadmap, any sprint — ask this: am I doing discovery to find out what's true, or to confirm what I already believe? The answer determines whether the work that follows is worth doing." },
      ]},
      { id: "1b", title: "Finding real signals", type: "lesson", content: [
        { type: "intro", text: "The first and hardest question in discovery is: why should this exist? Not 'why do we want to build it' — why does the world need it? Who will be genuinely better off? That question requires signals from reality, not from internal meetings." },
        { type: "concept", label: "What a real signal looks like", text: "A real signal is evidence from the world that a problem exists independently of your solution. Someone telling you they manually copy data between tools every day — that's a signal. Someone telling you your proposed feature sounds useful — that's not. One is behavior. The other is politeness." },
        { type: "distinction", items: [
          { term: "Weak signals", desc: "Survey responses. People saying they 'would use' something. Competitor features. Your own frustrations. These point in a direction but don't confirm a problem." },
          { term: "Strong signals", desc: "Observed workarounds. Money already being spent on an imperfect solution. Repeated unprompted complaints. Behavior that reveals pain without anyone naming it." },
          { term: "AI-era signals", desc: "Watch what people are prompting AI tools to do badly. Where AI fails repeatedly for real users — that's often where a real product opportunity lives." },
        ]},
        { type: "callout", label: "Signal hunting in practice", text: "The best discovery conversations don't start with your idea. They start with: 'Walk me through the last time you had to deal with X.' Then you listen. The problem reveals itself in the workarounds, the frustrations, the moments where they laugh awkwardly because the thing they describe is absurd." },
      ]},
      { id: "1c", title: "The curiosity toolkit", type: "lesson", content: [
        { type: "intro", text: "Discovery isn't a process. It's a posture. You can't follow steps to genuine curiosity — but you can build habits that make you better at observing, questioning, and sitting with uncertainty long enough to understand it." },
        { type: "concept", label: "What the toolkit is actually for", text: "The goal isn't to gather more data. It's to develop the ability to see what's actually there rather than what you expect to see. That requires specific practices: asking questions that don't lead, tolerating ambiguity without rushing to conclusions, and building enough context about a human's life to understand why a problem matters to them." },
        { type: "distinction", items: [
          { term: "Observation", desc: "Watch before you ask. See how people actually use tools, solve problems, move through their day. Behavior tells you more than interviews." },
          { term: "Non-leading questions", desc: "'What do you do when X happens?' not 'Would you use a tool that solved X?' The first surfaces reality. The second surfaces what people think you want to hear." },
          { term: "The 'worth it' question", desc: "For every opportunity: is this worth the time it will consume to build, maintain, and improve? Honest no's early are more valuable than enthusiastic yes's that collapse under scrutiny." },
        ]},
        { type: "callout", label: "The meta-insight", text: "This companion was built using exactly this process. The module you're reading now came from a real conversation about what PMs actually struggle with — not from a framework or a content calendar. Discovery produced the content. The content teaches discovery. That's the loop." },
      ]},
      { id: "1d", title: "Quiz: Signal vs noise", type: "quiz",
        question: "A PM is deciding whether to build an AI-powered feature that auto-categorizes support tickets. Which of the following is the strongest signal that this problem is worth solving?",
        options: [
          { id: "a", text: "A survey shows 78% of support managers say they'd find auto-categorization 'useful or very useful.'" },
          { id: "b", text: "Three support managers independently describe spending 2+ hours a day manually tagging tickets, and two of them have already built spreadsheet workarounds." },
          { id: "c", text: "A competitor launched a similar feature last quarter and got positive press coverage." },
          { id: "d", text: "The PM's head of support complained about ticket categorization in a leadership meeting last month." },
        ],
        correct: "b",
        explanation: "B is the strongest signal by a distance. It shows real behavior (time spent), real pain (2+ hours daily), and independent validation (three separate people describing the same problem unprompted). The spreadsheet workarounds are the clearest possible signal — people built their own solution because the pain was real enough to justify the effort. That's a product opportunity.",
        wrongExplanation: "Survey responses measure intent, not behavior — and people systematically overstate how useful things would be. Competitor features and leadership complaints are weak directional signals, not evidence of a solvable problem. The strongest signals are always behavioral: what are people already doing to work around the pain?",
      },
      { id: "1e", title: "Scenario: The discovery brief", type: "scenario",
        setup: "A PM at a 60-person B2B SaaS company has an idea: an AI feature that generates first-draft responses to customer support tickets. Their CEO thinks it's a great idea. Engineering says it's buildable. The PM has 2 weeks before the next planning cycle and needs to decide: do we put this on the roadmap?\n\nThey have not spoken to a single customer about it yet.",
        task: "Design their discovery sprint. What do they need to find out? Who do they talk to? What would make them say yes — and what would make them say no? Be specific.",
        placeholder: "I'd start by talking to 5-6 support reps directly — not managers — about their actual workflow today. I want to understand how they currently write responses, what slows them down, and whether the problem is response quality or response speed or something else entirely. I'd also check if there are already workarounds in place...",
        criteria: [
          { id: "users", label: "Talks to real users not proxies", check: (v) => v.toLowerCase().includes("support rep") || v.toLowerCase().includes("customer") || v.toLowerCase().includes("user") || v.toLowerCase().includes("agent") || v.toLowerCase().includes("talk to") || v.toLowerCase().includes("interview") },
          { id: "behavior", label: "Looks for behavioral signals", check: (v) => v.toLowerCase().includes("workaround") || v.toLowerCase().includes("currently") || v.toLowerCase().includes("how they") || v.toLowerCase().includes("observe") || v.toLowerCase().includes("watch") || v.toLowerCase().includes("behavior") || v.toLowerCase().includes("workflow") || v.toLowerCase().includes("today") },
          { id: "falsifiable", label: "Defines what a NO looks like", check: (v) => v.toLowerCase().includes("no") || v.toLowerCase().includes("wouldn't") || v.toLowerCase().includes("if they don't") || v.toLowerCase().includes("deal breaker") || v.toLowerCase().includes("stop") || v.toLowerCase().includes("false") || v.toLowerCase().includes("wrong") || v.toLowerCase().includes("not worth") },
          { id: "scope", label: "Questions the problem framing", check: (v) => v.toLowerCase().includes("actually") || v.toLowerCase().includes("real problem") || v.toLowerCase().includes("assume") || v.toLowerCase().includes("whether") || v.toLowerCase().includes("speed") || v.toLowerCase().includes("quality") || v.toLowerCase().includes("what problem") || v.toLowerCase().includes("right problem") },
        ],
      },
    ],
  },
  {
    id: 2, title: "AI Foundations", subtitle: "What every PM must know", icon: "⬡", tag: "CORE",
    lessons: [
      { id: "2a", title: "What is AI, really?", type: "lesson", content: [
        { type: "intro", text: "You've shipped features, written PRDs, and led roadmap reviews. But now stakeholders keep asking: 'Can we use AI for this?' Before you answer, you need a mental model that's actually useful — not the marketing version." },
        { type: "concept", label: "The PM's definition of AI", text: "AI is software that learns patterns from data to make predictions or decisions — without being explicitly programmed for each case. As a PM, what matters is: what problem does it solve, what data does it need, and what does failure look like?" },
        { type: "distinction", items: [
          { term: "Traditional software", desc: "Rules written by engineers. Predictable. Brittle at edge cases. You define every if/else." },
          { term: "ML / AI", desc: "Rules learned from data. Probabilistic. Degrades gracefully (sometimes). You define the objective." },
          { term: "Generative AI", desc: "A subset of ML that generates new content — text, images, code. Powered by large models trained on massive datasets." },
        ]},
        { type: "callout", label: "PM insight", text: "Your job with AI features is different. You're not specifying behavior — you're specifying outcomes, data, and constraints. The 'how' is learned, not written." },
      ]},
      { id: "2b", title: "Quiz: AI foundations", type: "quiz",
        question: "Your team wants to build a feature that flags 'suspicious' transactions in real time. A colleague says 'let's just use AI.' What's your FIRST question as a PM?",
        options: [
          { id: "a", text: "Which AI vendor has the best API pricing?" },
          { id: "b", text: "What does 'suspicious' mean, and do we have labeled examples of it?" },
          { id: "c", text: "How long will it take the ML team to train a model?" },
          { id: "d", text: "Can we demo this at the next all-hands?" },
        ],
        correct: "b",
        explanation: "Before any technical decision, you need a precise definition of the target outcome AND confirmation that labeled training data exists. Without 'suspicious' being well-defined, you can't train, evaluate, or ship anything useful.",
        wrongExplanation: "The PM's first job is defining the problem precisely. Without knowing what 'suspicious' means and whether you have labeled examples of it, all other questions are premature.",
      },
      { id: "2c", title: "Scenario: The AI pitch", type: "scenario",
        setup: "Your CTO walks into sprint planning: 'I want us to use LLMs to automate customer support.' You have 3 minutes to respond.",
        task: "Write your response. What do you ask? What do you flag? What's your immediate PM instinct?",
        placeholder: "I'd want to understand what specific support workflows we're targeting, what our current resolution rate is, and whether we have historical ticket data we can use. I'd also flag that LLMs can hallucinate, so we need a human-in-the-loop for edge cases...",
        criteria: [
          { id: "scope", label: "Defines scope", check: (v) => v.length > 80 && (v.toLowerCase().includes("which") || v.toLowerCase().includes("what") || v.toLowerCase().includes("specific") || v.toLowerCase().includes("scope") || v.toLowerCase().includes("workflow")) },
          { id: "data", label: "Mentions data", check: (v) => v.toLowerCase().includes("data") || v.toLowerCase().includes("ticket") || v.toLowerCase().includes("history") || v.toLowerCase().includes("example") },
          { id: "risk", label: "Flags a risk", check: (v) => v.toLowerCase().includes("risk") || v.toLowerCase().includes("wrong") || v.toLowerCase().includes("hallucin") || v.toLowerCase().includes("fail") || v.toLowerCase().includes("edge") },
          { id: "metric", label: "Success metric", check: (v) => v.toLowerCase().includes("metric") || v.toLowerCase().includes("measure") || v.toLowerCase().includes("rate") || v.toLowerCase().includes("success") || v.toLowerCase().includes("kpi") || v.toLowerCase().includes("resolution") },
        ],
      },
    ],
  },
  {
    id: 3, title: "Working with LLMs", subtitle: "Prompts, evals & limits", icon: "◉", tag: "TECHNICAL",
    lessons: [
      { id: "3a", title: "LLMs as a product primitive", type: "lesson", content: [
        { type: "intro", text: "Large Language Models aren't magic — they're a new kind of software primitive. Like a database or an API, they have specific behaviors, failure modes, and integration patterns. Your job is to design around them." },
        { type: "concept", label: "What LLMs actually do", text: "An LLM predicts the next token given a sequence of previous tokens. Everything else — reasoning, summarization, coding — is emergent behavior from doing this at scale on vast text. Great at pattern matching and interpolation. Poor at novel reasoning and precise facts." },
        { type: "distinction", items: [
          { term: "LLMs excel at", desc: "Summarization, reformatting, drafting, classification, translation, code generation in common languages." },
          { term: "LLMs struggle with", desc: "Math without tools, real-time information, citing sources accurately, consistent long-form structure." },
          { term: "LLM failure modes", desc: "Hallucination (confident wrong answers), sycophancy (agreeing with user errors), instruction drift in long contexts." },
        ]},
        { type: "callout", label: "PM design principle", text: "Design your UX around the failure modes, not just the happy path. If an LLM can hallucinate, your UI needs a graceful way to surface uncertainty or let users verify outputs." },
      ]},
      { id: "3b", title: "Quiz: Prompt design for PMs", type: "quiz",
        question: "You're building an AI feature that summarizes customer feedback. Users keep complaining the summaries miss important negative feedback. What's likely happening?",
        options: [
          { id: "a", text: "The model isn't powerful enough — upgrade to a larger model." },
          { id: "b", text: "Sycophancy bias — the model generates positive-leaning outputs. The prompt needs to explicitly request balanced coverage." },
          { id: "c", text: "The feedback dataset is too small." },
          { id: "d", text: "Users just don't understand AI limitations." },
        ],
        correct: "b",
        explanation: "RLHF-trained models often exhibit sycophancy — a tendency to produce positive, agreeable outputs because that's what human raters reward. The fix is prompt engineering: explicitly instruct the model to 'include negative feedback proportionally.' A bigger model won't fix a prompt problem.",
        wrongExplanation: "LLMs trained with human feedback learn to generate outputs humans rate highly — and humans often rate positive content higher. This creates a systematic bias toward positive outputs, fixable via prompting.",
      },
      { id: "3c", title: "Scenario: Designing an eval", type: "scenario",
        setup: "You're launching an AI writing assistant that helps sales reps draft cold emails. Before launch, your eng team asks: 'How do we know when it's good enough to ship?'",
        task: "Design the evaluation framework. What do you measure? How do you measure it? What's your ship threshold?",
        placeholder: "I'd design a 3-layer eval: automated metrics for basic quality, human eval for tone and accuracy, and A/B against the baseline...",
        criteria: [
          { id: "automated", label: "Automated eval", check: (v) => v.toLowerCase().includes("automat") || v.toLowerCase().includes("metric") || v.toLowerCase().includes("score") || v.toLowerCase().includes("benchmark") },
          { id: "human", label: "Human eval", check: (v) => v.toLowerCase().includes("human") || v.toLowerCase().includes("review") || v.toLowerCase().includes("rater") || v.toLowerCase().includes("annotation") },
          { id: "threshold", label: "Ship threshold", check: (v) => v.toLowerCase().includes("threshold") || v.toLowerCase().includes("minimum") || v.toLowerCase().includes("at least") || v.toLowerCase().includes("%") || v.toLowerCase().includes("baseline") || v.toLowerCase().includes("better than") },
          { id: "negative", label: "Failure/edge cases", check: (v) => v.toLowerCase().includes("fail") || v.toLowerCase().includes("edge") || v.toLowerCase().includes("wrong") || v.toLowerCase().includes("hallucin") || v.toLowerCase().includes("bad") || v.toLowerCase().includes("worst") },
        ],
      },
    ],
  },
  {
    id: 4, title: "Data & Model Thinking", subtitle: "The fuel behind intelligence", icon: "◆", tag: "DATA",
    lessons: [
      { id: "4a", title: "Data as product infrastructure", type: "lesson", content: [
        { type: "intro", text: "In traditional software, features are built on code. In AI products, features are built on data. The quality, coverage, and freshness of your data is as important as your engineering architecture." },
        { type: "concept", label: "The data flywheel", text: "The best AI products create data flywheels: more users → more data → better models → better product → more users. But this only works if you design data collection intentionally from day one. Retrofit is expensive." },
        { type: "distinction", items: [
          { term: "Training data", desc: "What the model learned from. Shapes its general capabilities and biases. Usually a one-time investment." },
          { term: "Fine-tuning data", desc: "Task-specific examples that align the model to your use case. Smaller dataset, high quality required." },
          { term: "Feedback data", desc: "User signals (thumbs up/down, edits, corrections) that enable continuous improvement. This is your flywheel." },
        ]},
        { type: "callout", label: "PM action", text: "Before your AI feature ships, ask: 'Where does our feedback data go? Who owns it? How does it flow back into model improvement?' If you don't know, you're building a dead end." },
      ]},
      { id: "4b", title: "Quiz: Bias & data quality", type: "quiz",
        question: "You're building a hiring tool trained on 5 years of your company's hiring data. A data scientist flags potential bias. What's the most important first step?",
        options: [
          { id: "a", text: "Add more data to dilute the bias." },
          { id: "b", text: "Audit the historical data to understand what patterns exist and whether they reflect desired outcomes." },
          { id: "c", text: "Use a pre-trained foundation model instead — it won't have company-specific bias." },
          { id: "d", text: "Add a disclaimer that the tool is 'AI-powered' so users understand it may make mistakes." },
        ],
        correct: "b",
        explanation: "Auditing historical data is the critical first step. Your training data encodes your company's past decisions — if those decisions were biased, the model will amplify them. Understanding what patterns exist lets you decide what to keep, remove, or counterweight.",
        wrongExplanation: "More data doesn't fix biased data — it amplifies it. Foundation models have their own biases. Disclaimers don't protect anyone. The only correct path is to understand what's in your historical data before training on it.",
      },
      { id: "4c", title: "Scenario: The cold start problem", type: "scenario",
        setup: "You're launching a new AI recommendation engine for a marketplace. Zero user interaction data — it's a new product. Your ML engineer says they can't build anything useful without data.",
        task: "Design a cold start strategy. How do you collect the data you need? What do you ship in the meantime?",
        placeholder: "For the cold start, I'd use a hybrid approach: start with rule-based recommendations using available metadata, while collecting behavioral data...",
        criteria: [
          { id: "interim", label: "Interim solution", check: (v) => v.toLowerCase().includes("rule") || v.toLowerCase().includes("manual") || v.toLowerCase().includes("curated") || v.toLowerCase().includes("metadata") || v.toLowerCase().includes("interim") || v.toLowerCase().includes("meantime") },
          { id: "collection", label: "Data collection strategy", check: (v) => v.toLowerCase().includes("collect") || v.toLowerCase().includes("track") || v.toLowerCase().includes("log") || v.toLowerCase().includes("signal") || v.toLowerCase().includes("behavior") || v.toLowerCase().includes("click") },
          { id: "transition", label: "Transition to ML", check: (v) => v.toLowerCase().includes("transition") || v.toLowerCase().includes("switch") || v.toLowerCase().includes("enough data") || v.toLowerCase().includes("threshold") || v.toLowerCase().includes("once we have") || v.toLowerCase().includes("phase") },
          { id: "ux", label: "User experience", check: (v) => v.toLowerCase().includes("user") || v.toLowerCase().includes("experience") || v.toLowerCase().includes("ux") || v.toLowerCase().includes("feel") || v.toLowerCase().includes("perceive") || v.toLowerCase().includes("onboard") },
        ],
      },
    ],
  },
  {
    id: 5, title: "AI Product Strategy", subtitle: "Building for uncertainty", icon: "◎", tag: "STRATEGY",
    lessons: [
      { id: "5a", title: "The AI product lifecycle", type: "lesson", content: [
        { type: "intro", text: "Traditional products ship features. AI products ship capabilities — and those capabilities drift, improve, or degrade over time based on data and model updates. This changes everything about how you plan." },
        { type: "concept", label: "The core difference", text: "In traditional PM, you write acceptance criteria and the feature either works or doesn't. In AI PM, you write evaluation criteria — and the feature works 'well enough' on a distribution of inputs. Shipping means choosing an acceptable error rate, not zero errors." },
        { type: "distinction", items: [
          { term: "Traditional PM", desc: "Ship → Done. Bugs are bugs. Regression tests are binary." },
          { term: "AI PM", desc: "Ship → Monitor → Retrain → Ship again. Behavior is probabilistic. Evaluation is ongoing." },
          { term: "Your new tools", desc: "Evals (test sets), A/B experiments on model variants, drift detection, feedback loops." },
        ]},
        { type: "callout", label: "Framework: The AI PM loop", text: "Define outcome → Collect data → Train/fine-tune → Evaluate → Ship → Monitor → Repeat. You're a product manager AND a feedback loop designer." },
      ]},
      { id: "5b", title: "Quiz: Build vs Buy vs Fine-tune", type: "quiz",
        question: "Your company wants AI-powered resume screening. You have 500 historical resumes with hiring decisions. What's the right approach?",
        options: [
          { id: "a", text: "Train a model from scratch — you need full control." },
          { id: "b", text: "Use a foundation model API with a good prompt — 500 examples is enough for few-shot." },
          { id: "c", text: "Fine-tune a foundation model — you have labeled data and a specific task." },
          { id: "d", text: "Use rules-based filtering — AI is overkill for resumes." },
        ],
        correct: "c",
        explanation: "500 labeled examples is a reasonable dataset for fine-tuning a foundation model. Training from scratch requires millions of examples. Fine-tuning aligns the model to your specific hiring criteria — pure prompting handles generic tasks but not nuanced preferences.",
        wrongExplanation: "Consider the data you have: 500 labeled examples is valuable but not enough to train from scratch. Fine-tuning is typically the sweet spot when you have task-specific labeled data in the hundreds-to-thousands range.",
      },
      { id: "5c", title: "Scenario: The roadmap dilemma", type: "scenario",
        setup: "You're a PM at a B2B SaaS company. Your CEO wants 'AI in the product by Q3' for the sales pitch. It's Q1. You have: a small eng team, no ML engineers, and an existing dataset of user actions.",
        task: "Draft your AI product strategy. What do you ship? What do you NOT ship? How do you sequence this?",
        placeholder: "Given our constraints, I'd focus on a high-value, low-risk AI feature first. With no ML engineers, we should use API-based models rather than training our own...",
        criteria: [
          { id: "constraint", label: "Acknowledges constraints", check: (v) => v.toLowerCase().includes("constraint") || v.toLowerCase().includes("no ml") || v.toLowerCase().includes("api") || v.toLowerCase().includes("small team") || v.toLowerCase().includes("resource") },
          { id: "sequence", label: "Proposes sequencing", check: (v) => v.toLowerCase().includes("first") || v.toLowerCase().includes("phase") || v.toLowerCase().includes("then") || v.toLowerCase().includes("q2") || v.toLowerCase().includes("start") || v.toLowerCase().includes("sequence") },
          { id: "scope", label: "Defines what NOT to build", check: (v) => v.toLowerCase().includes("not") || v.toLowerCase().includes("avoid") || v.toLowerCase().includes("scope") || v.toLowerCase().includes("defer") || v.toLowerCase().includes("won't") },
          { id: "metric", label: "Defines a success metric", check: (v) => v.toLowerCase().includes("metric") || v.toLowerCase().includes("measure") || v.toLowerCase().includes("success") || v.toLowerCase().includes("kpi") || v.toLowerCase().includes("track") },
        ],
      },
    ],
  },
  {
    id: 6, title: "Feature Discovery & Prioritization", subtitle: "Finding the right AI bets", icon: "◈", tag: "DISCOVERY",
    lessons: [
      { id: "6a", title: "How to spot real AI opportunities", type: "lesson", content: [
        { type: "intro", text: "Most 'AI feature' ideas fail because they start with the technology, not the problem. The best AI PMs develop a filter for when AI is the right tool — and when it's just hype dressed up as a roadmap item." },
        { type: "concept", label: "The AI opportunity filter", text: "A task is a good AI candidate if: (1) it's too complex for simple rules, (2) it improves with more data, (3) there's an acceptable error rate, and (4) the cost of failure is manageable. If all four are true, you have a real AI opportunity." },
        { type: "distinction", items: [
          { term: "High AI fit", desc: "Content classification, personalization, anomaly detection, predictions from historical patterns, natural language interfaces." },
          { term: "Low AI fit", desc: "Tasks requiring 100% precision (billing), actions with irreversible consequences (legal filings), problems with no data." },
          { term: "The 'Rule of 3' check", desc: "Could a smart intern do this with rules? If the intern needs 3+ complex exception lists, AI is worth exploring." },
        ]},
        { type: "callout", label: "Prioritization framework", text: "Score AI opportunities on: data availability (0–3), error tolerance (0–3), and value if correct (0–3). Features with scores ≥7 go to discovery. Below 5, revisit later." },
      ]},
      { id: "6b", title: "Quiz: AI opportunity scoring", type: "quiz",
        question: "You're evaluating three feature ideas. Which is the BEST candidate for an AI approach? (A) Auto-approve expense reports under $50. (B) Suggest next action for a sales rep based on deal history. (C) Send a confirmation email after signup.",
        options: [
          { id: "a", text: "A — expense approvals are high volume and rules-based." },
          { id: "b", text: "B — next-action suggestions improve with data and tolerate some error." },
          { id: "c", text: "C — email sending is frequent and benefits from automation." },
          { id: "d", text: "All three are equally good AI candidates." },
        ],
        correct: "b",
        explanation: "B is the best AI candidate. Next-action recommendations improve with more data (past deal outcomes), have an acceptable error rate (a wrong suggestion is low-cost), and create clear value (rep efficiency). A is better for deterministic rules. C is basic automation, not AI.",
        wrongExplanation: "Think through the AI opportunity filter: does it improve with more data? Is there an acceptable error rate? Feature A fits a rule perfectly. Feature C is basic automation. Only Feature B needs learned patterns from complex, variable data.",
      },
      { id: "6c", title: "Scenario: The AI backlog audit", type: "scenario",
        setup: "Your product has 12 'AI feature' requests on the backlog — from 'add AI search' to 'predict churn' to 'auto-generate reports.' Your VP asks you to cut it to the top 3 to pursue this quarter.",
        task: "Describe your prioritization process. What criteria do you use? How do you evaluate and compare these opportunities?",
        placeholder: "I'd run each backlog item through a scoring rubric: data availability, error tolerance, business value, and time-to-value. I'd also do a quick technical feasibility check with the ML team...",
        criteria: [
          { id: "criteria", label: "Scoring criteria", check: (v) => v.toLowerCase().includes("score") || v.toLowerCase().includes("criteria") || v.toLowerCase().includes("rubric") || v.toLowerCase().includes("matrix") || v.toLowerCase().includes("rank") },
          { id: "data", label: "Data availability", check: (v) => v.toLowerCase().includes("data") || v.toLowerCase().includes("available") || v.toLowerCase().includes("labeled") || v.toLowerCase().includes("existing") },
          { id: "value", label: "Business value", check: (v) => v.toLowerCase().includes("value") || v.toLowerCase().includes("revenue") || v.toLowerCase().includes("impact") || v.toLowerCase().includes("business") || v.toLowerCase().includes("roi") || v.toLowerCase().includes("outcome") },
          { id: "feasibility", label: "Technical feasibility", check: (v) => v.toLowerCase().includes("feasib") || v.toLowerCase().includes("eng") || v.toLowerCase().includes("ml team") || v.toLowerCase().includes("technical") || v.toLowerCase().includes("complexity") || v.toLowerCase().includes("effort") },
        ],
      },
    ],
  },
  {
    id: 7, title: "AI Ethics & Governance", subtitle: "Responsibility at scale", icon: "◐", tag: "ETHICS",
    lessons: [
      { id: "7a", title: "Why ethics is a PM problem", type: "lesson", content: [
        { type: "intro", text: "AI ethics isn't a compliance checkbox — it's a product risk vector. Biased models, opaque decisions, and privacy violations create real business and reputational risk. As a PM, you're on the hook for anticipating these before they ship." },
        { type: "concept", label: "The responsible AI PM framework", text: "For any AI feature, ask: Who is harmed if this fails? Whose data powers this? Can affected users understand or contest decisions? These aren't rhetorical questions — they're PRD requirements." },
        { type: "distinction", items: [
          { term: "Bias", desc: "Systematic errors that disadvantage specific groups. Often emerges from historical data reflecting past inequities." },
          { term: "Transparency", desc: "Can users understand why an AI made a decision? Increasingly a legal requirement in regulated industries." },
          { term: "Privacy", desc: "Whose data is used for training? Can users opt out? What's retained? GDPR/CCPA compliance is a PM responsibility." },
        ]},
        { type: "callout", label: "PM requirement", text: "Add an 'AI Risk' section to your PRD template. For every AI feature: document potential failure modes, affected user segments, and mitigation strategies. Make it a gate before engineering starts." },
      ]},
      { id: "7b", title: "Quiz: High-stakes AI decisions", type: "quiz",
        question: "Your AI loan approval system has a 94% accuracy rate overall, but performs 12% worse for applicants from certain zip codes. What's your call?",
        options: [
          { id: "a", text: "Ship it — 94% is excellent overall accuracy." },
          { id: "b", text: "Pause, investigate the disparity, and redesign the evaluation criteria before shipping." },
          { id: "c", text: "Add a human review layer only for flagged applications from those zip codes." },
          { id: "d", text: "Remove zip code from the feature set and retrain." },
        ],
        correct: "b",
        explanation: "This is aggregate accuracy hiding subgroup harm. In high-stakes lending, differential performance across demographic proxies (zip codes often correlate with race) is not just an ethics problem — it's a regulatory liability. Pausing to understand the source of the disparity is the only defensible choice.",
        wrongExplanation: "Aggregate accuracy metrics can hide serious subgroup disparities. In lending, differential outcomes correlated with protected-class proxies create regulatory risk (Fair Lending laws). The only responsible path is to investigate before shipping.",
      },
      { id: "7c", title: "Scenario: The governance framework", type: "scenario",
        setup: "You're the PM lead at a mid-size company. The CEO asks you to establish an 'AI governance process' before the company ships any more AI features. You have 2 weeks.",
        task: "Outline your governance framework. What stages does an AI feature go through? Who are the stakeholders? What are the gates?",
        placeholder: "I'd propose a 3-stage governance process: pre-build risk assessment, pre-launch eval review, and post-launch monitoring...",
        criteria: [
          { id: "stages", label: "Multiple stages", check: (v) => { const s = ["stage", "phase", "step", "layer", "review", "gate", "pre", "post", "during"]; return s.filter(k => v.toLowerCase().includes(k)).length >= 2; } },
          { id: "stakeholders", label: "Relevant stakeholders", check: (v) => v.toLowerCase().includes("legal") || v.toLowerCase().includes("ethic") || v.toLowerCase().includes("data") || v.toLowerCase().includes("eng") || v.toLowerCase().includes("executive") || v.toLowerCase().includes("privacy") || v.toLowerCase().includes("compliance") },
          { id: "gates", label: "Explicit gates", check: (v) => v.toLowerCase().includes("gate") || v.toLowerCase().includes("require") || v.toLowerCase().includes("must") || v.toLowerCase().includes("criteria") || v.toLowerCase().includes("threshold") || v.toLowerCase().includes("approve") || v.toLowerCase().includes("sign-off") },
          { id: "monitoring", label: "Post-launch monitoring", check: (v) => v.toLowerCase().includes("monitor") || v.toLowerCase().includes("post") || v.toLowerCase().includes("ongoing") || v.toLowerCase().includes("alert") || v.toLowerCase().includes("drift") },
        ],
      },
    ],
  },
  {
    id: 8, title: "Shipping & Monitoring AI", subtitle: "From launch to production health", icon: "◇", tag: "OPS",
    lessons: [
      { id: "8a", title: "AI deployment patterns", type: "lesson", content: [
        { type: "intro", text: "Shipping an AI feature is not a one-time event. Unlike traditional software, AI systems change after launch — models get updated, data distributions shift, and user behavior evolves. Deployment is the beginning of a feedback loop, not the end of a project." },
        { type: "concept", label: "Shadow mode and gradual rollout", text: "The safest AI deployment pattern is shadow mode: run the AI model in parallel with the existing system, log outputs, compare decisions, but don't expose results to users. Only after your shadow eval passes do you enable it for real traffic — starting with 5–10% and ramping." },
        { type: "distinction", items: [
          { term: "Shadow mode", desc: "AI runs silently alongside existing logic. No user impact. Great for validating accuracy before exposure." },
          { term: "Canary rollout", desc: "AI enabled for a small % of users. Real exposure, controlled blast radius. Requires monitoring from day 1." },
          { term: "Full rollout + fallback", desc: "AI is live for all users, but a rules-based fallback exists for failures. The safety net is an explicit product requirement." },
        ]},
        { type: "callout", label: "PM requirement: define failure modes before launch", text: "Before any AI feature goes live, document: what triggers a fallback? Who gets alerted? What does the user see when the model fails? These are product requirements, not engineering details." },
      ]},
      { id: "8b", title: "Quiz: Drift detection", type: "quiz",
        question: "Your AI-powered churn prediction model was 83% accurate at launch. Three months later, accuracy has dropped to 71%. No code changes were made. What's the most likely cause?",
        options: [
          { id: "a", text: "The model was never that good — 83% was overfitting on the validation set." },
          { id: "b", text: "Data drift — the distribution of real-world inputs has changed since the model was trained." },
          { id: "c", text: "A server-side bug is corrupting inference requests." },
          { id: "d", text: "The model needs more training data." },
        ],
        correct: "b",
        explanation: "Data drift is the most common cause of model degradation over time without code changes. User behavior, product features, and market conditions shift — but the model was trained on historical data that no longer reflects current reality. The fix is monitoring input distributions and scheduling periodic retraining.",
        wrongExplanation: "When model performance degrades gradually with no code changes, data drift is the primary suspect. The world changed, but the model's assumptions — encoded in training data — didn't. This is why monitoring isn't optional for AI products.",
      },
      { id: "8c", title: "Scenario: The production incident", type: "scenario",
        setup: "Your AI-powered content moderation system is live. On a Friday evening, you get a Slack alert: the model is flagging 40% of posts as violating policy — up from the normal 2%. No code changes were made.",
        task: "Write your incident response plan. What do you do in the first 30 minutes? Who do you involve? How do you communicate to stakeholders?",
        placeholder: "First 30 minutes: I'd enable the fallback system immediately to stop user impact, then pull the last 100 flagged posts to understand what's being misclassified...",
        criteria: [
          { id: "mitigation", label: "Immediate mitigation", check: (v) => v.toLowerCase().includes("fallback") || v.toLowerCase().includes("disable") || v.toLowerCase().includes("rollback") || v.toLowerCase().includes("stop") || v.toLowerCase().includes("revert") || v.toLowerCase().includes("pause") },
          { id: "diagnosis", label: "Root cause diagnosis", check: (v) => v.toLowerCase().includes("log") || v.toLowerCase().includes("investigate") || v.toLowerCase().includes("diagnos") || v.toLowerCase().includes("sample") || v.toLowerCase().includes("look at") || v.toLowerCase().includes("audit") || v.toLowerCase().includes("why") },
          { id: "stakeholders", label: "Right stakeholders", check: (v) => v.toLowerCase().includes("eng") || v.toLowerCase().includes("ml") || v.toLowerCase().includes("legal") || v.toLowerCase().includes("trust") || v.toLowerCase().includes("cto") || v.toLowerCase().includes("safety") || v.toLowerCase().includes("team") },
          { id: "comms", label: "Stakeholder comms", check: (v) => v.toLowerCase().includes("communicat") || v.toLowerCase().includes("stakeholder") || v.toLowerCase().includes("notify") || v.toLowerCase().includes("update") || v.toLowerCase().includes("status") || v.toLowerCase().includes("exec") },
        ],
      },
    ],
  },
  {
    id: 9, title: "Stakeholder Communication", subtitle: "Talking AI across the org", icon: "◑", tag: "LEADERSHIP",
    lessons: [
      { id: "9a", title: "Translating AI for every audience", type: "lesson", content: [
        { type: "intro", text: "One of the highest-leverage skills for an AI PM is translation. You're the bridge between engineers who think in model architectures and executives who think in quarterly revenue. Getting this wrong kills projects before they launch." },
        { type: "concept", label: "The audience-first principle", text: "Before any AI conversation, identify: what does this person care about? What's their technical fluency? What decision do they need to make? Then reverse-engineer your framing. Never lead with how the model works — lead with what it means for them." },
        { type: "distinction", items: [
          { term: "Executives", desc: "Frame around business outcomes, risks, and investment. 'This model will reduce churn by X% at a cost of Y.' Never discuss architecture." },
          { term: "Engineers", desc: "Be precise about requirements, constraints, and evaluation criteria. They need acceptance criteria, not vision statements." },
          { term: "Customers", desc: "Focus on value and control. Explain what the AI does for them, what it might get wrong, and how they can override it." },
        ]},
        { type: "callout", label: "The one-pager rule", text: "If you can't explain your AI feature in one page for a non-technical executive — with the problem, the solution, the confidence level, and the top risk — you don't understand it well enough to ship it." },
      ]},
      { id: "9b", title: "Quiz: Framing AI tradeoffs", type: "quiz",
        question: "Your CEO asks: 'How accurate is our new AI feature?' You know accuracy is 87% overall but 74% for a key user segment. What's the right response?",
        options: [
          { id: "a", text: "87% — that's the headline number and it's strong." },
          { id: "b", text: "It depends on what you mean by accurate. Overall it's 87%, but there's a segment where it drops to 74%, which we need to address before broad rollout." },
          { id: "c", text: "We're still evaluating — I'll have numbers next week." },
          { id: "d", text: "Accuracy isn't the right metric. Let me explain precision and recall." },
        ],
        correct: "b",
        explanation: "B gives the complete, honest picture while immediately flagging the strategic implication. Reporting only the headline number is misleading and will erode trust when the segment issue surfaces. Deflecting looks evasive. Leading with technical jargon without context loses the exec immediately.",
        wrongExplanation: "The best PM answer gives the honest data AND interprets the strategic implication. When aggregate accuracy hides subgroup weakness, that weakness IS the story — and it needs to be surfaced proactively.",
      },
      { id: "9c", title: "Scenario: The board presentation", type: "scenario",
        setup: "Your company is presenting its AI strategy to the board next month. You have 10 minutes. The board has 6 members: 2 technical, 4 non-technical. They need to approve a $2M investment to expand the AI team.",
        task: "Outline your 10-minute presentation. What's the narrative arc? What data do you present? How do you handle the technical/non-technical divide?",
        placeholder: "I'd structure it as: 3 minutes on market context and why AI now, 4 minutes on what we've built and early results, 2 minutes on the investment case, 1 minute on risk and mitigation...",
        criteria: [
          { id: "structure", label: "Clear narrative structure", check: (v) => v.toLowerCase().includes("minute") || v.toLowerCase().includes("section") || v.toLowerCase().includes("first") || v.toLowerCase().includes("then") || v.toLowerCase().includes("arc") },
          { id: "audience", label: "Addresses mixed audience", check: (v) => v.toLowerCase().includes("technical") || v.toLowerCase().includes("non-technical") || v.toLowerCase().includes("board") || v.toLowerCase().includes("audience") || v.toLowerCase().includes("both") || v.toLowerCase().includes("jargon") },
          { id: "evidence", label: "Grounds in evidence", check: (v) => v.toLowerCase().includes("data") || v.toLowerCase().includes("result") || v.toLowerCase().includes("metric") || v.toLowerCase().includes("evidence") || v.toLowerCase().includes("early") || v.toLowerCase().includes("number") },
          { id: "risk", label: "Addresses risk", check: (v) => v.toLowerCase().includes("risk") || v.toLowerCase().includes("mitigat") || v.toLowerCase().includes("challenge") || v.toLowerCase().includes("concern") || v.toLowerCase().includes("downside") },
        ],
      },
    ],
  },
];

// ─── API ───────────────────────────────────────────────────────────────────
const callClaude = async (messages, systemPrompt) => {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: systemPrompt, messages }),
  });
  const data = await res.json();
  return data.content?.[0]?.text || "Unable to get feedback right now.";
};


// ─── HOOKS ─────────────────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 640);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

// ─── COMPONENTS ────────────────────────────────────────────────────────────
function ProgressRing({ pct, size = 30, stroke = 2.5, color, bgColor }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={bgColor || "rgba(128,128,128,0.15)"} strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`} style={{ transition: "stroke-dashoffset 0.5s ease" }} />
      <text x={size/2} y={size/2+3.5} textAnchor="middle" fontSize="7.5" fontWeight="700" fill={color}>{Math.round(pct)}%</text>
    </svg>
  );
}

function XPBar({ xp, T }) {
  const pct = Math.min((xp / 700) * 100, 100);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 3, background: T.border, borderRadius: 2, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: T.accent, borderRadius: 2, transition: "width 0.6s ease" }} />
      </div>
      <span style={{ fontSize: 10.5, color: T.textMuted, minWidth: 52, fontVariantNumeric: "tabular-nums" }}>{xp} / 700 XP</span>
    </div>
  );
}

function LessonContent({ content, T, isMobile }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 16 : 20 }}>
      {content.map((block, i) => {
        if (block.type === "intro") return (
          <p key={i} style={{ fontSize: isMobile ? 15 : 15, lineHeight: 1.85, color: T.textSecondary, margin: 0, paddingLeft: 14, borderLeft: `2px solid ${T.accent}` }}>{block.text}</p>
        );
        if (block.type === "concept") return (
          <div key={i} style={{ background: T.accentBg, border: `1px solid ${T.border}`, borderRadius: 8, padding: isMobile ? "12px 14px" : "14px 16px" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: T.accent, marginBottom: 7, fontWeight: 700 }}>{block.label}</div>
            <p style={{ fontSize: isMobile ? 14 : 14, lineHeight: 1.8, color: T.text, margin: 0 }}>{block.text}</p>
          </div>
        );
        if (block.type === "distinction") return (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {block.items.map((item, j) => (
              <div key={j} style={{ background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 7, padding: "12px 14px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 3, height: 3, borderRadius: "50%", background: T.accent, flexShrink: 0, marginTop: 7 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.text, marginBottom: 3 }}>{item.term}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.65, color: T.textSecondary }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        );
        if (block.type === "callout") return (
          <div key={i} style={{ background: T.warningBg, border: `1px solid ${T.warningBorder}`, borderRadius: 7, padding: "12px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>💡</span>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: T.amber, marginBottom: 4, fontWeight: 700 }}>{block.label}</div>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: T.text, margin: 0 }}>{block.text}</p>
            </div>
          </div>
        );
        return null;
      })}
    </div>
  );
}

function QuizLesson({ lesson, onComplete, addXP, T, isMobile }) {
  const storageKey = `bos_quiz_${lesson.id}`;

  const [selected, setSelected] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey))?.selected ?? null; } catch { return null; }
  });
  const [submitted, setSubmitted] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey))?.submitted ?? false; } catch { return false; }
  });
  const isCorrect = selected === lesson.correct;

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
    addXP(isCorrect ? 30 : 10);
    try { localStorage.setItem(storageKey, JSON.stringify({ selected, submitted: true })); } catch {}
  };

  const handleSelect = (id) => {
    if (submitted) return;
    setSelected(id);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <p style={{ fontSize: isMobile ? 15 : 14.5, lineHeight: 1.8, color: T.text, margin: 0 }}>{lesson.question}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {lesson.options.map((opt) => {
          let bg = T.bgSecondary, border = `1px solid ${T.border}`, textColor = T.textSecondary;
          if (selected === opt.id && !submitted) { bg = T.accentBg; border = `1px solid ${T.accent}`; textColor = T.text; }
          if (submitted && opt.id === lesson.correct) { bg = T.successBg; border = `1px solid ${T.successBorder}`; textColor = T.success; }
          if (submitted && selected === opt.id && !isCorrect) { bg = T.dangerBg; border = `1px solid ${T.dangerBorder}`; textColor = T.danger; }
          return (
            <button key={opt.id} onClick={() => handleSelect(opt.id)}
              style={{ background: bg, border, borderRadius: 8, padding: isMobile ? "14px 14px" : "11px 13px", minHeight: 44, textAlign: "left", cursor: submitted ? "default" : "pointer", transition: "all 0.15s", display: "flex", gap: 10, alignItems: "flex-start", width: "100%" }}
              aria-label={`Option ${opt.id.toUpperCase()}: ${opt.text}`}>
              <span style={{ fontSize: 11, fontWeight: 800, color: submitted ? "inherit" : selected === opt.id ? T.accent : T.textMuted, minWidth: 14, marginTop: 2, flexShrink: 0 }}>{opt.id.toUpperCase()}</span>
              <span style={{ fontSize: isMobile ? 14 : 13.5, lineHeight: 1.65, color: textColor }}>{opt.text}</span>
            </button>
          );
        })}
      </div>
      {!submitted ? (
        <button onClick={handleSubmit} disabled={!selected}
          style={{ padding: isMobile ? "13px 20px" : "8px 20px", width: isMobile ? "100%" : "auto", alignSelf: isMobile ? "stretch" : "flex-start", background: selected ? T.accent : T.bgTertiary, border: `1px solid ${selected ? T.accent : T.border}`, borderRadius: 7, color: selected ? "#fff" : T.textMuted, fontSize: 13.5, fontWeight: 600, cursor: selected ? "pointer" : "default", transition: "all 0.15s", minHeight: 44 }}>
          Submit answer
        </button>
      ) : (
        <div style={{ background: isCorrect ? T.successBg : T.dangerBg, border: `1px solid ${isCorrect ? T.successBorder : T.dangerBorder}`, borderRadius: 8, padding: "14px 16px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: isCorrect ? T.success : T.danger, marginBottom: 7 }}>
            {isCorrect ? "✓ Correct — +30 XP" : "✗ Not quite — +10 XP for trying"}
          </div>
          <p style={{ fontSize: 13.5, lineHeight: 1.7, color: T.textSecondary, margin: "0 0 14px" }}>
            {isCorrect ? lesson.explanation : lesson.wrongExplanation}
          </p>
          <button onClick={onComplete}
            style={{ padding: isMobile ? "12px 20px" : "7px 18px", width: isMobile ? "100%" : "auto", background: T.accent, border: "none", borderRadius: 6, color: "#fff", fontSize: 13.5, fontWeight: 600, cursor: "pointer", minHeight: 44 }}>
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}

function ScenarioLesson({ lesson, onComplete, addXP, T, isMobile }) {
  const draftKey = `bos_draft_${lesson.id}`;
  const minLen = 60;

  const [answer, setAnswer] = useState(() => {
    try { return localStorage.getItem(draftKey) ?? ""; } catch { return ""; }
  });
  const [results, setResults] = useState(null);
  const [aiFeedback, setAiFeedback] = useState("");
  const [aiError, setAiError] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Debounce-save draft as user types
  useEffect(() => {
    if (submitted) return;
    const timer = setTimeout(() => {
      try { localStorage.setItem(draftKey, answer); } catch {}
    }, 500);
    return () => clearTimeout(timer);
  }, [answer, submitted, draftKey]);

  const fetchFeedback = async (ans, testResults) => {
    setAiError(false);
    setLoadingAI(true);
    try {
      const fb = await callClaude(
        [{ role: "user", content: `Scenario: ${lesson.setup}\n\nStudent answer:\n${ans}\n\nPassed: ${testResults.filter(t => t.passed).map(t => t.label).join(", ")}\nMissed: ${testResults.filter(t => !t.passed).map(t => t.label).join(", ")}` }],
        `You are an expert AI Product Manager coach with a background in UX, product design, and product discovery. You have two roles: (1) Give direct, practical coaching on the student's PM answer — acknowledge what's strong, flag what's weak, give one concrete next step. (2) If the student's answer touches on user-facing features, interfaces, or discovery methods, proactively flag the most important implication they should consider — whether that's a UX concern, a discovery gap, or an assumption that needs validating. Keep total response to 4–5 sentences. Direct and opinionated. No fluff. You're coaching senior PMs who are smart but new to AI and rigorous discovery.`
      );
      setAiFeedback(fb);
    } catch {
      setAiError(true);
    }
    setLoadingAI(false);
  };

  const handleSubmit = async () => {
    if (answer.trim().length < minLen) return;
    const testResults = lesson.criteria.map((c) => ({ ...c, passed: c.check(answer) }));
    setResults(testResults);
    setSubmitted(true);
    const passedCount = testResults.filter(t => t.passed).length;
    addXP(Math.round((passedCount / testResults.length) * 60));
    // Clear the draft now that it's submitted
    try { localStorage.removeItem(draftKey); } catch {}
    await fetchFeedback(answer, testResults);
  };

  const passedCount = results ? results.filter(r => r.passed).length : 0;
  const allPassed = results && passedCount === results.length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 7, padding: "12px 14px" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: T.textMuted, marginBottom: 5, fontWeight: 700 }}>Scenario</div>
        <p style={{ fontSize: isMobile ? 14 : 13.5, lineHeight: 1.8, color: T.textSecondary, margin: 0 }}>{lesson.setup}</p>
      </div>
      <div style={{ background: T.accentBg, border: `1px solid ${T.border}`, borderRadius: 7, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: T.accent, marginBottom: 4, fontWeight: 700 }}>Your task</div>
        <p style={{ fontSize: isMobile ? 14 : 13.5, lineHeight: 1.65, color: T.text, margin: 0 }}>{lesson.task}</p>
      </div>
      {results && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {results.map((r) => (
            <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", borderRadius: 20, background: r.passed ? T.successBg : T.dangerBg, border: `1px solid ${r.passed ? T.successBorder : T.dangerBorder}` }}>
              <span style={{ fontSize: 10, color: r.passed ? T.success : T.danger }}>{r.passed ? "✓" : "✗"}</span>
              <span style={{ fontSize: 12, color: r.passed ? T.success : T.danger, fontWeight: 600 }}>{r.label}</span>
            </div>
          ))}
        </div>
      )}
      <div>
        <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} disabled={submitted}
          placeholder={lesson.placeholder}
          aria-label="Your scenario answer"
          style={{ width: "100%", minHeight: isMobile ? 160 : 140, background: T.bg, border: `1px solid ${T.border}`, borderRadius: 7, padding: "12px 14px", color: T.text, fontSize: isMobile ? 15 : 13.5, lineHeight: 1.8, resize: "vertical", outline: "none", fontFamily: "inherit", boxSizing: "border-box", transition: "border-color 0.15s", WebkitAppearance: "none" }}
          onFocus={e => e.target.style.borderColor = T.accent}
          onBlur={e => e.target.style.borderColor = T.border}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
          <span style={{ fontSize: 11.5, color: answer.length < minLen ? T.danger : T.textMuted }}>
            {answer.length} chars {answer.length < minLen ? `(min ${minLen})` : "✓"}
            {answer.length > 0 && !submitted && <span style={{ color: T.textMuted, marginLeft: 6 }}>· draft saved</span>}
          </span>
          {!submitted && (
            <button onClick={handleSubmit} disabled={answer.trim().length < minLen}
              aria-label="Run tests and submit your answer"
              style={{ padding: isMobile ? "12px 18px" : "7px 18px", background: answer.trim().length >= minLen ? T.accent : T.bgTertiary, border: `1px solid ${answer.trim().length >= minLen ? T.accent : T.border}`, borderRadius: 6, color: answer.trim().length >= minLen ? "#fff" : T.textMuted, fontSize: 13, fontWeight: 600, cursor: answer.trim().length >= minLen ? "pointer" : "default", transition: "all 0.15s", minHeight: 44 }}>
              Run tests & submit
            </button>
          )}
        </div>
      </div>
      {submitted && (
        <div style={{ background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 8, padding: "14px 16px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: allPassed ? T.success : T.amber, marginBottom: 10 }}>
            {allPassed ? `✓ All ${results.length} tests passed — +60 XP` : `${passedCount} / ${results.length} tests passed — +${Math.round((passedCount / results.length) * 60)} XP`}
          </div>
          {loadingAI ? (
            <div style={{ display: "flex", alignItems: "center", gap: 7, color: T.textMuted, fontSize: 12 }}>
              <div style={{ width: 12, height: 12, border: `2px solid ${T.border}`, borderTopColor: T.accent, borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
              AI coach reviewing your answer...
            </div>
          ) : aiError ? (
            <div style={{ background: T.dangerBg, border: `1px solid ${T.dangerBorder}`, borderRadius: 7, padding: "12px 14px", display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 14, flexShrink: 0 }}>⚠️</span>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: T.danger, marginBottom: 4 }}>Couldn't reach the AI coach</div>
                <div style={{ fontSize: 12.5, color: T.textSecondary, lineHeight: 1.6, marginBottom: 10 }}>Your answer was saved and graded. Check your connection and try again, or continue without feedback.</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button onClick={() => fetchFeedback(answer, results)}
                    style={{ padding: "7px 16px", background: T.accent, border: "none", borderRadius: 6, color: "#fff", fontSize: 12.5, fontWeight: 600, cursor: "pointer", minHeight: 36 }}>
                    Try again
                  </button>
                  <button onClick={onComplete}
                    style={{ padding: "7px 16px", background: "none", border: `1px solid ${T.border}`, borderRadius: 6, color: T.textSecondary, fontSize: 12.5, fontWeight: 600, cursor: "pointer", minHeight: 36 }}>
                    Continue anyway →
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: T.accent, marginBottom: 6, fontWeight: 700 }}>AI Coach · UX Feedback</div>
              <p style={{ fontSize: isMobile ? 14 : 13, lineHeight: 1.8, color: T.textSecondary, margin: "0 0 14px" }}>{aiFeedback}</p>
              <button onClick={onComplete}
                style={{ padding: isMobile ? "12px 20px" : "7px 18px", width: isMobile ? "100%" : "auto", background: T.accent, border: "none", borderRadius: 6, color: "#fff", fontSize: 13.5, fontWeight: 600, cursor: "pointer", minHeight: 44 }}>
                Continue →
              </button>
            </>
          )}
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── DESIGN AGENT ──────────────────────────────────────────────────────────
function DesignAgent({ onClose, T, isMobile }) {
  const [messages, setMessages] = useState([{
    role: "assistant",
    content: "I'm your AI Design Expert — dual-mode.\n\n① UX critique for AI features (confidence signals, fallback states, trust design)\n\n② PM answer review (paste your scenario response and I'll coach you)\n\nWhat are you working on?"
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const resp = await callClaude(next.map(m => ({ role: m.role, content: m.content })),
        `You are a dual-role expert for product managers entering AI. ROLE 1 — AI Product UX Designer: Specialist in AI-native experiences — uncertainty design, confidence signaling, graceful degradation, human-in-the-loop flows. Give direct critique: cite specific design principles, name anti-patterns, give actionable next steps. ROLE 2 — AI PM Coach: When someone shares a scenario answer or PM reasoning, evaluate against best practices. Acknowledge what's strong, identify what's missing, give a concrete improvement. Detect mode from context, blend both when relevant. 4–5 sentences max. Direct and opinionated. No hedging.`
      );
      setMessages(prev => [...prev, { role: "assistant", content: resp }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection error. Try again." }]);
    }
    setLoading(false);
  };

  const panelStyle = isMobile
    ? { position: "fixed", inset: 0, background: T.card, display: "flex", flexDirection: "column", zIndex: 300 }
    : { position: "fixed", right: 20, bottom: 20, width: 352, height: 490, background: T.card, border: `1px solid ${T.borderStrong}`, borderRadius: 12, display: "flex", flexDirection: "column", zIndex: 200, boxShadow: "0 8px 40px rgba(0,0,0,0.15)" };

  return (
    <div style={panelStyle}>
      <div style={{ padding: isMobile ? "16px 16px" : "12px 14px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.accent }} />
          <div>
            <div style={{ fontSize: isMobile ? 14 : 12, fontWeight: 700, color: T.text }}>Your Companion</div>
            <div style={{ fontSize: 11, color: T.textMuted }}>UX critique · PM coaching</div>
          </div>
        </div>
        <button onClick={onClose} style={{ background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 6, color: T.textMuted, fontSize: 14, cursor: "pointer", padding: "6px 12px", lineHeight: 1, minHeight: 36 }}>
          {isMobile ? "← Back" : "×"}
        </button>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: isMobile ? "92%" : "88%", padding: "10px 13px", borderRadius: m.role === "user" ? "12px 12px 3px 12px" : "12px 12px 12px 3px", background: m.role === "user" ? T.accent : T.bgSecondary, border: `1px solid ${m.role === "user" ? T.accent : T.border}`, fontSize: isMobile ? 14 : 12.5, lineHeight: 1.65, color: m.role === "user" ? "#fff" : T.text, whiteSpace: "pre-line" }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 4, padding: "6px 10px" }}>
            {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: T.textMuted, animation: `blink 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: "10px 12px", borderTop: `1px solid ${T.border}`, display: "flex", gap: 8, flexShrink: 0 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="UX question or paste your scenario answer..."
          style={{ flex: 1, background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 7, padding: "10px 12px", color: T.text, fontSize: isMobile ? 15 : 12.5, outline: "none", fontFamily: "inherit", minHeight: 44 }} />
        <button onClick={send} disabled={!input.trim() || loading}
          style={{ padding: "10px 16px", background: input.trim() ? T.accent : T.bgTertiary, border: `1px solid ${input.trim() ? T.accent : T.border}`, borderRadius: 7, color: input.trim() ? "#fff" : T.textMuted, fontSize: 14, cursor: input.trim() ? "pointer" : "default", transition: "all 0.15s", minHeight: 44 }}>
          ↑
        </button>
      </div>
      <style>{`@keyframes blink { 0%, 100% { opacity: 0.25; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-2px); } }`}</style>
    </div>
  );
}

// ─── MODULE DRAWER (mobile) ─────────────────────────────────────────────────
function ModuleDrawer({ open, onClose, T, activeModuleId, activeLessonId, completed, xp, onSelectLesson, onReset }) {
  const totalLessons = MODULES.reduce((a, m) => a + m.lessons.length, 0);
  const completedCount = Object.keys(completed).length;
  const typeLabel = { lesson: "Read", quiz: "Quiz", scenario: "Lab" };
  const typeColor = (type, T) => type === "lesson" ? T.accent : type === "quiz" ? T.amber : T.teal;

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 150, backdropFilter: "blur(2px)" }} />
      )}
      {/* Drawer */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: "82vh", background: T.card, borderRadius: "16px 16px 0 0", zIndex: 160, display: "flex", flexDirection: "column", transform: open ? "translateY(0)" : "translateY(100%)", transition: "transform 0.3s cubic-bezier(0.32,0.72,0,1)", boxShadow: "0 -8px 40px rgba(0,0,0,0.15)" }}>
        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: T.border }} />
        </div>
        {/* Header */}
        <div style={{ padding: "8px 18px 14px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>
            <span style={{ color: T.textMuted }}>with a </span>
            <span style={{ color: T.accent }}>brain of salt</span>
          </div>
          <XPBar xp={xp} T={T} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
            <span style={{ fontSize: 10.5, color: T.textMuted }}>{completedCount}/{totalLessons} lessons</span>
            <span style={{ fontSize: 10.5, color: T.textMuted }}>{Math.round((completedCount / totalLessons) * 100)}% done</span>
          </div>
          {completedCount > 0 && (
            <button onClick={() => { onReset(); onClose(); }}
              style={{ marginTop: 8, width: "100%", padding: "7px 0", background: "none", border: `1px solid ${T.border}`, borderRadius: 6, color: T.textMuted, fontSize: 11, cursor: "pointer" }}>
              Reset progress
            </button>
          )}
        </div>
        {/* Module list */}
        <div style={{ flex: 1, overflow: "auto", padding: "10px 12px 24px" }}>
          {MODULES.map(mod => {
            const modDone = mod.lessons.filter(l => completed[l.id]).length;
            const isActive = mod.id === activeModuleId;
            const pct = Math.round((modDone / mod.lessons.length) * 100);
            return (
              <div key={mod.id} style={{ marginBottom: 6 }}>
                {/* Module header */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, background: isActive ? T.accentBg : "transparent", border: `1px solid ${isActive ? T.accent : "transparent"}` }}>
                  <ProgressRing pct={pct} color={isActive ? T.accent : T.textMuted} bgColor={T.border} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: isActive ? T.text : T.textSecondary, marginBottom: 1 }}>{mod.title}</div>
                    <div style={{ fontSize: 10, color: T.textMuted, letterSpacing: "0.06em" }}>{mod.tag} · {modDone}/{mod.lessons.length} done</div>
                  </div>
                </div>
                {/* Lessons */}
                <div style={{ marginLeft: 10, marginTop: 2, display: "flex", flexDirection: "column", gap: 1 }}>
                  {mod.lessons.map(lesson => {
                    const isCurrent = activeLessonId === lesson.id;
                    return (
                      <button key={lesson.id}
                        onClick={() => { onSelectLesson(mod.id, lesson.id); onClose(); }}
                        style={{ background: isCurrent ? T.bgTertiary : "transparent", border: "none", borderRadius: 6, padding: "9px 10px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, width: "100%", minHeight: 44 }}>
                        <span style={{ fontSize: 9, color: completed[lesson.id] ? T.success : isCurrent ? T.accent : T.textMuted, flexShrink: 0 }}>
                          {completed[lesson.id] ? "●" : isCurrent ? "◉" : "○"}
                        </span>
                        <span style={{ fontSize: 13, color: isCurrent ? T.text : T.textSecondary, flex: 1, lineHeight: 1.35 }}>{lesson.title}</span>
                        <span style={{ fontSize: 9.5, padding: "2px 6px", borderRadius: 3, background: T.bgTertiary, color: typeColor(lesson.type, T), fontWeight: 700, letterSpacing: "0.05em", flexShrink: 0 }}>{typeLabel[lesson.type]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ─── HOME PAGE ──────────────────────────────────────────────────────────────
function HomePage({ onStart, dark, setDark, T, isMobile }) {
  const totalLessons = MODULES.reduce((a, m) => a + m.lessons.length, 0);

  const S = {
    section: { maxWidth: 620, margin: "0 auto", padding: isMobile ? "52px 22px" : "80px 40px" },
    eyebrow: { fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.textMuted, marginBottom: 20 },
    divider: { borderTop: `1px solid ${T.border}` },
  };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: "'DM Sans','Instrument Sans','Segoe UI',system-ui,sans-serif", overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: T.bg, borderBottom: `1px solid ${T.border}`, padding: isMobile ? "13px 22px" : "13px 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          <span style={{ color: T.textMuted }}>with a </span>
          <span style={{ color: T.accent }}>brain of salt</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => setDark(!dark)}
            style={{ background: "none", border: `1px solid ${T.border}`, borderRadius: 6, padding: "5px 10px", cursor: "pointer", color: T.textMuted, fontSize: 13, lineHeight: 1 }}>
            {dark ? "☀" : "◑"}
          </button>
          <button onClick={onStart}
            style={{ padding: "7px 16px", background: T.accent, border: "none", borderRadius: 6, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
            Open companion →
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ ...S.section, paddingTop: isMobile ? 64 : 100, paddingBottom: isMobile ? 52 : 80 }}>

        {/* Eyebrow */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 12px", borderRadius: 20, border: `1px solid ${T.border}`, background: T.bgSecondary, marginBottom: 32 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.success, flexShrink: 0 }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: T.textSecondary }}>a thinking companion for product managers</span>
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: isMobile ? 36 : 52, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.028em", color: T.text, margin: "0 0 24px" }}>
          There's a gap between<br />
          seeing a problem and<br />
          <span style={{ color: T.accent }}>knowing what to do with it.</span>
        </h1>

        {/* Sub — single paragraph */}
        <p style={{ fontSize: isMobile ? 16 : 17, lineHeight: 1.85, color: T.textSecondary, margin: "0 0 40px", maxWidth: 520 }}>
          Not a course. Not a certification. A companion that thinks alongside you —
          through discovery, through decisions, through the messy middle of building
          something that matters.
        </p>

        {/* Single CTA */}
        <button onClick={onStart}
          style={{ padding: isMobile ? "15px 32px" : "13px 32px", background: T.accent, border: "none", borderRadius: 8, color: "#fff", fontSize: isMobile ? 16 : 15, fontWeight: 700, cursor: "pointer", minHeight: 50, letterSpacing: "0.01em" }}>
          Start thinking →
        </button>

      </section>

      <div style={S.divider} />

      {/* ── THE GAP ── */}
      <section id="the-gap" style={S.section}>
        <div style={S.eyebrow}>The problem it's solving</div>

        <p style={{ fontSize: isMobile ? 15 : 16, lineHeight: 1.9, color: T.text, margin: "0 0 20px", fontWeight: 500 }}>
          Product managers are busy. Genuinely busy. But most of that busyness is execution —
          sprints, stakeholders, roadmaps, reviews.
        </p>
        <p style={{ fontSize: isMobile ? 14.5 : 15, lineHeight: 1.9, color: T.textSecondary, margin: "0 0 20px" }}>
          The thinking that happens <em style={{ color: T.text, fontStyle: "normal", fontWeight: 600 }}>before</em> execution —
          why does this problem matter, who does it actually affect,
          is this the right thing to build at all — gets squeezed.
          Not because PMs don't care about it. Because there's rarely a space designed for it.
        </p>
        <p style={{ fontSize: isMobile ? 14.5 : 15, lineHeight: 1.9, color: T.textSecondary, margin: "0 0 40px" }}>
          AI makes this more urgent, not less. When building is cheap and fast,
          judgment about <em style={{ color: T.text, fontStyle: "normal", fontWeight: 600 }}>what to build</em> becomes the scarce resource.
          The PM who can think clearly about a problem before reaching for a solution
          is worth ten times the one who just executes quickly.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 1, borderTop: `1px solid ${T.border}` }}>
          {[
            {
              q: "Why do most discovery processes fail?",
              a: "Because they're designed to confirm decisions already made, not to find out what's actually true. This companion teaches the other kind.",
            },
            {
              q: "What does it mean to think in AI?",
              a: "Understanding what AI can and can't do well enough to make product decisions — not to write the code, but to own the outcome.",
            },
            {
              q: "What's a 'thinking companion' vs a course?",
              a: "A course ends. A companion grows with you. New problems, new scenarios, new thinking prompts — added as the field changes and as you do.",
            },
          ].map((item, i, arr) => (
            <div key={i} style={{ padding: "22px 0", borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 8 }}>{item.q}</div>
              <div style={{ fontSize: isMobile ? 13.5 : 14, lineHeight: 1.8, color: T.textSecondary }}>{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={S.divider} />

      {/* ── HOW IT WORKS ── */}
      <section style={S.section}>
        <div style={S.eyebrow}>How it works</div>

        <p style={{ fontSize: isMobile ? 14.5 : 15, lineHeight: 1.9, color: T.textSecondary, margin: "0 0 32px" }}>
          Every module pairs a concept with a real decision to practice.
          You don't read about discovery — you do discovery.
          You don't read about evaluating AI features — you evaluate one, then get coached on your thinking.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
          {[
            { label: "Read", icon: "◌", color: T.accent, bg: T.accentBg, desc: "Concepts written the way a senior PM would brief you — direct, specific, no textbook language." },
            { label: "Think", icon: "◎", color: T.amber, bg: T.warningBg, desc: "A scenario question with four options, each designed to reveal something about how you reason." },
            { label: "Do", icon: "◉", color: T.teal, bg: T.tealBg, desc: "An open-ended lab you write out. Graded against real criteria, then reviewed by an AI coach that reads what you actually said." },
          ].map((f, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "16px 18px", background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 9 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0 }}>
                <span style={{ fontSize: 16, color: f.color, lineHeight: 1 }}>{f.icon}</span>
                <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 6px", borderRadius: 3, background: f.bg, color: f.color, border: `1px solid ${T.border}` }}>{f.label}</span>
              </div>
              <span style={{ fontSize: isMobile ? 13.5 : 13.5, lineHeight: 1.75, color: T.textSecondary, paddingTop: 2 }}>{f.desc}</span>
            </div>
          ))}
        </div>

        {/* Design Expert */}
        <div style={{ padding: "20px 22px", background: T.accentBg, border: `1px solid ${T.border}`, borderRadius: 10, display: "flex", gap: 14, alignItems: "flex-start" }}>
          <span style={{ fontSize: 20, flexShrink: 0, lineHeight: 1, color: T.accent }}>◈</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.accent, marginBottom: 6 }}>Your companion — always in the room</div>
            <div style={{ fontSize: isMobile ? 13.5 : 13.5, lineHeight: 1.8, color: T.textSecondary }}>
              At any point, open your companion and describe what you're thinking about.
              A UX decision. A discovery problem. An answer you just wrote and aren't sure about.
              It'll push back, tell you what's strong, and flag what you're missing.
              Not a chatbot. A thinking partner.
            </div>
          </div>
        </div>
      </section>

      <div style={S.divider} />

      {/* ── THE JOURNEY ── */}
      <section style={S.section}>
        <div style={S.eyebrow}>The arc</div>

        <p style={{ fontSize: isMobile ? 14.5 : 15, lineHeight: 1.9, color: T.textSecondary, margin: "0 0 28px" }}>
          The companion follows the natural shape of product thinking —
          from the question that comes before everything else,
          to the moment you're defending a decision to a room full of people who need to trust you.
        </p>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {[
            { n: "01", icon: "◌", phase: "Discover", desc: "What's worth building — and how do you know? The discipline of genuine curiosity, behavioral signals, and being willing to find out you're wrong." },
            { n: "02", icon: "⬡", phase: "Think in AI", desc: "How AI actually works, where it breaks, and what changes about your job when the rules are learned instead of written." },
            { n: "03", icon: "◉", phase: "Speak the language", desc: "LLMs, prompts, evals, failure modes — the technical vocabulary you need to make real product decisions without becoming an engineer." },
            { n: "04", icon: "◆", phase: "Own the data", desc: "Models hallucinate. Data drifts. Bias hides in training sets. How you think about data determines what you can build responsibly." },
            { n: "05", icon: "◎", phase: "Decide", desc: "Build vs buy vs fine-tune. Sequencing under real constraints. Saying an intelligent no to the things that aren't the one thing." },
            { n: "06", icon: "◐", phase: "Build with integrity", desc: "Ethics and governance aren't compliance theater — they're product decisions that determine whether your AI feature is trusted or abandoned." },
            { n: "07", icon: "◇", phase: "Ship and watch", desc: "Deployment patterns, drift detection, incident response. What it means to be responsible for something that keeps changing after you ship it." },
            { n: "08", icon: "◑", phase: "Communicate", desc: "Translating AI tradeoffs for engineers, executives, and customers — each of whom needs something different from you." },
          ].map((step, i, arr) => (
            <div key={i} style={{ display: "flex", gap: 16, padding: "18px 0", borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none", alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0, minWidth: 32 }}>
                <span style={{ fontSize: 17, color: T.textMuted, lineHeight: 1 }}>{step.icon}</span>
                <span style={{ fontSize: 9, fontWeight: 800, color: T.textMuted, letterSpacing: "0.04em" }}>{step.n}</span>
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: T.text, marginBottom: 5 }}>{step.phase}</div>
                <div style={{ fontSize: isMobile ? 13.5 : 13.5, lineHeight: 1.8, color: T.textSecondary }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={S.divider} />

      {/* ── WHO IT'S FOR ── */}
      <section style={S.section}>
        <div style={S.eyebrow}>Who it's for</div>

        <p style={{ fontSize: isMobile ? 15 : 16, lineHeight: 1.9, color: T.text, margin: "0 0 28px", fontWeight: 500 }}>
          Product managers who care about the thinking, not just the doing.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            "You feel the pressure to 'add AI' and want to know how to think about it properly — not just react to it",
            "You're good at executing but want to get better at the earlier, harder question: what's actually worth building?",
            "You want to understand AI well enough to make real product decisions, not just nod in technical conversations",
            "You're building something yourself and need a thinking partner for the decisions nobody else is around to help with",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "14px 16px", background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 8 }}>
              <span style={{ color: T.success, fontSize: 13, flexShrink: 0, marginTop: 1 }}>✓</span>
              <span style={{ fontSize: isMobile ? 14 : 14, lineHeight: 1.75, color: T.textSecondary }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <div style={S.divider} />

      {/* ── MODULES LIST ── */}
      <section style={{ ...S.section, paddingBottom: isMobile ? 24 : 40 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20, gap: 12 }}>
          <div style={S.eyebrow}>What's inside</div>
          <span style={{ fontSize: 12, color: T.textMuted }}>{MODULES.length} modules · free</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {MODULES.map((mod, i) => {
            const iconColor = ["#6366f1","#3d3df5","#10b981","#f59e0b","#0ea5e9","#6366f1","#ec4899","#6b6b63","#0f766e"][i] || T.textMuted;
            return (
              <div key={mod.id}
                onClick={onStart}
                style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 8, cursor: "pointer", transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: T.bgTertiary, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 17, color: iconColor, lineHeight: 1 }}>{mod.icon}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: T.text, marginBottom: 1 }}>{mod.title}</div>
                  <div style={{ fontSize: 12, color: T.textSecondary }}>{mod.subtitle}</div>
                </div>
                <div style={{ fontSize: 11, color: T.textMuted, flexShrink: 0 }}>→</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section style={{ maxWidth: 620, margin: "0 auto", padding: isMobile ? "32px 22px 72px" : "48px 40px 96px" }}>
        <div style={{ background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 14, padding: isMobile ? "36px 24px" : "52px 52px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.textMuted, marginBottom: 16 }}>For the PM who can't stop thinking about problems</div>
          <h2 style={{ fontSize: isMobile ? 28 : 38, fontWeight: 800, letterSpacing: "-0.02em", color: T.text, margin: "0 0 18px", lineHeight: 1.15 }}>
            Start where you are.<br />
            Think further than you have.
          </h2>
          <p style={{ fontSize: isMobile ? 14.5 : 15, color: T.textSecondary, lineHeight: 1.8, margin: "0 0 32px", maxWidth: 400 }}>
            No prerequisites. No syllabus to finish.
            Just a companion — with a brain of salt — that meets you where you are
            and helps you think better about what to build next.
          </p>
          <button onClick={onStart}
            style={{ padding: isMobile ? "15px 32px" : "13px 36px", background: T.accent, border: "none", borderRadius: 8, color: "#fff", fontSize: isMobile ? 16 : 15, fontWeight: 700, cursor: "pointer", minHeight: 52, width: isMobile ? "100%" : "auto" }}>
            Open your companion →
          </button>
        </div>
      </section>

    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────
// ─── PERSISTENCE ───────────────────────────────────────────────────────────
const STORAGE_KEY = "bos_progress_v1";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage unavailable — fail silently
  }
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────
export default function App() {
  const saved = loadProgress();

  const [dark, setDark] = useState(() => saved?.dark ?? false);
  const [showIntro, setShowIntro] = useState(() => saved?.showIntro ?? true);
  const [activeModuleId, setActiveModuleId] = useState(() => saved?.activeModuleId ?? 1);
  const [activeLessonId, setActiveLessonId] = useState(() => saved?.activeLessonId ?? "1a");
  const [completed, setCompleted] = useState(() => saved?.completed ?? {});
  const [xp, setXP] = useState(() => saved?.xp ?? 0);
  const [showAgent, setShowAgent] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useIsMobile();
  const T = dark ? DARK : LIGHT;

  // Save whenever progress state changes
  useEffect(() => {
    saveProgress({ dark, showIntro, activeModuleId, activeLessonId, completed, xp });
  }, [dark, showIntro, activeModuleId, activeLessonId, completed, xp]);

  const addXP = useCallback((n) => setXP(p => p + n), []);

  const markComplete = useCallback((lessonId) => {
    setCompleted(prev => {
      if (prev[lessonId]) return prev;
      addXP(20);
      return { ...prev, [lessonId]: true };
    });
    const all = MODULES.flatMap(m => m.lessons);
    const idx = all.findIndex(l => l.id === lessonId);
    const next = all[idx + 1];
    if (next) {
      const nm = MODULES.find(m => m.lessons.some(l => l.id === next.id));
      setActiveModuleId(nm.id);
      setActiveLessonId(next.id);
    }
  }, [addXP]);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setCompleted({});
    setXP(0);
    setActiveModuleId(1);
    setActiveLessonId("1a");
    setShowIntro(true);
  }, []);

  if (showIntro) {
    return <HomePage onStart={() => setShowIntro(false)} dark={dark} setDark={setDark} T={T} isMobile={isMobile} />;
  }

  const activeModule = MODULES.find(m => m.id === activeModuleId);
  const activeLesson = activeModule?.lessons.find(l => l.id === activeLessonId);

  const handleSelectLesson = (moduleId, lessonId) => {
    setActiveModuleId(moduleId);
    setActiveLessonId(lessonId);
  };

  const totalLessons = MODULES.reduce((a, m) => a + m.lessons.length, 0);
  const completedCount = Object.keys(completed).length;
  const typeLabel = { lesson: "Read", quiz: "Quiz", scenario: "Lab" };
  const typeColor = (type) => type === "lesson" ? T.accent : type === "quiz" ? T.amber : T.teal;

  // Find prev/next lessons for mobile navigation
  const allLessons = MODULES.flatMap(m => m.lessons);
  const currentIdx = allLessons.findIndex(l => l.id === activeLessonId);
  const prevLesson = allLessons[currentIdx - 1];
  const nextLesson = allLessons[currentIdx + 1];

  return (
    <div style={{ display: "flex", height: "100vh", background: T.bg, color: T.text, fontFamily: "'DM Sans', 'Instrument Sans', 'Segoe UI', system-ui, sans-serif", overflow: "hidden", fontSize: 14, transition: "background 0.2s, color 0.2s" }}>

      {/* ── DESKTOP SIDEBAR ── */}
      {!isMobile && (
        <div style={{ width: sidebarOpen ? 262 : 0, minWidth: sidebarOpen ? 262 : 0, overflow: "hidden", transition: "all 0.25s ease", display: "flex", flexDirection: "column", background: T.bgSecondary, borderRight: `1px solid ${T.border}`, flexShrink: 0 }}>
          <div style={{ padding: "18px 16px 14px", borderBottom: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 1 }}>
              <span style={{ color: T.textMuted }}>with a </span>
              <span style={{ color: T.accent }}>brain of salt</span>
            </div>
            <div style={{ fontSize: 10, color: T.textMuted, marginBottom: 14 }}>A companion for product thinkers</div>
            <XPBar xp={xp} T={T} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
              <span style={{ fontSize: 10, color: T.textMuted }}>{completedCount}/{totalLessons} lessons</span>
              <span style={{ fontSize: 10, color: T.textMuted }}>{Math.round((completedCount / totalLessons) * 100)}% done</span>
            </div>
            {completedCount > 0 && (
              <button onClick={resetProgress}
                style={{ marginTop: 8, width: "100%", padding: "5px 0", background: "none", border: `1px solid ${T.border}`, borderRadius: 5, color: T.textMuted, fontSize: 10, cursor: "pointer", letterSpacing: "0.04em" }}>
                Reset progress
              </button>
            )}
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: "8px 8px" }}>
            {MODULES.map(mod => {
              const modDone = mod.lessons.filter(l => completed[l.id]).length;
              const isActive = mod.id === activeModuleId;
              const pct = Math.round((modDone / mod.lessons.length) * 100);
              return (
                <div key={mod.id} style={{ marginBottom: 3 }}>
                  <button onClick={() => { setActiveModuleId(mod.id); setActiveLessonId(mod.lessons[0].id); }}
                    style={{ width: "100%", background: isActive ? T.accentBg : "transparent", border: `1px solid ${isActive ? T.accent : "transparent"}`, borderRadius: 6, padding: "8px 10px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.15s" }}>
                    <ProgressRing pct={pct} color={isActive ? T.accent : T.textMuted} bgColor={T.border} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: isActive ? T.text : T.textSecondary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: 1 }}>{mod.title}</div>
                      <div style={{ fontSize: 9.5, color: T.textMuted, letterSpacing: "0.06em" }}>{mod.tag} · {modDone}/{mod.lessons.length}</div>
                    </div>
                  </button>
                  {isActive && (
                    <div style={{ marginLeft: 8, marginTop: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                      {mod.lessons.map(lesson => {
                        const isCurrentLesson = activeLessonId === lesson.id;
                        return (
                          <button key={lesson.id} onClick={() => setActiveLessonId(lesson.id)}
                            style={{ background: isCurrentLesson ? T.bgTertiary : "transparent", border: "none", borderRadius: 5, padding: "5px 8px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "background 0.1s" }}>
                            <span style={{ fontSize: 8.5, color: completed[lesson.id] ? T.success : isCurrentLesson ? T.accent : T.textMuted, flexShrink: 0 }}>
                              {completed[lesson.id] ? "●" : isCurrentLesson ? "◉" : "○"}
                            </span>
                            <span style={{ fontSize: 11, color: isCurrentLesson ? T.text : T.textSecondary, flex: 1, lineHeight: 1.35 }}>{lesson.title}</span>
                            <span style={{ fontSize: 9, padding: "1px 5px", borderRadius: 3, background: T.bgTertiary, color: typeColor(lesson.type), fontWeight: 700, letterSpacing: "0.05em", flexShrink: 0 }}>{typeLabel[lesson.type]}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

        {/* ── TOPBAR ── */}
        <div style={{ padding: isMobile ? "12px 16px" : "11px 22px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 10, background: T.bg, flexShrink: 0 }}>
          {isMobile ? (
            <>
              <button onClick={() => setDrawerOpen(true)}
                style={{ background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 7, padding: "8px 12px", cursor: "pointer", color: T.textSecondary, fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, minHeight: 38, flexShrink: 0 }}>
                <span style={{ fontSize: 14 }}>☰</span>
              </button>
              <button onClick={() => setShowIntro(true)}
                style={{ background: "none", border: "none", cursor: "pointer", color: T.textMuted, fontSize: 11, padding: "4px 0", flexShrink: 0 }}>
                ← Home
              </button>              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, color: T.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 1 }}>{activeModule?.tag}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{activeLesson?.title}</div>
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <div style={{ fontSize: 11, color: T.textMuted, padding: "5px 9px", background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 5, fontVariantNumeric: "tabular-nums", display: "flex", alignItems: "center" }}>
                  {xp} XP
                </div>
                <button onClick={() => setDark(!dark)}
                  style={{ background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 6, padding: "5px 9px", cursor: "pointer", color: T.textMuted, fontSize: 14, minHeight: 36, display: "flex", alignItems: "center" }}>
                  {dark ? "☀" : "◑"}
                </button>
                <button onClick={() => setShowAgent(true)}
                  style={{ padding: "5px 11px", background: T.accentBg, border: `1px solid ${T.accent}`, borderRadius: 6, color: T.accent, fontSize: 11, fontWeight: 700, cursor: "pointer", minHeight: 36, display: "flex", alignItems: "center", gap: 4 }}
                  aria-label="Open companion">
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.accent }} />
                  Companion
                </button>
              </div>
            </>
          ) : (
            <>
              <button onClick={() => setShowIntro(true)}
                style={{ background: "none", border: "none", cursor: "pointer", color: T.textMuted, fontSize: 11, padding: "4px 2px", letterSpacing: "0.02em", flexShrink: 0 }}>
                ← Home
              </button>
              <div style={{ width: 1, height: 18, background: T.border }} />
              <button onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                style={{ background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 5, padding: "4px 8px", cursor: "pointer", color: T.textMuted, fontSize: 11, lineHeight: 1, transition: "all 0.15s" }}>
                {sidebarOpen ? "◀" : "▶"}
              </button>
              <div style={{ width: 1, height: 18, background: T.border }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 9.5, color: T.textMuted, marginBottom: 1, letterSpacing: "0.1em", textTransform: "uppercase" }}>{activeModule?.title} · {activeModule?.tag}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{activeLesson?.title}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ fontSize: 10.5, color: T.textMuted, padding: "3px 9px", background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 4, fontVariantNumeric: "tabular-nums" }}>{xp} XP</div>
                <button onClick={() => setDark(!dark)}
                  aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
                  style={{ background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 5, padding: "4px 9px", cursor: "pointer", color: T.textMuted, fontSize: 11, transition: "all 0.15s" }}>
                  {dark ? "Light" : "Dark"}
                </button>
                <button onClick={() => setShowAgent(!showAgent)}
                  style={{ padding: "5px 12px", background: showAgent ? T.accent : T.bgSecondary, border: `1px solid ${showAgent ? T.accent : T.border}`, borderRadius: 5, color: showAgent ? "#fff" : T.textSecondary, fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, transition: "all 0.15s" }}
                  aria-label={showAgent ? "Close companion" : "Open companion"}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: showAgent ? "#fff" : T.accent, flexShrink: 0 }} />
                  Companion
                </button>
              </div>
            </>
          )}
        </div>

        {/* ── LESSON CONTENT ── */}
        <div style={{ flex: 1, overflow: "auto", padding: isMobile ? "24px 16px 100px" : "40px 48px", maxWidth: isMobile ? "100%" : 680, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
          {activeLesson && (
            <div>
              {/* Type badge */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22, flexWrap: "wrap" }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", padding: "4px 8px", borderRadius: 4, background: activeLesson.type === "lesson" ? T.accentBg : activeLesson.type === "quiz" ? T.warningBg : T.tealBg, color: typeColor(activeLesson.type), border: `1px solid ${T.border}` }}>
                  {activeLesson.type === "lesson" ? "Lesson" : activeLesson.type === "quiz" ? "Knowledge check" : "Lab exercise"}
                </span>
                <span style={{ fontSize: 10.5, color: T.textMuted }}>
                  {activeLesson.type === "scenario" ? "TDD-graded · AI-reviewed" : activeLesson.type === "quiz" ? "+30 XP correct" : "+20 XP on complete"}
                </span>
              </div>

              {activeLesson.type === "lesson" && (
                <>
                  <LessonContent content={activeLesson.content} T={T} isMobile={isMobile} />
                  <button onClick={() => markComplete(activeLesson.id)}
                    style={{ marginTop: 28, padding: isMobile ? "14px 20px" : "9px 22px", width: isMobile ? "100%" : "auto", background: completed[activeLesson.id] ? T.successBg : T.accent, border: `1px solid ${completed[activeLesson.id] ? T.successBorder : T.accent}`, borderRadius: 7, color: completed[activeLesson.id] ? T.success : "#fff", fontSize: isMobile ? 15 : 12.5, fontWeight: 700, cursor: "pointer", minHeight: 48 }}>
                    {completed[activeLesson.id] ? "✓ Completed — Next lesson →" : "Mark complete & continue →"}
                  </button>
                </>
              )}
              {activeLesson.type === "quiz" && (
                <QuizLesson key={activeLesson.id} lesson={activeLesson} onComplete={() => markComplete(activeLesson.id)} addXP={addXP} T={T} isMobile={isMobile} />
              )}
              {activeLesson.type === "scenario" && (
                <ScenarioLesson key={activeLesson.id} lesson={activeLesson} onComplete={() => markComplete(activeLesson.id)} addXP={addXP} T={T} isMobile={isMobile} />
              )}

              {/* Mobile: prev/next lesson navigation */}
              {isMobile && (
                <div style={{ display: "flex", gap: 10, marginTop: 32 }}>
                  {prevLesson && (
                    <button onClick={() => {
                        const nm = MODULES.find(m => m.lessons.some(l => l.id === prevLesson.id));
                        handleSelectLesson(nm.id, prevLesson.id);
                      }}
                      style={{ flex: 1, padding: "12px 14px", background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 8, color: T.textSecondary, fontSize: 12.5, fontWeight: 600, cursor: "pointer", textAlign: "left", minHeight: 48 }}>
                      ← {prevLesson.title}
                    </button>
                  )}
                  {nextLesson && (
                    <button onClick={() => {
                        const nm = MODULES.find(m => m.lessons.some(l => l.id === nextLesson.id));
                        handleSelectLesson(nm.id, nextLesson.id);
                      }}
                      style={{ flex: 1, padding: "12px 14px", background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 8, color: T.textSecondary, fontSize: 12.5, fontWeight: 600, cursor: "pointer", textAlign: "right", minHeight: 48 }}>
                      {nextLesson.title} →
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── MOBILE BOTTOM NAV ── */}
        {isMobile && (
          <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: T.bg, borderTop: `1px solid ${T.border}`, padding: "10px 16px 20px", display: "flex", alignItems: "center", gap: 10, zIndex: 100 }}>
            <button onClick={() => setDrawerOpen(true)}
              style={{ flex: 1, padding: "10px 14px", background: T.bgSecondary, border: `1px solid ${T.border}`, borderRadius: 8, color: T.textSecondary, fontSize: 12.5, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 7, minHeight: 44 }}>
              <span style={{ fontSize: 14 }}>☰</span>
              <span style={{ flex: 1, textAlign: "left", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{activeModule?.title}</span>
              <span style={{ fontSize: 10, color: T.textMuted, background: T.bgTertiary, padding: "2px 6px", borderRadius: 4, flexShrink: 0 }}>
                {activeModule && `${activeModule.lessons.findIndex(l => l.id === activeLessonId) + 1}/${activeModule.lessons.length}`}
              </span>
            </button>
            <button onClick={() => setShowAgent(true)}
              style={{ padding: "10px 14px", background: T.accentBg, border: `1px solid ${T.accent}`, borderRadius: 8, color: T.accent, fontSize: 12, fontWeight: 700, cursor: "pointer", minHeight: 44, display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.accent }} />
              Expert
            </button>
          </div>
        )}
      </div>

      {/* ── MOBILE DRAWER ── */}
      {isMobile && (
        <ModuleDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          T={T}
          activeModuleId={activeModuleId}
          activeLessonId={activeLessonId}
          completed={completed}
          xp={xp}
          onSelectLesson={handleSelectLesson}
          onReset={resetProgress}
        />
      )}

      {/* ── DESIGN AGENT ── */}
      {showAgent && <DesignAgent onClose={() => setShowAgent(false)} T={T} isMobile={isMobile} />}
    </div>
  );
}
