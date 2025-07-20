export const isValidURL = (url: string): boolean => {
  if (typeof url !== 'string') {
    return false;
  }

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const encodeSearchParams = (input: string) => {
  return Buffer.from(input, 'utf-8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

export const decodeSearchParams = (input: string) => {
  return Buffer.from(
    input
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(Math.ceil(input.length / 4) * 4, '='),
    'base64'
  ).toString('utf-8');
};
