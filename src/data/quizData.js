export const quizQuestions = [
  {
    id: 1,
    question: "What is Chain of Thought (CoT) prompting primarily used for?",
    options: [
      "Making AI responses shorter and faster",
      "Guiding the model to reason step-by-step through a problem",
      "Restricting the AI to a specific topic only",
      "Formatting output as JSON"
    ],
    correct: 1,
    explanation: "Chain of Thought prompting guides AI models to reason step-by-step, improving accuracy on complex reasoning and math problems by making intermediate steps explicit."
  },
  {
    id: 2,
    question: "In Few-Shot Prompting, what are the 'shots' referring to?",
    options: [
      "The number of words in your prompt",
      "The temperature setting of the model",
      "Examples of the desired input-output pattern provided in the prompt",
      "Multiple API calls made in sequence"
    ],
    correct: 2,
    explanation: "In Few-Shot Prompting, 'shots' refer to example input-output pairs you provide in the prompt. These examples teach the model the pattern you want it to follow."
  },
  {
    id: 3,
    question: "Which prompting technique assigns a specific identity or profession to the AI?",
    options: [
      "XML Prompting",
      "Role Prompting",
      "Constraint Prompting",
      "Iterative Refinement"
    ],
    correct: 1,
    explanation: "Role Prompting assigns a specific identity, expertise, or persona to the AI (e.g., 'You are an expert software architect'). This shapes the tone, vocabulary, and depth of responses."
  },
  {
    id: 4,
    question: "What is the main purpose of using XML tags in prompts?",
    options: [
      "To make the prompt look more professional",
      "To slow down AI processing for better accuracy",
      "To clearly separate and structure different parts of the prompt for better parsing",
      "XML tags are only used for web development, not AI prompts"
    ],
    correct: 2,
    explanation: "XML tags in prompts (like <context>, <instructions>, <example>) provide clear structural separation, making it easier for models to parse and follow complex, multi-part instructions."
  },
  {
    id: 5,
    question: "What does 'Zero-Shot' prompting mean?",
    options: [
      "The AI gives zero useful responses",
      "The prompt contains no examples — only the task description",
      "Using the model at 0% temperature",
      "A prompt with zero words"
    ],
    correct: 1,
    explanation: "Zero-Shot prompting means asking the model to perform a task without providing any examples. The model relies entirely on its pre-training knowledge."
  },
  {
    id: 6,
    question: "In Self-Evaluation prompting, what is the AI asked to do?",
    options: [
      "Rate itself on a scale of 1–10",
      "Review, critique, and improve its own previous response",
      "Generate a longer response than usual",
      "Use only one-word answers"
    ],
    correct: 1,
    explanation: "Self-Evaluation prompting instructs the AI to review its own output, identify weaknesses or errors, and produce an improved version — essentially acting as its own critic and editor."
  },
  {
    id: 7,
    question: "Which technique is best for getting consistent, repeatable output formats?",
    options: [
      "Role Prompting",
      "Chain of Thought",
      "Constraint Prompting with explicit format rules",
      "Few-Shot with diverse examples"
    ],
    correct: 2,
    explanation: "Constraint Prompting with explicit format rules (e.g., 'Always respond in JSON', 'Use exactly 3 bullet points') is most effective for enforcing consistent, repeatable output structures."
  },
  {
    id: 8,
    question: "What is Persona Injection in prompting?",
    options: [
      "Adding malicious code to a prompt",
      "Embedding a detailed character description including personality traits, speech style, and background knowledge",
      "Using the AI to generate personas for fictional writing only",
      "A security vulnerability in LLMs"
    ],
    correct: 1,
    explanation: "Persona Injection embeds detailed character specifications into prompts — including personality, speech style, expertise level, and backstory — to shape how the AI communicates and what perspective it takes."
  },
  {
    id: 9,
    question: "What is the key principle behind Iterative Refinement prompting?",
    options: [
      "Generate one perfect response and stop",
      "Use the AI only once per session",
      "Start with a draft, then progressively improve it through multiple rounds of feedback",
      "Repeat the same prompt until the AI gets it right"
    ],
    correct: 2,
    explanation: "Iterative Refinement treats prompt engineering as a cycle: generate a draft, evaluate it, provide specific feedback, regenerate, and repeat until the output meets your standards."
  },
  {
    id: 10,
    question: "Which of these is a power verb that tends to produce more structured, actionable AI outputs?",
    options: [
      "Tell me about...",
      "What do you think of...",
      "Analyze, Compare, Generate, Outline",
      "Make something nice about..."
    ],
    correct: 2,
    explanation: "Power verbs like Analyze, Compare, Generate, Outline, Evaluate, and Synthesize signal clear intent to the AI, leading to more focused, structured, and actionable responses."
  }
];
