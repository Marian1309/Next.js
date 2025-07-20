import { describe, expect, it } from 'vitest';

import { formatBytes } from '@/helpers/bytes';

describe('bytes helpers', () => {
  describe('formatBytes', () => {
    it('should format bytes correctly for values less than 1KB', () => {
      expect(formatBytes(0)).toBe('0 байт');
      expect(formatBytes(1)).toBe('1 байт');
      expect(formatBytes(512)).toBe('512 байт');
      expect(formatBytes(1023)).toBe('1023 байт');
    });

    it('should format bytes correctly for values between 1KB and 1MB', () => {
      expect(formatBytes(1024)).toBe('1.00 КБ');
      expect(formatBytes(1536)).toBe('1.50 КБ');
      expect(formatBytes(2048)).toBe('2.00 КБ');
      expect(formatBytes(512 * 1024)).toBe('512.00 КБ');
      expect(formatBytes(1024 * 1024 - 1)).toBe('1024.00 КБ');
    });

    it('should format bytes correctly for values of 1MB or greater', () => {
      expect(formatBytes(1024 * 1024)).toBe('1.00 МБ');
      expect(formatBytes(1.5 * 1024 * 1024)).toBe('1.50 МБ');
      expect(formatBytes(2 * 1024 * 1024)).toBe('2.00 МБ');
      expect(formatBytes(10 * 1024 * 1024)).toBe('10.00 МБ');
      expect(formatBytes(1024 * 1024 * 1024)).toBe('1024.00 МБ');
    });

    it('should handle decimal precision correctly', () => {
      expect(formatBytes(1024 + 100)).toBe('1.10 КБ');
      expect(formatBytes(1024 + 10)).toBe('1.01 КБ');
      expect(formatBytes(1024 * 1024 + 1024 * 100)).toBe('1.10 МБ');
    });

    it('should handle edge cases', () => {
      expect(formatBytes(-1)).toBe('-1 байт');
      expect(formatBytes(Number.MAX_SAFE_INTEGER)).toMatch(/\d+\.\d{2} МБ/);
    });
  });
});
