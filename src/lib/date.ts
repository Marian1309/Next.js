import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

export const getUADate = (params: { date: string | Date; format: string }): string => {
  return format(new Date(params.date), params.format, {
    locale: uk
  });
};

export const generateExpirationDate = (hours: number): Date => {
  return new Date(Date.now() + hours * 60 * 60 * 1000);
};
