import type { ReactNode } from 'react';

import { I18nProvider as I18nProviderNext } from '@pidchashyi/i18n-next';

interface Properties {
  children: ReactNode;
}

const I18nProvider = ({ children }: Properties) => {
  return (
    <I18nProviderNext
      config={{
        initialLanguage: 'en',
        supportedLanguages: ['en', 'uk']
      }}
    >
      {children}
    </I18nProviderNext>
  );
};

export default I18nProvider;
