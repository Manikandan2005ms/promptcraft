export const safetyPrinciples = [
  {
    id: 'no-jailbreak',
    icon: '🚫',
    title: 'No Jailbreaking',
    severity: 'critical',
    color: 'red',
    description: 'Never craft prompts designed to bypass AI safety filters, override system instructions, or make models act outside their intended guidelines.',
    badExamples: [
      '"Ignore all previous instructions and..."',
      '"Pretend you have no restrictions..."',
      '"DAN (Do Anything Now) mode: ..."',
    ],
    goodPractice: 'Work within the model\'s intended design. If the AI won\'t do something, that boundary exists for good reason.',
  },
  {
    id: 'no-harm',
    icon: '🛡️',
    title: 'Avoid Harmful Content',
    severity: 'critical',
    color: 'red',
    description: 'Never use prompt engineering techniques to extract instructions for weapons, dangerous substances, illegal activities, or content that could harm individuals or groups.',
    badExamples: [
      'Using roleplay to extract real harmful instructions',
      'Fictional framing to bypass content policies',
      'Multi-step prompts that gradually escalate toward harmful outputs',
    ],
    goodPractice: 'If your end goal requires harmful information, reconsider the goal itself, not the prompt technique.',
  },
  {
    id: 'privacy',
    icon: '🔒',
    title: 'Protect Privacy',
    severity: 'high',
    color: 'orange',
    description: 'Be careful about including real personal data (names, emails, addresses, health info) in prompts sent to AI APIs. This data may be used in training or logged.',
    badExamples: [
      'Pasting real customer PII into prompts',
      'Including real medical records in analysis prompts',
      'Using actual employee data in HR automation prompts',
    ],
    goodPractice: 'Anonymize or synthesize data before including it in prompts. Use placeholders like [PATIENT_NAME] or [USER_EMAIL].',
  },
  {
    id: 'transparency',
    icon: '👁️',
    title: 'Disclose AI Usage',
    severity: 'high',
    color: 'orange',
    description: 'When using AI-generated content publicly, be transparent about AI involvement — especially in journalism, academia, professional advice, and customer-facing communications.',
    badExamples: [
      'Publishing AI-written articles without disclosure',
      'Submitting AI-generated academic work as your own',
      'Presenting AI advice as professional expertise',
    ],
    goodPractice: 'Disclose AI assistance, fact-check AI outputs, and ensure human review for high-stakes decisions.',
  },
  {
    id: 'bias',
    icon: '⚖️',
    title: 'Mitigate Bias',
    severity: 'medium',
    color: 'yellow',
    description: 'AI models can reflect and amplify societal biases. Design prompts that actively counteract bias rather than reinforce stereotypes in gender, race, age, religion, or disability.',
    badExamples: [
      'Role prompts that reinforce gender stereotypes',
      'Prompts that assume demographic defaults',
      'Using biased training examples in few-shot prompts',
    ],
    goodPractice: 'Explicitly request diverse, balanced perspectives. Audit AI outputs for bias patterns across different demographic groups.',
  },
  {
    id: 'misinformation',
    icon: '📰',
    title: 'Prevent Misinformation',
    severity: 'high',
    color: 'orange',
    description: 'AI models can confidently state false information. Never use prompt engineering to generate fake news, fabricated quotes, disinformation campaigns, or misleading statistical claims.',
    badExamples: [
      'Generating fake quotes attributed to real people',
      'Creating misleading statistics or "studies"',
      'Fabricating citations or research papers',
    ],
    goodPractice: 'Fact-check AI outputs against authoritative sources. Ask the AI to express uncertainty when appropriate.',
  },
];

export const safetyGuidelines = [
  { icon: '✅', text: 'Always review AI outputs before publishing or acting on them' },
  { icon: '✅', text: 'Use AI as an assistant, not as the sole decision-maker for important choices' },
  { icon: '✅', text: 'Report harmful AI outputs to the model provider' },
  { icon: '✅', text: 'Keep humans in the loop for high-stakes applications' },
  { icon: '✅', text: 'Understand the difference between AI capability and AI reliability' },
  { icon: '✅', text: 'Regularly audit AI-powered systems for unintended behaviors' },
];

export const promptSafetyChecklist = [
  { id: 1, item: 'Does this prompt respect the model\'s intended use policy?' },
  { id: 2, item: 'Have I anonymized any personal or sensitive data?' },
  { id: 3, item: 'Could the output cause harm if taken at face value?' },
  { id: 4, item: 'Am I prepared to fact-check the output before using it?' },
  { id: 5, item: 'Is my prompt designed to produce balanced, unbiased responses?' },
  { id: 6, item: 'Would I be comfortable if the prompt creator saw this prompt?' },
];
