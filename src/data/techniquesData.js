export const techniques = [
  {
    id: 'cot',
    name: 'Chain of Thought',
    badge: 'Reasoning',
    badgeColor: 'blue',
    icon: '🔗',
    difficulty: 'Intermediate',
    description: 'Guide the model to think step-by-step before giving a final answer. By explicitly requesting reasoning chains, you dramatically improve performance on complex math, logic, and multi-step problems. The model\'s intermediate reasoning improves the quality of the final output.',
    whenToUse: 'Complex math problems, multi-step reasoning, logical deductions, coding tasks, and any task where the process matters as much as the answer.',
    example: `You are a logical reasoning expert. Solve this step-by-step, showing all intermediate reasoning:

Problem: A train travels from City A to City B at 60 mph. The return journey is at 40 mph. What is the average speed for the round trip?

Think through this carefully:
1. First, establish what we know
2. Calculate time for each direction  
3. Use the harmonic mean formula
4. Show your work and arrive at the final answer

Format: Step 1: [reasoning] → Step 2: [reasoning] → Final Answer: [result]`,
    tip: 'Add "Think step by step" or "Show your reasoning" to any complex prompt to trigger CoT behavior.'
  },
  {
    id: 'few-shot',
    name: 'Few-Shot Prompting',
    badge: 'Pattern Learning',
    badgeColor: 'green',
    icon: '🎯',
    difficulty: 'Beginner',
    description: 'Provide 2–5 input/output examples within your prompt to establish a clear pattern for the model to follow. This is one of the most reliable ways to ensure consistent formatting, tone, and style without needing to fine-tune the model.',
    whenToUse: 'When you need consistent formatting, specific writing style matching, classification tasks, data transformation, or any task where showing is better than telling.',
    example: `Classify the sentiment of customer feedback. Use exactly this format:

Input: "The delivery was incredibly fast!"
Output: {"sentiment": "positive", "confidence": "high", "key_phrase": "incredibly fast"}

Input: "Product broke after two days. Very disappointing."
Output: {"sentiment": "negative", "confidence": "high", "key_phrase": "broke after two days"}

Input: "It's okay, nothing special about it."
Output: {"sentiment": "neutral", "confidence": "medium", "key_phrase": "nothing special"}

Now classify this:
Input: "Absolutely love the new design update. Makes everything so much easier!"
Output:`,
    tip: 'Use diverse examples that cover edge cases. 3 examples is usually the sweet spot — enough to establish pattern without wasting tokens.'
  },
  {
    id: 'role-prompting',
    name: 'Role Prompting',
    badge: 'Persona',
    badgeColor: 'purple',
    icon: '🎭',
    difficulty: 'Beginner',
    description: 'Assign a specific role, expertise, or professional identity to the AI. This changes the model\'s vocabulary, reasoning depth, communication style, and the assumptions it makes. A senior engineer will respond differently than a junior developer to the same question.',
    whenToUse: 'Technical explanations, professional advice, creative writing, teaching content at specific expertise levels, and when you need domain-specific language.',
    example: `You are Dr. Sarah Chen, a Principal Machine Learning Engineer with 15 years of experience at FAANG companies. You specialize in MLOps, large-scale model deployment, and making complex ML concepts accessible to business stakeholders.

Your communication style:
- Lead with the business impact before the technical details
- Use analogies from everyday life to explain complex concepts
- Be direct and opinionated — you have earned your perspective
- Flag when something is "theoretically possible but practically a bad idea"

Task: Explain why transformer attention mechanisms are O(n²) in complexity and what this means for deploying LLMs in production.`,
    tip: 'The more specific and detailed your role description, the more differentiated and useful the response will be.'
  },
  {
    id: 'self-evaluation',
    name: 'Self Evaluation',
    badge: 'Quality Control',
    badgeColor: 'orange',
    icon: '🔍',
    difficulty: 'Advanced',
    description: 'Instruct the model to evaluate and critique its own responses. This two-pass approach first generates a draft, then applies critical thinking to identify weaknesses, gaps, factual errors, or missed requirements — and produces an improved final version.',
    whenToUse: 'High-stakes content, code review, detailed analysis, writing that needs to be accurate, situations where you would normally need a human reviewer.',
    example: `Task: Write a technical explanation of how HTTPS/TLS handshake works for a developer blog post.

Instructions:
1. Write a complete first draft
2. After the draft, write "--- SELF-CRITIQUE ---"
3. Evaluate your draft on: Technical accuracy, Clarity, Completeness, Appropriate audience level
4. List specific improvements needed
5. After the critique, write "--- IMPROVED VERSION ---"  
6. Rewrite incorporating all identified improvements

Target audience: Mid-level developers who use HTTPS daily but don't deeply understand the protocol.`,
    tip: 'Build self-evaluation into high-stakes workflows. You can also separate this into two prompts: one to generate, one to critique and improve.'
  },
  {
    id: 'persona-injection',
    name: 'Persona Injection',
    badge: 'Character Design',
    badgeColor: 'pink',
    icon: '💉',
    difficulty: 'Intermediate',
    description: 'Embed a rich, detailed character persona into the prompt — including personality traits, communication quirks, background knowledge, emotional tendencies, and even verbal tics. Goes deeper than Role Prompting by shaping the fundamental communication style and worldview.',
    whenToUse: 'Customer service bots, educational tutors, creative storytelling, brand voice consistency, interactive experiences, and product demos.',
    example: `You are ARIA — Adaptive Research and Insights Assistant.

Persona:
- Enthusiastic about learning but never condescending
- Uses light humor to make dense topics approachable ("Think of it like your brain's RAM...")
- Always asks one clarifying question before diving deep into complex topics
- Celebrates small wins ("Nice! You just understood backpropagation!")
- Speaks in 2nd person to keep explanations personal
- Uses emojis sparingly but effectively (one per major point max)
- Never says "Certainly!" or "Great question!" — too robotic

Background: You have deep expertise in ML/AI, mathematics, and cognitive science. You've tutored 10,000+ students and know exactly where people get stuck.

Current context: You're helping a business analyst learn machine learning from scratch.`,
    tip: 'Include what the persona does NOT do — this is as important as what they do. Negative constraints shape personality powerfully.'
  },
  {
    id: 'xml-prompting',
    name: 'XML Prompting',
    badge: 'Structure',
    badgeColor: 'cyan',
    icon: '📋',
    difficulty: 'Intermediate',
    description: 'Use XML-style tags to create clear structural boundaries between different sections of your prompt. This approach dramatically improves prompt parsing for complex instructions, prevents context confusion, and makes prompts maintainable and reusable.',
    whenToUse: 'Long prompts with multiple sections, system prompts, RAG applications, prompts with dynamic data injection, complex multi-step workflows, and API integrations.',
    example: `<system>
  You are a senior code reviewer. Your job is to review code, identify issues, and provide actionable feedback.
  Always respond in the exact JSON format specified in <output_format>.
</system>

<context>
  This is a Python function submitted by a junior developer for their first PR review.
  Be constructive but thorough.
</context>

<code_to_review>
def get_user(id):
    result = db.execute("SELECT * FROM users WHERE id = " + str(id))
    return result[0]
</code_to_review>

<output_format>
{
  "overall_rating": "1-5",
  "critical_issues": [],
  "improvements": [],
  "positive_aspects": [],
  "revised_code": ""
}
</output_format>

<instructions>
  Focus especially on: security vulnerabilities, error handling, and code style.
  Do not add any text outside the JSON structure.
</instructions>`,
    tip: 'Claude models are trained with XML-structured data and parse it extremely well. Use consistent tag naming across your prompts for team-wide consistency.'
  },
  {
    id: 'iterative-refinement',
    name: 'Iterative Refinement',
    badge: 'Optimization',
    badgeColor: 'yellow',
    icon: '🔄',
    difficulty: 'Advanced',
    description: 'Treat prompt engineering as an iterative design process. Start with a rough draft, evaluate the output against specific criteria, identify the gap between expected and actual output, then revise the prompt with targeted improvements. Repeat until output quality is satisfactory.',
    whenToUse: 'Any high-quality output you\'ll use repeatedly, building complex workflows, when initial results are close but not perfect, and for establishing reliable prompt templates.',
    example: `## Iteration 3 of improving a marketing copy prompt

PREVIOUS OUTPUT FEEDBACK:
- Too formal, doesn't feel like our brand voice
- Missing the urgency/scarcity element  
- CTA is too generic ("Learn More")
- Doesn't address the main pain point clearly

REFINED PROMPT:
Write product copy for our AI writing tool, PromptPro. 

Voice: Like a brilliant friend who just discovered something amazing — excited but not hype-y. Use "you" constantly. No corporate speak.

Pain point to address: Spending hours rewriting the same prompt 47 times to get usable output.

Required elements:
1. Hook that names the pain (first sentence)
2. Specific numbers: saves 3+ hours/week
3. Social proof hint: "Used by 12,000+ AI power users"
4. FOMO CTA: "Try free before 500 spots fill" 

Max 80 words. No em dashes.`,
    tip: 'Keep a prompt changelog. Document what changed in each iteration and why — this builds a personal library of prompt patterns that actually work.'
  },
  {
    id: 'constraint-prompting',
    name: 'Constraint Prompting',
    badge: 'Control',
    badgeColor: 'red',
    icon: '🎛️',
    difficulty: 'Beginner',
    description: 'Set explicit, specific rules and boundaries for the AI\'s response. Constraints control length, format, vocabulary level, topics to avoid or include, output structure, and behavior. They remove ambiguity and enforce consistency across all responses.',
    whenToUse: 'API integrations needing specific output formats, content moderation, writing assistance with style guidelines, data extraction, and any production system where predictable output is critical.',
    example: `Summarize the provided article for a daily news digest.

HARD CONSTRAINTS — Never violate these:
✓ Length: Exactly 3 sentences, no more, no less
✓ Format: Plain text only, no markdown, no bullet points  
✓ Vocabulary: 8th grade reading level (Flesch-Kincaid ≤ 70)
✓ Tense: Present tense for ongoing situations, past for completed events
✓ Numbers: Spell out numbers under 10, use numerals for 10+
✓ Forbidden words: "crucial", "important", "significant", "key" 
✓ First word: Must not start with "The" or "A"

Article to summarize:
[ARTICLE_TEXT_HERE]`,
    tip: 'Distinguish between "hard" constraints (never violate) and "soft" guidelines (prefer but can flex). This clarity helps both you and the AI prioritize.'
  }
];
