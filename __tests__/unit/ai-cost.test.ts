import { describe, expect, it } from 'vitest';

import { AI_MODELS } from '@/constants/ai';

import { calculateGPT4oMiniCost } from '@/helpers/ai-cost';

describe('ai-cost helpers', () => {
  describe('calculateGPT4oMiniCost', () => {
    it('should calculate cost correctly for zero tokens', () => {
      const cost = calculateGPT4oMiniCost({
        promptTokens: 0,
        completionTokens: 0
      });
      expect(cost).toBe(0);
    });

    it('should calculate cost correctly for prompt tokens only', () => {
      const promptTokens = 1000;
      const expectedCost = promptTokens * AI_MODELS.CHATGPT['4o-mini'].cost.prompt;

      const cost = calculateGPT4oMiniCost({
        promptTokens,
        completionTokens: 0
      });

      expect(cost).toBe(expectedCost);
    });

    it('should calculate cost correctly for completion tokens only', () => {
      const completionTokens = 1000;
      const expectedCost =
        completionTokens * AI_MODELS.CHATGPT['4o-mini'].cost.completion;

      const cost = calculateGPT4oMiniCost({
        promptTokens: 0,
        completionTokens
      });

      expect(cost).toBe(expectedCost);
    });

    it('should calculate cost correctly for both prompt and completion tokens', () => {
      const promptTokens = 1000;
      const completionTokens = 500;
      const expectedCost =
        promptTokens * AI_MODELS.CHATGPT['4o-mini'].cost.prompt +
        completionTokens * AI_MODELS.CHATGPT['4o-mini'].cost.completion;

      const cost = calculateGPT4oMiniCost({
        promptTokens,
        completionTokens
      });

      expect(cost).toBe(expectedCost);
    });

    it('should calculate cost correctly for large number of tokens', () => {
      const promptTokens = 1000000; // 1M tokens
      const completionTokens = 500000; // 500K tokens
      const expectedCost =
        promptTokens * AI_MODELS.CHATGPT['4o-mini'].cost.prompt +
        completionTokens * AI_MODELS.CHATGPT['4o-mini'].cost.completion;

      const cost = calculateGPT4oMiniCost({
        promptTokens,
        completionTokens
      });

      expect(cost).toBe(expectedCost);
    });
  });
});
