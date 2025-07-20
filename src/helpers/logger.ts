type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'table';

const stringify = (input: unknown, pretty = true): string => {
  if (typeof input === 'string') {
    return input;
  }

  try {
    return pretty ? JSON.stringify(input, undefined, 2) : JSON.stringify(input);
  } catch {
    return '[Unserializable object]';
  }
};

const baseLogger =
  (level: LogLevel) =>
  (...args: unknown[]) => {
    const formattedArgs = args.map((arg) =>
      typeof arg === 'object' ? stringify(arg) : arg
    );

    // `console[level]` is dynamically accessed, safe since we're guarding with type
    (console[level] as (...data: unknown[]) => void)(...formattedArgs);
  };

export const logger = {
  log: baseLogger('log'),
  info: baseLogger('info'),
  warn: baseLogger('warn'),
  error: baseLogger('error'),
  table: (...args: unknown[]) => {
    const unpacked = args.map((arg) => (typeof arg === 'object' ? arg : { value: arg }));
    // oxlint-disable-next-line no-console
    console.table(unpacked.length === 1 ? unpacked[0] : unpacked);
  }
};
