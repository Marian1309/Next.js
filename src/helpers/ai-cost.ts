import { AI_MODELS } from '@/constants/ai';

export const calculateGPT4oMiniCost = (params: {
  promptTokens: number;
  completionTokens: number;
}): number => {
  const { promptTokens, completionTokens } = params;

  const totalCost =
    promptTokens * AI_MODELS.CHATGPT['4o-mini'].cost.prompt +
    completionTokens * AI_MODELS.CHATGPT['4o-mini'].cost.completion;

  return totalCost; // returns cost in USD
};
