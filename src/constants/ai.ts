export const AI_MODELS = {
  CHATGPT: {
    '4o-mini': {
      name: 'gpt-4o-mini',
      cost: {
        prompt: 0.00000015, // $0.4 per 1M tokens
        completion: 0.0000006 // $1.6 per 1M tokens
      }
    },
    '4.1-nano': {
      name: 'gpt-4.1-nano',
      cost: {
        prompt: 0.1, // $0.1 per 1M tokens
        completion: 0.4 // $0.4 per 1M tokens
      }
    }
  }
} as const;
