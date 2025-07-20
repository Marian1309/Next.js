'use client';

import { Toaster } from 'react-hot-toast';

const ReactHotToastProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          fontSize: '14px',
          textWrap: 'balance',
          maxWidth: '100%'
        }
      }}
    />
  );
};

export default ReactHotToastProvider;
