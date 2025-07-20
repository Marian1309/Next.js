'use client';

import { createTypedI18nHook } from '@pidchashyi/i18n-next';

import type json from './locales/en.json';

const languages = ['en', 'uk'] as const;

const useTranslation = createTypedI18nHook<typeof languages, typeof json>();

export default useTranslation;
