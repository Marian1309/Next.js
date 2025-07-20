'use server';

import { openai } from '@ai-sdk/openai';
import { isFailure, tryCatch } from '@pidchashyi/try-catch';
import { generateObject as generateObjectAi } from 'ai';
import type { ZodSchema } from 'zod';

import { AI_MODELS } from '@/constants/ai';

import { openaiClient } from '@/config/ai';

import { response } from '@/helpers/response';

export const generateText = async (prompt: string) => {
  if (!prompt) {
    return response({
      message: 'Generate text: Prompt is required',
      data: undefined,
      success: false
    });
  }

  const result = await tryCatch(
    openaiClient.chat.completions.create({
      model: AI_MODELS.CHATGPT['4o-mini'].name,
      messages: [
        { role: 'system', content: 'Ти ввічливий помічник.' },
        { role: 'user', content: prompt }
      ]
    })
  );

  if (isFailure(result)) {
    return response({
      data: undefined,
      message: 'Generate text: Text generation with ChatGPT failed',
      success: false
    });
  }

  return response({
    data: result.data?.choices[0]?.message?.content ?? undefined,
    message: 'Text generated successfully',
    success: true
  });
};

export const generateObject = async (params: { prompt: string; schema: ZodSchema }) => {
  const result = await tryCatch(
    generateObjectAi({
      model: openai(AI_MODELS.CHATGPT['4o-mini'].name),
      prompt: params.prompt,
      schema: params.schema
    })
  );

  if (isFailure(result)) {
    return response({
      data: undefined,
      message: 'Generate object: Object generation with ChatGPT failed',
      success: false
    });
  }

  return response({
    data: result.data?.object,
    message: 'Generate object: Object generated',
    success: true
  });
};

type Size = '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792';

export const generateImage = async (params: { prompt: string; size: Size }) => {
  if (!params.prompt) {
    return response({
      data: undefined,
      message: 'Generate image: Prompt is required',
      success: false
    });
  }

  const result = await tryCatch(
    openaiClient.images.generate({
      prompt: params.prompt,
      size: params.size || '256x256',
      model: 'dall-e-2'
    })
  );

  if (isFailure(result)) {
    return response({
      data: undefined,
      message: 'Generate image: Image generation failed',
      success: false
    });
  }

  return response({
    data: result.data?.data?.[0]?.url ?? undefined,
    message: 'Generate image: Image generated successfully',
    success: true
  });
};
